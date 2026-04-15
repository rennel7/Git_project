const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const { protect, restrictTo } = require('../middleware/auth');

// Toutes les routes nécessitent une authentification
router.use(protect);

// Routes client
router.post('/', restrictTo('client'), reservationController.createReservation);
router.get('/mes-reservations', restrictTo('client'), reservationController.getMesReservations);
router.patch('/:id', restrictTo('client'), reservationController.updateReservation);
router.delete('/:id', restrictTo('client', 'prestataire', 'admin'), reservationController.cancelReservation);

// Routes prestataire (à ajouter selon besoin)
// router.get('/prestataire/agenda', restrictTo('prestataire'), ...);

module.exports = router;