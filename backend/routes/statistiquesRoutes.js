const express = require('express');
const router = express.Router();
const db = require('../connection');

// Statistiques globales
router.get('/globales', (req, res) => {
  let stats = {};
  db.query('SELECT COUNT(*) AS total_electeurs FROM electeurs', (err, result) => {
    if (err) return res.status(500).json({ error: err });
    stats.total_electeurs = result[0].total_electeurs;

    db.query('SELECT COUNT(*) AS votants FROM electeurs WHERE a_vote = 1', (err, result) => {
      if (err) return res.status(500).json({ error: err });
      stats.votants = result[0].votants;

      db.query('SELECT COUNT(*) AS nuls FROM votes WHERE bulletin_valide = 0', (err, result) => {
        if (err) return res.status(500).json({ error: err });
        stats.bulletins_nuls = result[0].nuls;

        stats.taux_participation = ((stats.votants / stats.total_electeurs) * 100).toFixed(2);
        stats.taux_abstention = (100 - stats.taux_participation).toFixed(2);
        res.json(stats);
      });
    });
  });
});

module.exports = router;
