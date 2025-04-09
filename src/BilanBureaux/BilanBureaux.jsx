import React from 'react';
import './BilanBureaux.css';
import { FaUsers, FaCheckCircle, FaTimesCircle, FaPercentage, FaUniversity } from 'react-icons/fa';

const BilanBureaux = () => {
  const centres = {
    '1er Arrondissement': [
      { centre: 'Ecole publique Balise 2 - Ngadi', bureaux: 11, inscrits: 5245, votants: 0, abstentions: 0, nuls: 0 },
      { centre: 'Centre de formation Professionnel et de perfectionnement', bureaux: 8, inscrits: 3738, votants: 0, abstentions: 0, nuls: 0 },
      { centre: 'Lycee Joseph Ambouroue AVARO', bureaux: 8, inscrits: 3665, votants: 0, abstentions: 0, nuls: 0 },
      { centre: 'Ecole publique de la cite', bureaux: 5, inscrits: 2440, votants: 0, abstentions: 0, nuls: 0 },
    ],
    '2e Arrondissement': [
      { centre: 'Centre social', bureaux: 17, inscrits: 8459, votants: 0, abstentions: 0, nuls: 0 },
      { centre: 'Ecole publique Abbe YOYA', bureaux: 8, inscrits: 3506, votants: 0, abstentions: 0, nuls: 0 },
      { centre: 'Ecole publique AMBOUROUE AVARO', bureaux: 5, inscrits:2131, votants: 0, abstentions: 0, nuls: 0 },
      { centre: 'Ecole Sainte Therese', bureaux: 4, inscrits: 1655,  votants: 0, abstentions: 0, nuls: 0 },
      { centre: 'Ecole publique Ancienne Balise', bureaux: 3, inscrits: 1140, votants: 0, abstentions: 0, nuls: 0 },
      { centre: 'Ecoles du stade blanc 1-balise', bureaux: 2, inscrits: 772, votants: 0, abstentions: 0, nuls: 0 },
      { centre: 'Ecole du stade blanc 2 - Henri Clement', bureaux: 1, inscrits: 278,  votants: 0, abstentions: 0, nuls: 0 },
      { centre: 'Ecole protestante', bureaux: 2, inscrits: 608, votants: 0, abstentions: 0, nuls: 0 },

    ],
  };

  const allCentres = Object.values(centres).flat();
  const totalInscrits = allCentres.reduce((sum, c) => sum + c.inscrits, 0);
  const totalVotants = allCentres.reduce((sum, c) => sum + c.votants, 0);
  const totalAbstentions = allCentres.reduce((sum, c) => sum + c.abstentions, 0);
  const totalNullVotes = allCentres.reduce((sum, c) => sum + c.nuls, 0);

  const percentageVotes = ((totalVotants / totalInscrits) * 100).toFixed(2);
  const percentageAbstentions = ((totalAbstentions / totalInscrits) * 100).toFixed(2);
  const percentageNull = ((totalNullVotes / totalInscrits) * 100).toFixed(2);

  return (
    <div className="bilan-bureaux">
      <h1>🗳️ Bilan des 1er et 2e Arrondissements de Port-Gentil</h1>

      <section className="global-summary card">
        <h2><FaUniversity /> Résumé général</h2>
        <ul>
          <li><FaUsers /> <strong>Total inscrits :</strong> {totalInscrits}</li>
          <li><FaCheckCircle color="green" /> <strong>Total votants :</strong> {totalVotants} ({percentageVotes}%)</li>
          <li><FaTimesCircle color="orange" /> <strong>Abstentions :</strong> {totalAbstentions} ({percentageAbstentions}%)</li>
          <li><FaPercentage color="red" /> <strong>Bulletins nuls :</strong> {totalNullVotes} ({percentageNull}%)</li>
        </ul>
      </section>

      <section className="centres-details">
        <h2>📌 Détails par Arrondissement</h2>
        {Object.entries(centres).map(([arrondissement, centreList], i) => {
          const totalArrInscrits = centreList.reduce((sum, c) => sum + c.inscrits, 0);
          const totalArrVotants = centreList.reduce((sum, c) => sum + c.votants, 0);
          const totalArrAbstentions = centreList.reduce((sum, c) => sum + c.abstentions, 0);
          const totalArrNuls = centreList.reduce((sum, c) => sum + c.nuls, 0);

          return (
            <div key={i} className="arrondissement card">
              <h3>{arrondissement}</h3>
              <p>{totalArrVotants} votants / {totalArrInscrits} inscrits — {totalArrAbstentions} abstentions — {totalArrNuls} nuls</p>
              <table className="centre-table">
                <thead>
                  <tr>
                    <th>Centre</th>
                    <th>Bureaux</th>
                    <th>Inscrits</th>
                    <th>Votants</th>
                    <th>Votes / Bureau</th>
                    <th>% Participation</th>
                    <th>Abstentions</th>
                    <th>Nuls</th>
                  </tr>
                </thead>
                <tbody>
                  {centreList.map((centre, idx) => {
                    const votesPerBureau = (centre.votants / centre.bureaux).toFixed(1);
                    const percentageParticipation = ((centre.votants / centre.inscrits) * 100).toFixed(1);
                    return (
                      <tr key={idx}>
                        <td>{centre.centre}</td>
                        <td>{centre.bureaux}</td>
                        <td>{centre.inscrits}</td>
                        <td>{centre.votants}</td>
                        <td>{votesPerBureau}</td>
                        <td>{percentageParticipation}%</td>
                        <td>{centre.abstentions}</td>
                        <td>{centre.nuls}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default BilanBureaux;
