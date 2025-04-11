import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import './Dashboard.css';

function Dashboard() {
  // Données simulées des statistiques
  const [stats] = useState({
    total_electeurs: 33637,
    votants: 30000,
    taux_participation: 80,
    taux_abstention: 20,
  });

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

  const totalVotes = 30000;

  const chartData = {
    labels: candidatsData.map(c => c.nom),
    datasets: [
      {
        label: 'Votes par candidat',
        data: candidatsData.map(c => votes.find(v => v.id_candidat === c.id_candidat)?.votes || 0),
        backgroundColor: ['#FF6F61', '#FFB2A6', '#FF8C00', '#FFD700'],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  return (
    <div className="dashboard">
      <h2>Tableau de bord des élections</h2>
      <div className="stats">
        <p>Total des électeurs: {stats.total_electeurs}</p>
        <p>Total des votants: {stats.votants}</p>
        <p>Total des Bureaux de vote: 74</p>
        <p>Taux de participation: {stats.taux_participation}%</p>
        <p>Taux d'abstention: {stats.taux_abstention}%</p>
        <p>Total des votes: {totalVotes}</p>
      </div>
      <div className="chart">
        <Doughnut data={chartData} />
      </div>
    </div>
  );
}

export default Dashboard;
