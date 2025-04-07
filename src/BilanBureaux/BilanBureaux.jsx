import React from 'react';
import './BilanBureaux.css';

const BilanBureaux = () => {
  const centres = {
    '1er Arrondissement': [
      { centre: 'Ecole publique Balise 2 - Ngadi', bureaux: 11, inscrits: 6000, votants: 5100, abstentions: 800, nuls: 100 },
      { centre: 'Lycee Joseph Ambouroue AVARO', bureaux: 8, inscrits: 2000, votants: 1500, abstentions: 400, nuls: 100 },
      { centre: 'Centre de formation Professionnel et de perfectionnement', bureaux: 8, inscrits: 1800, votants: 1600, abstentions: 150, nuls: 50 },
      { centre: 'Ecole publique de la cite', bureaux: 5, inscrits: 1200, votants: 1000, abstentions: 150, nuls: 50 },
    ],
    '2e Arrondissement': [
      { centre: 'Centre social', bureaux: 17, inscrits: 4000, votants: 3450, abstentions: 450, nuls: 100 },
      { centre: 'Ecole publique Abbe YOYA', bureaux: 8, inscrits: 2000, votants: 1700, abstentions: 250, nuls: 50 },
      { centre: 'Ecole publique AMBOUROUE AVARO', bureaux: 5, inscrits: 1400, votants: 1200, abstentions: 150, nuls: 50 },
      { centre: 'Ecole Sainte Therese', bureaux: 4, inscrits: 1000, votants: 850, abstentions: 100, nuls: 50 },
      { centre: 'Ecole publique Ancienne Balise', bureaux: 3, inscrits: 800, votants: 700, abstentions: 80, nuls: 20 },
      { centre: 'Ecole protestante', bureaux: 2, inscrits: 600, votants: 520, abstentions: 60, nuls: 20 },
      { centre: 'Ecole publique ancienne balise', bureaux: 3, inscrits: 700, votants: 580, abstentions: 100, nuls: 20 },
      { centre: 'Ecoles du stade blanc 1-balise', bureaux: 2, inscrits: 500, votants: 420, abstentions: 60, nuls: 20 },
      { centre: 'Ecole du stade blanc 2 - Henri Clement', bureaux: 1, inscrits: 400, votants: 350, abstentions: 40, nuls: 10 },
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
      <h1>🗳️ Bilan des 1er et 2eme Arrondissement de Port-Gentil</h1>

      {/* Résumé global */}
      <section className="global-summary">
        <h2>📊 Résumé général</h2>
        <ul>
          <li><strong>Total inscrits :</strong> {totalInscrits}</li>
          <li><strong>Total votants :</strong> {totalVotants} ({percentageVotes}%)</li>
          <li><strong>Abstentions :</strong> {totalAbstentions} ({percentageAbstentions}%)</li>
          <li><strong>Bulletins nuls :</strong> {totalNullVotes} ({percentageNull}%)</li>
        </ul>
      </section>

      {/* Résultats par arrondissement */}
      <section className="centres-details">
        <h2>🗺️ Détails par Arrondissement</h2>
        {Object.entries(centres).map(([arrondissement, centreList], i) => {
          const totalArrInscrits = centreList.reduce((sum, c) => sum + c.inscrits, 0);
          const totalArrVotants = centreList.reduce((sum, c) => sum + c.votants, 0);
          const totalArrAbstentions = centreList.reduce((sum, c) => sum + c.abstentions, 0);
          const totalArrNuls = centreList.reduce((sum, c) => sum + c.nuls, 0);

          return (
            <div key={i} className="arrondissement">
              <h3>
                {arrondissement} / {totalArrVotants} votants sur {totalArrInscrits} inscrits
                — {totalArrAbstentions} abstentions — {totalArrNuls} nuls
              </h3>
              <table className="centre-table">
                <thead>
                  <tr>
                    <th>Centre</th>
                    <th>Bureaux</th>
                    <th>Inscrits</th>
                    <th>Votants</th>
                    <th>Abstentions</th>
                    <th>Nuls</th>
                  </tr>
                </thead>
                <tbody>
                  {centreList.map((centre, idx) => (
                    <tr key={idx}>
                      <td>{centre.centre}</td>
                      <td>{centre.bureaux}</td>
                      <td>{centre.inscrits}</td>
                      <td>{centre.votants}</td>
                      <td>{centre.abstentions}</td>
                      <td>{centre.nuls}</td>
                    </tr>
                  ))}
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
