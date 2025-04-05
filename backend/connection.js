const mysql = require('mysql2');

// Connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Remplace par tes informations
  password: '',  // Remplace par ton mot de passe
  database: 'election_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données: ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données.');
});

module.exports = connection;
