// app.js
const express = require('express');
const mongoose = require('mongoose');
const reservationRoutes = require('./routes/reservations');
const disponibiliteRoutes = require('./routes/disponibilites');

const app = express();
app.use(express.json());

// Routes
app.use('/api/reservations', reservationRoutes);
app.use('/api/disponibilites', disponibiliteRoutes);

// Connexion MongoDB...