const Disponibilite = require('../models/Disponibilite');
const Reservation = require('../models/Reservation');
const moment = require('moment'); // pour la manipulation de dates

// Récupérer les disponibilités d'un prestataire (public)
exports.getDisponibilitesPrestataire = async (req, res) => {
  try {
    const { prestataireId } = req.params;
    const disponibilites = await Disponibilite.findOne({ prestataireId });
    if (!disponibilites) {
      return res.status(404).json({ message: 'Aucune disponibilité définie pour ce prestataire' });
    }
    res.json(disponibilites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour ses propres disponibilités (prestataire uniquement)
exports.updateDisponibilites = async (req, res) => {
  try {
    const prestataireId = req.user.id; // venant du middleware JWT
    const { creneaux, dureeRdv, conges } = req.body;

    // Vérifier que l'utilisateur est bien prestataire
    if (req.user.role !== 'prestataire' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès réservé aux prestataires' });
    }

    let disponibilites = await Disponibilite.findOne({ prestataireId });
    if (!disponibilites) {
      disponibilites = new Disponibilite({ prestataireId });
    }

    if (creneaux !== undefined) disponibilites.creneaux = creneaux;
    if (dureeRdv !== undefined) disponibilites.dureeRdv = dureeRdv;
    if (conges !== undefined) disponibilites.conges = conges;

    await disponibilites.save();
    res.json({ message: 'Disponibilités mises à jour', disponibilites });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir les créneaux disponibles pour une date donnée (temps réel)
exports.getCreneauxDisponibles = async (req, res) => {
  try {
    const { prestataireId } = req.params;
    const { date } = req.query; // format YYYY-MM-DD

    if (!date) {
      return res.status(400).json({ message: 'La date est requise (YYYY-MM-DD)' });
    }

    const jourSemaine = moment(date).format('dddd').toLowerCase(); // 'lundi', etc.
    const disponibilites = await Disponibilite.findOne({ prestataireId });
    if (!disponibilites) {
      return res.json([]);
    }

    // Vérifier si le prestataire est en congé ce jour-là
    const dateObj = moment(date).startOf('day').toDate();
    if (disponibilites.conges.some(c => moment(c).isSame(dateObj, 'day'))) {
      return res.json([]);
    }

    // Trouver le créneau correspondant au jour de la semaine
    const creneauJour = disponibilites.creneaux.find(c => c.jour === jourSemaine);
    if (!creneauJour) {
      return res.json([]);
    }

    const dureeRdv = disponibilites.dureeRdv || 60; // minutes

    // Générer tous les créneaux possibles de la journée
    const debut = moment(`${date} ${creneauJour.debut}`, 'YYYY-MM-DD HH:mm');
    const fin = moment(`${date} ${creneauJour.fin}`, 'YYYY-MM-DD HH:mm');
    const creneauxPossibles = [];

    let current = debut.clone();
    while (current.clone().add(dureeRdv, 'minutes').isSameOrBefore(fin)) {
      creneauxPossibles.push(current.toDate());
      current.add(dureeRdv, 'minutes');
    }

    // Récupérer les réservations existantes pour ce jour
    const debutJour = moment(date).startOf('day').toDate();
    const finJour = moment(date).endOf('day').toDate();

    const reservations = await Reservation.find({
      prestataireId,
      date: { $gte: debutJour, $lte: finJour },
      statut: { $nin: ['annulee'] }
    }).select('date duree');

    // Filtrer les créneaux qui chevauchent une réservation existante
    const creneauxDisponibles = creneauxPossibles.filter(debutCreneau => {
      const finCreneau = moment(debutCreneau).add(dureeRdv, 'minutes');
      return !reservations.some(res => {
        const debutRes = moment(res.date);
        const finRes = moment(res.date).add(res.duree || 60, 'minutes');
        // Chevauchement si (debutCreneau < finRes) et (finCreneau > debutRes)
        return moment(debutCreneau).isBefore(finRes) && finCreneau.isAfter(debutRes);
      });
    });

    res.json(creneauxDisponibles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};