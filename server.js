/**
 * ServEasy — Back-end Notifications & Communication
 * Stack : Node.js + Express + Nodemailer + Socket.io
 *
 * Installation :
 *   npm install express nodemailer socket.io cors dotenv
 *
 * Lancement :
 *   node server.js
 */

require('dotenv').config();
const express    = require('express');
const http       = require('http');
const { Server } = require('socket.io');
const nodemailer = require('nodemailer');
const cors       = require('cors');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

/* ════════════════════════════════════════════════════════════
   BASE DE DONNÉES SIMULÉE  (remplacer par MySQL / MongoDB)
════════════════════════════════════════════════════════════ */
let notifications = [
  { id: 1, userId: 'u1', type: 'confirmed', title: 'Dr. Amina Fouda — Dentiste',
    desc: 'Votre RDV du 14 avril à 09h30 est confirmé.', time: new Date().toISOString(), unread: true },
  { id: 2, userId: 'u1', type: 'reminder',  title: 'Paul Essomba — Plombier',
    desc: 'Intervention demain à 14h00.', time: new Date().toISOString(), unread: true },
  { id: 3, userId: 'u1', type: 'message',   title: 'Awa Diallo — Ménage',
    desc: 'Bonjour, je serai là à 8h pile.', time: new Date().toISOString(), unread: false },
  { id: 4, userId: 'u1', type: 'cancelled', title: 'Jean-Paul — Chauffeur',
    desc: 'RDV du 12 avril annulé.', time: new Date().toISOString(), unread: false },
];

let conversations = [
  { id: 1, participants: ['u1', 'p1'], prestataireName: 'Awa Diallo', prestataireRole: 'Ménage domicile', ava: '🧹' },
  { id: 2, participants: ['u1', 'p2'], prestataireName: 'Dr. Amina Fouda', prestataireRole: 'Dentiste', ava: '🦷' },
];

let messages = [
  { id: 1, conversationId: 1, from: 'p1', text: 'Bonjour ! Je confirme notre RDV pour le ménage.', time: new Date().toISOString() },
  { id: 2, conversationId: 1, from: 'u1', text: null, rdv: 'Ménage · Mercredi 13 avril · 08h00', time: new Date().toISOString() },
  { id: 3, conversationId: 1, from: 'p1', text: 'Je serai là à 8h pile. Avez-vous des instructions ?', time: new Date().toISOString() },
  { id: 4, conversationId: 2, from: 'p2', text: 'Votre RDV du 14 avril à 09h30 est confirmé.', time: new Date().toISOString() },
];

let historyLog = [
  { id: 1, svc: '🦷 Dentiste',  type: 'confirmed', label: 'Confirmation', dest: 'fatima@email.com', date: new Date().toISOString(), status: 'lu' },
  { id: 2, svc: '🔧 Plombier', type: 'reminder',  label: 'Rappel J-1',   dest: 'fatima@email.com', date: new Date().toISOString(), status: 'env' },
  { id: 3, svc: '🧹 Ménage',   type: 'message',   label: 'Message',      dest: 'In-app',            date: new Date().toISOString(), status: 'lu' },
  { id: 4, svc: '🚗 Chauffeur',type: 'cancelled', label: 'Annulation',   dest: 'fatima@email.com', date: new Date().toISOString(), status: 'lu' },
];

/* ════════════════════════════════════════════════════════════
   NODEMAILER — configuration SMTP
   Remplacez par vos identifiants (ex : Brevo / Mailgun / Gmail)
════════════════════════════════════════════════════════════ */
const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
  port:   parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'rennelilda7@gmail.com',
    pass: process.env.SMTP_PASS || 'lfpc mjdg eyby lxmq',
  },
});

/* ── Vérification connexion SMTP au démarrage ── */
transporter.verify((err) => {
  if (err) console.warn('⚠️  SMTP non configuré :', err.message);
  else     console.log('✅  SMTP prêt');
});

