import React from 'react';
import { votesDetails } from '../VotesDetails/votesDetails'; // adapte le chemin si besoin
import './AxelStophene.css';

const AxelStophene = () => {
  const candidat = votesDetails[6];

  const totalGlobal = Object.values(candidat.arrondissement).reduce(
    (acc, arr) => acc + arr.total,
    0
  );

  return (
    <div className="detail-candidat">
      <h2>{candidat.nom}</h2>
      <h4>{candidat.titre}</h4>
      <img src={`/${candidat.photo}`} alt={candidat.nom} style={{ width: '200px', borderRadius: '8px' }} />
      <p style={{ maxWidth: '600px' }}>{candidat.bio}</p>

      <h3>Total des votes : {totalGlobal}</h3>

      {Object.entries(candidat.arrondissement).map(([nomArrondissement, arrData]) => (
        <div key={nomArrondissement}>
          <h4>{nomArrondissement} — {arrData.total} votes ({((arrData.total / totalGlobal) * 100).toFixed(2)}%)</h4>

          {Object.entries(arrData.centres).map(([nomCentre, centreData]) => (
            <div key={nomCentre} style={{ marginLeft: '20px' }}>
              <strong>{nomCentre} — {centreData.total} votes ({((centreData.total / arrData.total) * 100).toFixed(2)}%)</strong>
              <ul>
                {Object.entries(centreData.bureaux).map(([nomBureau, votes]) => (
                  <li key={nomBureau}>
                    {nomBureau} : {votes} votes ({((votes / centreData.total) * 100).toFixed(2)}%)
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AxelStophene;
