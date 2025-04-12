// 1. Importations
import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import './FicheCandidats.css';

// 2. Données candidates
const candidatsData = [
  {
    id_candidat: 1,
    nom: 'Brice Clotaire Oligui Nguema',
    photo: 'oligui.avif',
    description: 'Président de la Transition',
  },
  {
    id_candidat: 2,
    nom: 'Alain-Claude Bilié By Nzé',
    photo: 'billie-bi.avif',
    description: 'Ancien Ministre',
  },
  {
    id_candidat: 3,
    nom: 'Zenaba Gninga Chaning',
    photo: 'zenaba.webp',
    description: 'Militante pour la jeunesse',
  },
  {
    id_candidat: 4,
    nom: 'Joseph Lapensée Essingone',
    photo: 'joseph.jpeg',
    description: 'Homme politique gabonais',
  },
  {
    id_candidat: 5,
    nom: 'Stéphane Germain Iloko',
    photo: 'stephanegermain.jpg',
    description: 'Entrepreneur engagé',
  },
  {
    id_candidat: 6,
    nom: 'Axel Stophène Ibinga Ibinga',
    photo: 'axelstophene.jpg',
    description: 'Médecin spécialiste',
  },
  {
    id_candidat: 7,
    nom: 'Alain Simplice Boungouères',
    photo: 'alain.webp',
    description: 'Député sortant',
  },
  {
    id_candidat: 8,
    nom: 'Thierry Yvon Michel Ngoma',
    photo: 'thierryivon.jpg',
    description: 'Acteur social',
  },
];

// 3. Données simulées de votes
const simulatedVotes = [
  { id_candidat: 1, votes: 0 },
  { id_candidat: 2, votes: 0 },
  { id_candidat: 3, votes: 0 },
  { id_candidat: 4, votes: 0 },
  { id_candidat: 5, votes: 0 },
  { id_candidat: 6, votes: 0 },
  { id_candidat: 7, votes: 0 },
  { id_candidat: 8, votes: 0 },
];

// 4. Composant principal
const FicheCandidats = () => {
  const [votes, setVotes] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);

  // Chargement initial des données de votes
  useEffect(() => {
    const total = simulatedVotes.reduce((sum, c) => sum + c.votes, 0);
    const votesMap = simulatedVotes.reduce((acc, vote) => {
      acc[vote.id_candidat] = vote.votes;
      return acc;
    }, {});
    setVotes(votesMap);
    setTotalVotes(total);
  }, []);

  return (
    <div className='result'>
      <h2>Résultats des Candidats pour les 1er et 2e Arrondissements de Port-Gentil</h2>

      <div className="fiche-candidats-container">
        {candidatsData.map((candidat) => {
          const nombreVotes = votes[candidat.id_candidat] || 0;
          const pourcentage = totalVotes ? ((nombreVotes / totalVotes) * 100).toFixed(2) : 0;

          return (
            <Link
              to={`/${encodeURIComponent(candidat.nom + ' : ' + candidat.description)}`}
              key={candidat.id_candidat}
              style={{ textDecoration: 'none' }}
            >
              <div className="candidat-card">
                <img src={`/${candidat.photo}`} alt={candidat.nom} />
                <h3>{candidat.nom}</h3>
                <p>{candidat.description}</p>
                <p>{nombreVotes} vote(s)</p>

                <div className="cercle-vote">
                  <CircularProgressbar
                    value={pourcentage}
                    text={`${pourcentage}%`}
                    styles={buildStyles({
                      textSize: '18px',
                      pathColor: '#00BFFF',
                      textColor: '#fff',
                      trailColor: '#d6d6d6',
                    })}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FicheCandidats;
