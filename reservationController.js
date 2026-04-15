const Reservation = require('../models/Reservation');
const Disponibilite = require('../models/Disponibilite');
const moment = require('moment');

// Créer une réservation (client)
exports.createReservation = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { prestataireId, date, duree, serviceId, notes } = req.body;

    // Vérifier que le créneau est disponible (pas de conflit)
    const isAvailable = await checkCreneauAvailability(prestataireId, date, duree || 60);
    if (!isAvailable) {
      return res.status(409).json({ message: 'Le créneau demandé n\'est plus disponible' });
    }

    const reservation = new Reservation({
      clientId,
      prestataireId,
      serviceId,
      date: new Date(date),
      duree: duree || 60,
      notes,
      statut: 'en_attente'
    });

    await reservation.save();
    res.status(201).json({ message: 'Réservation créée avec succès', reservation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Annuler une réservation (client ou prestataire)
exports.cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }

    // Vérifier les droits : client propriétaire, prestataire concerné ou admin
    const isClientOwner = reservation.clientId.toString() === userId;
    const isPrestataireConcerned = reservation.prestataireId.toString() === userId;
    if (!isClientOwner && !isPrestataireConcerned && userRole !== 'admin') {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à annuler cette réservation' });
    }

    if (reservation.statut === 'annulee') {
      return res.status(400).json({ message: 'Cette réservation est déjà annulée' });
    }

    reservation.statut = 'annulee';
    reservation.annulationMotif = req.body.motif || 'Annulation par l\'utilisateur';
    await reservation.save();

    res.json({ message: 'Réservation annulée avec succès', reservation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Modifier une réservation (client uniquement, avant confirmation)
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { date, duree, notes } = req.body;

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation introuvable' });
    }

    if (reservation.clientId.toString() !== userId) {
      return res.status(403).json({ message: 'Vous ne pouvez modifier que vos propres réservations' });
    }

    if (reservation.statut !== 'en_attente') {
      return res.status(400).json({ message: 'Seules les réservations en attente peuvent être modifiées' });
    }

    // Si la date ou la durée change, vérifier la disponibilité
    if (date || duree) {
      const newDate = date ? new Date(date) : reservation.date;
      const newDuree = duree || reservation.duree;
      const isAvailable = await checkCreneauAvailability(
        reservation.prestataireId,
        newDate,
        newDuree,
        reservation._id // exclure cette réservation de la vérification
      );
      if (!isAvailable) {
        return res.status(409).json({ message: 'Le nouveau créneau n\'est pas disponible' });
      }
    }

    if (date) reservation.date = new Date(date);
    if (duree) reservation.duree = duree;
    if (notes !== undefined) reservation.notes = notes;

    await reservation.save();
    res.json({ message: 'Réservation modifiée avec succès', reservation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Tableau de bord client : mes réservations à venir / passées
exports.getMesReservations = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { statut, limit = 20, page = 1 } = req.query;

    const query = { clientId };
    if (statut) query.statut = statut;

    const now = new Date();

    // Pour distinguer à venir / passées, on peut filtrer par date
    const filterType = req.query.type; // 'upcoming' ou 'past'
    if (filterType === 'upcoming') {
      query.date = { $gte: now };
      query.statut = { $nin: ['annulee', 'terminee'] };
    } else if (filterType === 'past') {
      query.date = { $lt: now };
    }

    const skip = (page - 1) * limit;

    const reservations = await Reservation.find(query)
      .populate('prestataireId', 'nom prenom email photo')
      .populate('serviceId', 'nom description')
      .sort({ date: filterType === 'upcoming' ? 1 : -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Reservation.countDocuments(query);

    res.json({
      reservations,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fonction utilitaire pour vérifier la disponibilité d'un créneau
async function checkCreneauAvailability(prestataireId, date, duree, excludeReservationId = null) {
  const disponibilites = await Disponibilite.findOne({ prestataireId });
  if (!disponibilites) return false;

  const dateMoment = moment(date);
  const jourSemaine = dateMoment.format('dddd').toLowerCase();

  // Vérifier congés
  if (disponibilites.conges.some(c => moment(c).isSame(dateMoment, 'day'))) {
    return false;
  }

  // Vérifier si le créneau est dans les horaires de travail
  const creneauJour = disponibilites.creneaux.find(c => c.jour === jourSemaine);
  if (!creneauJour) return false;

  const debutJour = moment(`${dateMoment.format('YYYY-MM-DD')} ${creneauJour.debut}`, 'YYYY-MM-DD HH:mm');
  const finJour = moment(`${dateMoment.format('YYYY-MM-DD')} ${creneauJour.fin}`, 'YYYY-MM-DD HH:mm');
  const finCreneau = dateMoment.clone().add(duree, 'minutes');

  if (dateMoment.isBefore(debutJour) || finCreneau.isAfter(finJour)) {
    return false;
  }

  // Vérifier les réservations existantes
  const debutJourQuery = dateMoment.clone().startOf('day').toDate();
  const finJourQuery = dateMoment.clone().endOf('day').toDate();

  const query = {
    prestataireId,
    date: { $gte: debutJourQuery, $lte: finJourQuery },
    statut: { $nin: ['annulee'] }
  };

  if (excludeReservationId) {
    query._id = { $ne: excludeReservationId };
  }

  const reservationsExistantes = await Reservation.find(query);

  return !reservationsExistantes.some(res => {
    const debutRes = moment(res.date);
    const finRes = moment(res.date).add(res.duree, 'minutes');
    return dateMoment.isBefore(finRes) && finCreneau.isAfter(debutRes);
  });
}