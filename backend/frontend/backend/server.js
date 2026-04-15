const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("./db");
const { verifyToken, SECRET } = require("./middleware");

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
REGISTER
========================= */
app.post("/register", async (req, res) => {
const { name, email, password, role } = req.body;

const hashedPassword = await bcrypt.hash(password, 10);

db.run(
"INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
[name, email, hashedPassword, role],
(err) => {
if (err) return res.status(400).json({ message: "Email déjà utilisé" });

res.json({ message: "Utilisateur créé" });
}
);
});

/* =========================
LOGIN
========================= */
app.post("/login", (req, res) => {
const { email, password } = req.body;

db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

const valid = await bcrypt.compare(password, user.password);
if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });

const token = jwt.sign(
{ id: user.id, email: user.email, role: user.role },
SECRET,
{ expiresIn: "2h" }
);

res.json({ token });
});
});

/* =========================
PROFILE (protégé JWT)
========================= */
app.get("/profile", verifyToken, (req, res) => {
db.get("SELECT id, name, email, role FROM users WHERE id = ?", [req.user.id],
(err, user) => {
res.json(user);
});
});

app.listen(3000, () => console.log("Serveur lancé sur http://localhost:3000"));