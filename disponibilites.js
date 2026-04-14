const express = require('express');
const router = express.Router();
const disponibiliteController = require('../controllers/disponibiliteController');
const { protect } = require('../middleware/auth');

// Routes publiques
router.get('/prestataire/:prestataireId', disponibiliteController.getDisponibilitesPrestataire);
router.get('/prestataire/:prestataireId/creneaux', disponibiliteController.getCreneauxDisponibles);

// Routes protégées pour les prestataires
router.put('/', protect, disponibiliteController.updateDisponibilites);

module.exports = router;