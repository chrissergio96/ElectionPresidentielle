import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Doughnut } from 'react-chartjs-2';
import './Dashboard.css';

const socket = io('http://localhost:5000');

function Dashboard() {
  const [candidats, setCandidats] = useState([]);
  const [votes, setVotes] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/candidats')
      .then(res => res.json())
      .then(setCandidats);

    fetchVotes();
    fetchStats();

    socket.on('updateVotes', fetchVotes);

    return () => socket.off('updateVotes');
  }, []);

  const fetchVotes = async () => {
    const res = await fetch('http://localhost:5000/votes');
    const data = await res.json();
    setVotes(data);
  };

  const fetchStats = async () => {
    const res = await fetch('http://localhost:5000/statistiques/globales');
    const data = await res.json();
    setStats(data);
  };

  const totalVotes = votes.reduce((sum, v) => sum + v.votes, 0);
  const data = {
    labels: candidats.map(c => c.nom),
    datasets: [{
      data: candidats.map(c => {
        const vote = votes.find(v => v.id_candidat === c.id_candidat);
        return vote ? vote.votes : 0;
      }),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8AFFC1', '#B266FF', '#FF8A65', '#64B5F6', '#FFD700'],
    }]
  };

  return (
    <div className="dashboard">
      <h1>Tableau de bord Élections</h1>
      <Doughnut data={data} />
      <div className="stats">
        <p>Total électeurs: {stats.total_electeurs}</p>
        <p>Votants: {stats.votants}</p>
        <p>Bulletins nuls: {stats.bulletins_nuls}</p>
        <p>Taux de participation: {stats.taux_participation}%</p>
        <p>Taux d'abstention: {stats.taux_abstention}%</p>
      </div>
    </div>
  );
}

export default Dashboard;
