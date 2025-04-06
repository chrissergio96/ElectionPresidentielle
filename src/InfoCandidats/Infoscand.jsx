import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import io from 'socket.io-client';
import axios from 'axios';
import './Infoscand.css';

const socket = io('http://localhost:5000'); // Connexion WebSocket

const Infoscand = () => {
  const candidatsData = [
    { id_candidat: 1, nom: 'Alain Simplice Boungouères' },
    { id_candidat: 2, nom: 'Brice Clotaire Oligui Nguema' },
    { id_candidat: 3, nom: 'Zenaba Gninga Chaning' },
    { id_candidat: 4, nom: 'Joseph Lapensée Essingone' },
    { id_candidat: 5, nom: 'Stéphane Germain Iloko' },
    { id_candidat: 6, nom: 'Axel Stophène Ibinga Ibinga' },
    { id_candidat: 7, nom: 'Alain-Claude Bilié By Nzé' },
    { id_candidat: 8, nom: 'Thierry Yvon Michel Ngoma' },
  ];

  const [votes, setVotes] = useState({});

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
    fetchVotes();

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
      <h2>Graphique des Votes</h2>
      <ResponsiveContainer width="100%" height={350}>
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
          <Bar dataKey="votes" fill="#007BFF" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Infoscand;
