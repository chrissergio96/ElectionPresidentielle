// Importation des modules nécessaires
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

// Création de l'application Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Socket.io pour la mise à jour en temps réel

// Configuration du CORS (pour permettre l'accès à l'API depuis le frontend)
app.use(cors());
app.use(express.json());

// Connexion à la base de données MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Remplace par ton utilisateur
  password: '',  // Remplace par ton mot de passe
  database: 'election_db'
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ', err);
    process.exit();
  }
  console.log('Connecté à la base de données MySQL.');
});
// Route pour récupérer les votes en temps réel
app.get('/votes', (req, res) => {
  db.query('SELECT id_candidat, COUNT(*) AS votes FROM votes GROUP BY id_candidat', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// WebSocket pour envoyer les mises à jour des votes
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté via WebSocket.');

  socket.on('newVote', () => {
    db.query('SELECT id_candidat, COUNT(*) AS votes FROM votes GROUP BY id_candidat', (err, results) => {
      if (!err) {
        io.emit('updateVotes', results);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté.');
  });
});


// Routes de l'API
app.get('/candidats', (req, res) => {
  db.query('SELECT * FROM candidats', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/electeurs', (req, res) => {
  db.query('SELECT * FROM electeurs', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});
app.post('/candidats', (req, res) => {
  const { nom } = req.body;

  const sql = `INSERT INTO candidats (nom, photo) VALUES ('${nom}')`;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Candidat ajouté avec succès !' });
  });
});


app.post('/votes', (req, res) => {
  const { id_candidat, date_vote } = req.body;
  db.query('INSERT INTO votes (id_candidat, date_vote) VALUES (?, ?)', [id_candidat, date_vote], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    io.emit('newVote', { id_candidat, date_vote });  // Envoi de la mise à jour en temps réel
    res.status(201).json(result);
  });
});

// WebSocket pour la mise à jour en temps réel
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté via WebSocket.');

  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté.');
  });
});

// Démarrer le serveur sur le port 5000
server.listen(5000, () => {
  console.log('Serveur en écoute sur le port 5000');
});
