import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom'; // Importation du Link
import './FicheCandidats.css';

// Données des candidats
const candidatsData = [
  { id_candidat: 2, nom: 'Alain-Claude Bilié By Nzé', photo: 'billie-bi.avif' },
  { id_candidat: 3, nom: 'Zenaba Gninga Chaning', photo: 'zenaba.webp' },
  { id_candidat: 1, nom: 'Brice Clotaire Oligui Nguema', photo: 'oligui.avif' },
  { id_candidat: 4, nom: 'Joseph Lapensée Essingone', photo: 'joseph.jpeg' },
  { id_candidat: 5, nom: 'Stéphane Germain Iloko', photo: 'stephanegermain.jpg' },
  { id_candidat: 6, nom: 'Axel Stophène Ibinga Ibinga', photo: 'axelstophene.jpg' },
  { id_candidat: 7, nom: 'Alain Simplice Boungouères', photo: 'alain.webp' },
  { id_candidat: 8, nom: 'Thierry Yvon Michel Ngoma', photo: 'thierryivon.jpg' },
];

// Données simulées pour les votes
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

// Correspondance entre les ID des candidats et les fichiers
const candidatPages = {
  1: 'Brice Clotaire Oligui Nguema : Président de la Transition',
  2: 'Alain-Claude Bilié By Nzé : Ancien Ministre',
  3: 'Zenaba Gninga Chaning : Militante pour la jeunesse',
  4: 'Joseph Lapensée Essingone : Homme politique gabonais',
  5: 'Stéphane Germain Iloko : Entrepreneur engagé',
  6: 'Axel Stophène Ibinga Ibinga : Médecin spécialiste',
  7: 'Alain Simplice Boungouères : Député sortant',
  8: 'Thierry Yvon Michel Ngoma : Acteur social',
};

const FicheCandidats = () => {
  const [votes, setVotes] = useState({});
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    // Calcul des votes totaux et des votes pour chaque candidat
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
      <h2>Résultats des Candidats pour les 1er et 2e Arrondissement de Port-Gentil</h2>
      <div className="fiche-candidats-container">
        {candidatsData.map((candidat) => {
          const nombreVotes = votes[candidat.id_candidat] || 0;
          const pourcentage = totalVotes ? ((nombreVotes / totalVotes) * 100).toFixed(2) : 0;

          return (
            <Link
              to={`/${candidatPages[candidat.id_candidat]}`} // Dynamically route to the correct page based on candidate ID
              key={candidat.id_candidat}
              style={{ textDecoration: 'none' }} // Suppress the underline on the link
            >
              <div className="candidat-card">
                <img src={`/${candidat.photo}`} alt={candidat.nom} />
                <h3>{candidat.nom}</h3>
                <p>{nombreVotes} votes total obtenus</p>
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
