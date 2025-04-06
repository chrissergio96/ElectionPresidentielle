const express = require('express');
const router = express.Router();
const db = require('../connection');

// Récupérer les candidats
router.get('/', (req, res) => {
  db.query('SELECT * FROM candidats', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des candidats', details: err });
    res.json(results);
  });
});

// Ajouter un candidat
router.post('/', (req, res) => {
  const { nom, photo } = req.body;

  // Validation des données
  if (!nom || !photo) {
    return res.status(400).json({ error: 'Nom et photo sont requis' });
  }

  const sql = 'INSERT INTO candidats (nom, photo) VALUES (?, ?)';
  db.query(sql, [nom, photo], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de l\'ajout du candidat', details: err });

    res.json({ message: 'Candidat ajouté avec succès !' });
  });
});

module.exports = router;
