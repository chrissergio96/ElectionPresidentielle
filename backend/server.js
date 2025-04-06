// Importation des modules nécessaires
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const candidatsRoutes = require('./routes/candidatsRoutes');
const electeursRoutes = require('./routes/electeursRoutes');
const votesRoutes = require('./routes/votesRoutes');

// Création de l'application Express
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'election_db'
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ', err);
    process.exit();
  }
  console.log('Connecté à la base de données MySQL.');
});

// Utilisation des routes
app.use('/candidats', candidatsRoutes);
app.use('/electeurs', electeursRoutes);
app.use('/votes', votesRoutes);

// Socket.IO : Connexion
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté via WebSocket.');

  // Lorsqu'un vote est ajouté, émettre les résultats mis à jour
  socket.on('voteAdded', () => {
    db.query('SELECT id_candidat, COUNT(*) AS votes FROM votes GROUP BY id_candidat', (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des résultats des votes : ', err);
        return;
      }

      // Émettre l'événement avec les nouveaux résultats
      io.emit('updateVotes', results);
    });
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnecté.');
  });
});

// Démarrage du serveur
server.listen(5001, () => {
  console.log('Serveur en écoute sur le port 5001');
});
