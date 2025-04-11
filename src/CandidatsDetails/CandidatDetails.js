import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { votesDetails } from '../VotesDetails/votesDetails';
import './CandidatDetails.css';

const CandidatDetails = () => {
  const { id } = useParams();
  const candidat = votesDetails[id];

  if (!candidat) {
    return <div>Candidat introuvable.</div>;
  }

  return (
    <div className="details-container">
      <Link to="/resultats" className="back-button">← Retour</Link>

      <div className="header">
        <img src={`/${candidat.photo}`} alt={candidat.nom} className="photo" />
        <div className="info">
          <h1>{candidat.nom}</h1>
          <h3>{candidat.titre}</h3>
          <p>{candidat.bio}</p>
        </div>
      </div>

      <div className="votes-section">
        <h2>Répartition des votes</h2>
        {Object.entries(candidat.arrondissement).map(([arrName, arrData]) => (
          <div key={arrName} className="arrondissement">
            <h3>{arrName} – Total : {arrData.total} votes</h3>
            <div className="centres">
              {Object.entries(arrData.centres).map(([centreName, centreData]) => (
                <div key={centreName} className="centre">
                  <h4>{centreName} – {centreData.total} votes</h4>
                  <ul>
                    {Object.entries(centreData.bureaux).map(([bureauName, nbVotes]) => (
                      <li key={bureauName}>
                        {bureauName} : {nbVotes} votes
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidatDetails;
