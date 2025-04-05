import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import io from 'socket.io-client';
import axios from 'axios';
import './InfosCandidats.css';

const socket = io('http://localhost:5000'); // Connexion WebSocket

const InfosCandidats = () => {
  const candidatsData = [
    { id_candidat: 1, nom: 'Alain Simplice Boungouères', image: 'alain.webp' },
    { id_candidat: 2, nom: 'Brice Clotaire Oligui Nguema', image: 'oligui.avif' },
    { id_candidat: 3, nom: 'Zenaba Gninga Chaning', image: 'zenaba.webp' },
    { id_candidat: 4, nom: 'Joseph Lapensée Essingone', image: 'diana.webp' },
    { id_candidat: 5, nom: 'Stéphane Germain Iloko', image: 'eric.webp' },
    { id_candidat: 6, nom: 'Axel Stophène Ibinga Ibinga', image: 'francoise.webp' },
    { id_candidat: 7, nom: 'Alain-Claude Bilié By Nzé', image: 'georges.webp' },
    { id_candidat: 8, nom: 'Thierry Yvon Michel Ngoma', image: 'helene.webp' },
  ];

  const [votes, setVotes] = useState({});

  // Fonction pour récupérer les votes depuis l'API
  const fetchVotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/votes');
      const votesMap = response.data.reduce((acc, vote) => {
        acc[vote.id_candidat] = vote.votes;
        return acc;
      }, {});
      setVotes(votesMap);
    } catch (error) {
      console.error("Erreur lors du chargement des votes :", error);
    }
  };

  useEffect(() => {
    fetchVotes(); // Charger les votes au chargement de la page

    // Écoute des mises à jour en temps réel via WebSocket
    socket.on('updateVotes', (updatedVotes) => {
      const votesMap = updatedVotes.reduce((acc, vote) => {
        acc[vote.id_candidat] = vote.votes;
        return acc;
      }, {});
      setVotes(votesMap);
    });

    return () => socket.off('updateVotes');
  }, []);

  return (
    <div className="info-candidats">
      <h2>Résultats des Candidats</h2>

      <div className="candidats-list">
        {candidatsData.map((candidat) => {
          const candidatVotes = votes[candidat.id_candidat] || 0;

          return (
            <div key={candidat.id_candidat} className="candidat-card">
              <img src={`/${candidat.image}`} alt={candidat.nom} className="candidat-img" />
              <div className="candidat-info">
                <h3>{candidat.nom}</h3>
                <p>{candidatVotes} votes</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Graphique des votes */}
      <h2>Graphique des Votes</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={candidatsData.map(c => ({
            name: c.nom,
            votes: votes[c.id_candidat] || 0
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="votes" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InfosCandidats;
