import React from 'react';
import { votesDetails } from '../VotesDetails/votesDetails'; // adapte le chemin si besoin
import './JosephLapensee.css';

const JosephLapensee = () => {
  const candidat = votesDetails[4];
   
     const totalGlobal = Object.values(candidat.arrondissement).reduce(
       (acc, arr) => acc + arr.total,
       0
     );
   
     return (
       <div className="meredetail">
     <div className="detail-candidat">
   
       <div className="detail-image">
         <img src={`/${candidat.photo}`} alt={candidat.nom} />
       </div>
   
       <div className="detail-info">
         <h2>{candidat.nom}</h2>
         <h4>{candidat.titre}</h4>
         <p> {candidat.bio}</p>
         <h3>Total des votes : {totalGlobal}</h3>
   
         <div className="arrondissement-section">
           {Object.entries(candidat.arrondissement).map(([nomArrondissement, arrData]) => (
             <div key={nomArrondissement}>
               <h4>{nomArrondissement} — {arrData.total} votes ({((arrData.total / totalGlobal) * 100).toFixed(2)}%)</h4>
   
               {Object.entries(arrData.centres).map(([nomCentre, centreData]) => (
                 <div key={nomCentre}>
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
       </div>
   
     </div>
   </div>
   
     );
   };

export default JosephLapensee;