/* ════════════════════════════════════════════════════════════
   TEMPLATES EMAIL  (HTML inline)
════════════════════════════════════════════════════════════ */
function templateConfirmation({ prenom, prestataire, service, date, heure }) {
  return `
  <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #D4E6D8;">
    <div style="background:#1E4035;padding:20px 24px;display:flex;align-items:center;gap:14px;">
      <span style="font-size:28px;">📅</span>
      <div>
        <div style="font-size:18px;font-weight:700;color:#fff;font-family:Georgia,serif;">Serv<span style="color:#E8572A;">Easy</span></div>
        <div style="font-size:11px;color:rgba(255,255,255,0.5);">Votre plateforme de réservation au Cameroun</div>
      </div>
    </div>
    <div style="padding:24px;">
      <p style="font-size:15px;font-weight:600;color:#1A2E25;">Bonjour ${prenom} 👋</p>
      <p style="font-size:13px;color:#7A9080;line-height:1.7;">Votre rendez-vous a bien été réservé. Voici les détails :</p>
      <div style="background:#EEF7EE;border:1px solid #D4E6D8;border-radius:10px;padding:16px;margin:14px 0;display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        <div><div style="font-size:10px;text-transform:uppercase;color:#7A9080;letter-spacing:.05em;">Prestataire</div><div style="font-size:14px;font-weight:600;color:#1A2E25;">${prestataire}</div></div>
        <div><div style="font-size:10px;text-transform:uppercase;color:#7A9080;letter-spacing:.05em;">Service</div><div style="font-size:14px;font-weight:600;color:#1A2E25;">${service}</div></div>
        <div><div style="font-size:10px;text-transform:uppercase;color:#7A9080;letter-spacing:.05em;">Date</div><div style="font-size:14px;font-weight:600;color:#1A2E25;">${date}</div></div>
        <div><div style="font-size:10px;text-transform:uppercase;color:#7A9080;letter-spacing:.05em;">Heure</div><div style="font-size:14px;font-weight:600;color:#1A2E25;">${heure}</div></div>
      </div>
      <p style="font-size:12px;color:#7A9080;">Vous pouvez modifier ou annuler gratuitement jusqu'à 24h avant le RDV.</p>
      <div style="display:flex;gap:10px;margin-top:16px;">
        <a href="${process.env.APP_URL || 'http://localhost:3000'}/reservations" style="flex:1;display:block;padding:11px;background:#1E4035;color:#fff;text-align:center;border-radius:9px;text-decoration:none;font-size:13px;font-weight:600;">Voir ma réservation</a>
        <a href="${process.env.APP_URL || 'http://localhost:3000'}/annuler" style="flex:1;display:block;padding:11px;background:#E8E3DA;color:#7A9080;text-align:center;border-radius:9px;text-decoration:none;font-size:13px;font-weight:600;">Annuler</a>
      </div>
    </div>
  </div>`;
}

function templateRappel({ prenom, prestataire, service, heure, adresse }) {
  return `
  <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #D4E6D8;">
    <div style="background:#1E4035;padding:20px 24px;">
      <div style="font-size:18px;font-weight:700;color:#fff;font-family:Georgia,serif;">Serv<span style="color:#E8572A;">Easy</span></div>
      <div style="font-size:11px;color:rgba(255,255,255,0.5);">Rappel de rendez-vous</div>
    </div>
    <div style="padding:24px;">
      <p style="font-size:15px;font-weight:600;color:#1A2E25;">Rappel — Demain à ${heure} 🔔</p>
      <p style="font-size:13px;color:#7A9080;line-height:1.7;">
        N'oubliez pas votre rendez-vous demain matin avec <strong>${prestataire}</strong> (${service}).<br>
        Arrivez 5 min avant et pensez à votre carnet de santé.
      </p>
      <div style="background:#EEF7EE;border:1px solid #D4E6D8;border-radius:10px;padding:14px;margin:14px 0;">
        <div style="font-size:10px;text-transform:uppercase;color:#7A9080;">Adresse</div>
        <div style="font-size:14px;font-weight:600;color:#1A2E25;">${adresse}</div>
      </div>
    </div>
  </div>`;
}

