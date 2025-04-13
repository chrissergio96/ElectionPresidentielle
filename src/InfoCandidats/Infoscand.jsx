import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import './Infoscand.css';

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


  const [votes] = useState([
    { id_candidat: 1, votes: 71 },
    { id_candidat: 2, votes:15212 },
    { id_candidat: 3, votes: 138 },
    { id_candidat: 4, votes: 160 },
    { id_candidat: 5, votes: 83 },
    { id_candidat: 6, votes: 63 },
    { id_candidat: 7, votes: 754 },
    { id_candidat: 8, votes: 26 },
  ]);

  // Fusionner les données des candidats et des votes
  const mergedData = candidatsData.map(c => ({
    name: c.nom,
    votes: votes.find(v => v.id_candidat === c.id_candidat)?.votes || 0
  }));

  // Trier les données par nombre de votes (décroissant)
  const sortedData = [...mergedData].sort((a, b) => b.votes - a.votes);

  
  const barColors = ['#FFFFFF', '#FFA500', '#FF0000']; // blanc, orange, rouge

  return (
    <div className="info-candidats">
      <h2>Graphique des Votes</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={sortedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="votes">
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index] || '#007BFF'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Infoscand;
