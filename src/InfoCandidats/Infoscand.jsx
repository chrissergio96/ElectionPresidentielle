import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './Infoscand.css';

const Infoscand = () => {
  // Données simulées des candidats
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

  // Données simulées des votes
  const [votes] = useState([
    { id_candidat: 1, votes: 454 },
    { id_candidat: 2, votes: 4855 },
    { id_candidat: 3, votes: 434 },
    { id_candidat: 4, votes: 453 },
    { id_candidat: 5, votes: 344 },
    { id_candidat: 6, votes: 0 },
    { id_candidat: 7, votes: 0 },
    { id_candidat: 8, votes: 0 },
  ]);

  return (
    <div className="info-candidats">
      <h2>Graphique des Votes</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={candidatsData.map(c => ({
            name: c.nom,
            votes: votes.find(v => v.id_candidat === c.id_candidat)?.votes || 0
          }))}>
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
