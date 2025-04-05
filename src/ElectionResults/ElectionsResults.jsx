import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import { Chart, registerables, CategoryScale } from 'chart.js';
import './ElectionsResults.css';

Chart.register(...registerables, CategoryScale);

const ElectionResults = () => {
  const [candidats, setCandidats] = useState([]);
  const [votes, setVotes] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [winner, setWinner] = useState(null); // Pour stocker le vainqueur

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('newVote', (data) => {
      console.log('Nouveau vote reçu:', data);
      setVotes((prevVotes) =>
        prevVotes.map(v =>
          v.id_candidat === data.id_candidat ? { ...v, votes: v.votes + 1 } : v
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/candidats')
      .then(response => response.json())
      .then(data => setCandidats(data));

    fetch('http://localhost:5000/electeurs')
      .then(response => response.json())
      .then(data => {
        const total = data.reduce((acc, electeur) => acc + (electeur.votes_exprimes || 0), 0);
        setTotalVotes(total);

        setVotes(data.map(v => ({
          id_candidat: v.id_candidat,
          votes: v.votes_exprimes || 0
        })));
      });
  }, []);

  // Mise à jour du vainqueur
  useEffect(() => {
    if (votes.length > 0) {
      const maxVotes = Math.max(...votes.map(v => v.votes));
      const winnerCandidate = candidats.find(c => c.id_candidat === votes.find(v => v.votes === maxVotes)?.id_candidat);
      setWinner(winnerCandidate);
    }
  }, [votes, candidats]);

  const chartData = {
    labels: candidats.map(c => c.nom),
    datasets: [{
      label: 'Votes obtenus',
      data: candidats.map(c => votes.find(v => v.id_candidat === c.id_candidat)?.votes || 0),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 3,
    }],
  };

  // Calcul des pourcentages
  const getPercentage = (votesForCandidat) => {
    return totalVotes > 0 ? ((votesForCandidat / totalVotes) * 100).toFixed(2) : 0;
  };

  return (
    <div className='election'>
      <h1>Résultats des Élections</h1>
      <p>Total des votes exprimés: {totalVotes}</p>
      <Line key={JSON.stringify(votes)} data={chartData} />

      <h2>Détail des votes par candidat</h2>
      <ul>
        {candidats.map(c => {
          const candidatVotes = votes.find(v => v.id_candidat === c.id_candidat)?.votes || 0;
          const percentage = getPercentage(candidatVotes);

          return (
            <li key={c.id_candidat} className="candidat-item">
              
              {/* Nom du candidat, nombre de votes et pourcentage */}
              <span>{c.nom}: {candidatVotes} votes ({percentage}%)</span>
            </li>
          );
        })}
      </ul>

      {/* Affichage du vainqueur si l'élection est terminée */}
      {winner && (
        <div className="winner">
          <h2>Vainqueur de l'élection:</h2>
          <h1>{winner.nom}</h1>
        </div>
      )}
    </div>
  );
};

export default ElectionResults;
