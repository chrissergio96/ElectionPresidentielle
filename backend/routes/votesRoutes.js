// routes/votesRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../connection');

// Récupérer les votes par candidat
router.get('/', (req, res) => {
  const sql = `
    SELECT id_candidat, COUNT(*) AS votes 
    FROM votes 
    WHERE bulletin_valide = 1 
    GROUP BY id_candidat
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Erreur lors de la récupération des votes', details: err });
    res.json(results);
  });
});

// Ajouter un vote
router.post('/', (req, res) => {
  const { id_candidat, id_electeur, date_vote, bulletin_valide = 1 } = req.body;

  if (!id_candidat || !id_electeur || !date_vote) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  const sql = 'INSERT INTO votes (id_candidat, id_electeur, date_vote, bulletin_valide) VALUES (?, ?, ?, ?)';
  db.query(sql, [id_candidat, id_electeur, date_vote, bulletin_valide], (err) => {
    if (err) return res.status(500).json({ error: 'Erreur à l\'insertion du vote', details: err });

    // Marquer l’électeur comme ayant voté
    db.query('UPDATE electeurs SET a_vote = 1 WHERE id_electeur = ?', [id_electeur]);

    res.status(201).json({ message: 'Vote enregistré' });
  });
});

// Supprimer un vote
router.delete('/:id_vote', (req, res) => {
  const { id_vote } = req.params;
  db.query('DELETE FROM votes WHERE id_vote = ?', [id_vote], (err) => {
    if (err) return res.status(500).json({ error: 'Erreur à la suppression', details: err });
    res.json({ message: 'Vote supprimé' });
  });
});

module.exports = router;