function templateAnnulation({ prenom, prestataire, service, dateRdv }) {
  return `
  <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;border:1px solid #D4E6D8;">
    <div style="background:#8B1A1A;padding:20px 24px;">
      <div style="font-size:18px;font-weight:700;color:#fff;font-family:Georgia,serif;">Serv<span style="color:#E8572A;">Easy</span></div>
      <div style="font-size:11px;color:rgba(255,255,255,0.5);">Réservation annulée</div>
    </div>
    <div style="padding:24px;">
      <p style="font-size:15px;font-weight:600;color:#1A2E25;">Désolé ${prenom} 😔</p>
      <p style="font-size:13px;color:#7A9080;line-height:1.7;">
        Votre réservation avec <strong>${prestataire}</strong> (${service}) du ${dateRdv} a été annulée.<br>
        Un remboursement complet a été initié sous 3–5 jours ouvrés.
      </p>
      <a href="${process.env.APP_URL || 'http://localhost:3000'}/catalogue" style="display:block;padding:11px;background:#1E4035;color:#fff;text-align:center;border-radius:9px;text-decoration:none;font-size:13px;font-weight:600;margin-top:16px;">Trouver un autre prestataire</a>
    </div>
  </div>`;
}

/* ════════════════════════════════════════════════════════════
   FONCTION D'ENVOI D'EMAIL
════════════════════════════════════════════════════════════ */
async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"ServEasy" <${process.env.SMTP_USER || 'rennelilda7@gmail.com'}>`,
      to, subject, html,
    });
    console.log('📧  Email envoyé :', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('❌  Erreur email :', err.message);
    return { success: false, error: err.message };
  }
}

/* ════════════════════════════════════════════════════════════
   ROUTES API
════════════════════════════════════════════════════════════ */

/* ── GET /api/notifications ──────────────────────────────── */
app.get('/api/notifications', (req, res) => {
  const userId = req.query.userId || 'u1';
  const data   = notifications.filter(n => n.userId === userId);
  res.json({ notifications: data, unreadCount: data.filter(n => n.unread).length });
});

/* ── PATCH /api/notifications/:id/read ──────────────────── */
app.patch('/api/notifications/:id/read', (req, res) => {
  const n = notifications.find(x => x.id === parseInt(req.params.id));
  if (!n) return res.status(404).json({ error: 'Notification introuvable' });
  n.unread = false;
  res.json({ success: true, notification: n });
});

/* ── DELETE /api/notifications/:id ──────────────────────── */
app.delete('/api/notifications/:id', (req, res) => {
  const idx = notifications.findIndex(x => x.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Notification introuvable' });
  notifications.splice(idx, 1);
  res.json({ success: true });
});

/* ── GET /api/conversations ──────────────────────────────── */
app.get('/api/conversations', (req, res) => {
  const userId = req.query.userId || 'u1';
  const data   = conversations.filter(c => c.participants.includes(userId));
  res.json({ conversations: data });
});

/* ── GET /api/conversations/:id/messages ────────────────── */
app.get('/api/conversations/:id/messages', (req, res) => {
  const convId = parseInt(req.params.id);
  const msgs   = messages.filter(m => m.conversationId === convId);
  res.json({ messages: msgs });
});

/* ── POST /api/messages ──────────────────────────────────── */
app.post('/api/messages', (req, res) => {
  const { conversationId, from, text, rdv } = req.body;
  if (!conversationId || !from || (!text && !rdv)) {
    return res.status(400).json({ error: 'conversationId, from et text/rdv sont requis' });
  }
  const msg = { id: messages.length + 1, conversationId, from, text: text || null, rdv: rdv || null, time: new Date().toISOString() };
  messages.push(msg);

  // Émettre en temps réel via Socket.io
  io.to(`conv-${conversationId}`).emit('new_message', msg);

  // Créer une notification in-app pour le destinataire
  const notif = {
    id: notifications.length + 1,
    userId: from === 'u1' ? 'p1' : 'u1',   // à adapter selon votre logique utilisateurs
    type: 'message',
    title: 'Nouveau message',
    desc: text || '📅 Réservation partagée',
    time: msg.time,
    unread: true,
  };
  notifications.push(notif);
  io.emit('new_notification', notif);

  res.status(201).json({ success: true, message: msg });
});

/* ── GET /api/history ────────────────────────────────────── */
app.get('/api/history', (req, res) => {
  const { type } = req.query;
  const data = type && type !== 'all' ? historyLog.filter(h => h.type === type) : historyLog;
  res.json({ history: data });
});

/* ══════════════════════════════════════════════════════════
   ROUTES EMAIL  — déclenchées après une réservation
══════════════════════════════════════════════════════════ */

/* ── POST /api/email/confirmation ───────────────────────── */
app.post('/api/email/confirmation', async (req, res) => {
  const { email, prenom, prestataire, service, date, heure } = req.body;
  if (!email || !prenom) return res.status(400).json({ error: 'email et prenom requis' });

  const html    = templateConfirmation({ prenom, prestataire, service, date, heure });
  const result  = await sendEmail({ to: email, subject: `✅ Réservation confirmée — ${service}`, html });

  if (result.success) {
    historyLog.push({ id: historyLog.length + 1, svc: service, type: 'confirmed', label: 'Confirmation', dest: email, date: new Date().toISOString(), status: 'env' });
  }
  res.json(result);
});

/* ── POST /api/email/rappel ─────────────────────────────── */
app.post('/api/email/rappel', async (req, res) => {
  const { email, prenom, prestataire, service, heure, adresse } = req.body;
  if (!email || !prenom) return res.status(400).json({ error: 'email et prenom requis' });

  const html   = templateRappel({ prenom, prestataire, service, heure, adresse });
  const result = await sendEmail({ to: email, subject: `⏰ Rappel RDV demain à ${heure} — ${service}`, html });

  if (result.success) {
    historyLog.push({ id: historyLog.length + 1, svc: service, type: 'reminder', label: 'Rappel J-1', dest: email, date: new Date().toISOString(), status: 'env' });
  }
  res.json(result);
});

/* ── POST /api/email/annulation ─────────────────────────── */
app.post('/api/email/annulation', async (req, res) => {
  const { email, prenom, prestataire, service, dateRdv } = req.body;
  if (!email || !prenom) return res.status(400).json({ error: 'email et prenom requis' });

  const html   = templateAnnulation({ prenom, prestataire, service, dateRdv });
  const result = await sendEmail({ to: email, subject: `❌ Réservation annulée — ${service}`, html });

  if (result.success) {
    historyLog.push({ id: historyLog.length + 1, svc: service, type: 'cancelled', label: 'Annulation', dest: email, date: new Date().toISOString(), status: 'env' });
  }
  res.json(result);
});

/* ════════════════════════════════════════════════════════════
   SOCKET.IO — messagerie temps réel
════════════════════════════════════════════════════════════ */
io.on('connection', (socket) => {
  console.log('🔌  Client connecté :', socket.id);

  // Rejoindre une salle de conversation
  socket.on('join_conversation', (convId) => {
    socket.join(`conv-${convId}`);
    console.log(`   ↳ ${socket.id} rejoint conv-${convId}`);
  });

  // Quitter une salle
  socket.on('leave_conversation', (convId) => {
    socket.leave(`conv-${convId}`);
  });

  socket.on('disconnect', () => {
    console.log('🔌  Client déconnecté :', socket.id);
  });
});

/* ════════════════════════════════════════════════════════════
   DÉMARRAGE
════════════════════════════════════════════════════════════ */
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n🚀  ServEasy Notifications API`);
  console.log(`   http://localhost:${PORT}\n`);
  console.log(`   GET  /api/notifications`);
  console.log(`   GET  /api/conversations`);
  console.log(`   GET  /api/conversations/:id/messages`);
  console.log(`   POST /api/messages`);
  console.log(`   GET  /api/history`);
  console.log(`   POST /api/email/confirmation`);
  console.log(`   POST /api/email/rappel`);
  console.log(`   POST /api/email/annulation\n`);
});
