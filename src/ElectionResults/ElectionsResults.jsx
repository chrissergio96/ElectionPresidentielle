import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables, CategoryScale } from 'chart.js';
import './ElectionsResults.css';

Chart.register(...registerables, CategoryScale);

const ElectionResults = () => {
  // Données simulées des candidats et des votes
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
    { id_candidat: 1, votes: 4000 },
    { id_candidat: 2, votes: 3500 },
    { id_candidat: 3, votes: 1500 },
    { id_candidat: 4, votes: 1200 },
    { id_candidat: 5, votes: 900 },
    { id_candidat: 6, votes: 800 },
    { id_candidat: 7, votes: 700 },
    { id_candidat: 8, votes: 600 },
  ]);

  const totalVotes = votes.reduce((acc, curr) => acc + curr.votes, 0);

  const chartData = {
    labels: candidatsData.map(c => c.nom),
    datasets: [{
      label: 'Votes obtenus',
      data: candidatsData.map(c => votes.find(v => v.id_candidat === c.id_candidat)?.votes || 0),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 3,
    }],
  };

  const getPercentage = (votesForCandidat) => {
    return totalVotes > 0 ? ((votesForCandidat / totalVotes) * 100).toFixed(2) : 0;
  };

  const winner = candidatsData.find(c => {
    const maxVotes = Math.max(...votes.map(v => v.votes));
    return votes.find(v => v.id_candidat === c.id_candidat && v.votes === maxVotes);
  });

  return (
    <div className='election'>
      <h1>Résultats des Élections</h1>
      <p>Total des votes exprimés: {totalVotes}</p>
      <Line data={chartData} />

      <h2>Détail des votes par candidat</h2>
      <ul>
        {candidatsData.map(c => {
          const candidatVotes = votes.find(v => v.id_candidat === c.id_candidat)?.votes || 0;
          const percentage = getPercentage(candidatVotes);

          return (
            <li key={c.id_candidat} className="candidat-item">
              <span>{c.nom}: {candidatVotes} votes ({percentage}%)</span>
            </li>
          );
        })}
      </ul>

      {winner && (
        <div className='winner'>
          <h2>Gagnant</h2>
          <p>{winner.nom} avec {votes.find(v => v.id_candidat === winner.id_candidat)?.votes || 0} votes</p>
        </div>
      )}
    </div>
  );
};

export default ElectionResults;
