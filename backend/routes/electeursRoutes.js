const express = require('express');
const router = express.Router();
const db = require('../connection');

// Récupérer les électeurs
router.get('/', (req, res) => {
  db.query('SELECT * FROM electeurs', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des électeurs', details: err });
    res.json(results);
  });
});


module.exports = router;
