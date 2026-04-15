const mongoose = require('mongoose');

const creneauSchema = new mongoose.Schema({
  jour: {
    type: String,
    enum: ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'],
    required: true
  },
  debut: {
    type: String, // format "HH:mm"
    required: true
  },
  fin: {
    type: String, // format "HH:mm"
    required: true
  }
}, { _id: false });

const disponibiliteSchema = new mongoose.Schema({
  prestataireId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  creneaux: [creneauSchema],
  // Optionnel : dates d'exception (congés, jours fériés)
  conges: [Date],
  dureeRdv: {
    type: Number, // en minutes, par défaut 60
    default: 60
  }
}, { timestamps: true });

module.exports = mongoose.model('Disponibilite', disponibiliteSchema);