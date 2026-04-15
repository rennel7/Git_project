const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prestataireId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service', 
    required: false
  },
  date: {
    type: Date, 
    required: true
  },
  duree: {
    type: Number, 
    default: 60
  },
  statut: {
    type: String,
    enum: ['en_attente', 'confirmee', 'annulee', 'terminee'],
    default: 'en_attente'
  },
  notes: String,
  annulationMotif: String
}, { timestamps: true });

// Index pour recherche rapide
reservationSchema.index({ clientId: 1, date: -1 });
reservationSchema.index({ prestataireId: 1, date: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);
