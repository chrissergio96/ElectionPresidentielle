import React, { useEffect, useRef, useState } from 'react';
import './BilanBureaux.css';
import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaPercentage,
  FaUniversity,
  FaVoteYea,
  FaArchway,
  FaBoxTissue
} from 'react-icons/fa';
import soundFile from './son1.mp3';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const BilanBureaux = () => {
  const audioRef = useRef(null);
  const [animatedValues, setAnimatedValues] = useState({
    totalInscrits: 0,
    totalVotants: 0,
    totalNullVotes: 0,
    totalSuffragesExprimes: 0,
    totalAbstentions: 0,
    percentageVotes: 0,
    percentageAbstentions: 0,
    percentageNull: 0
  });

  const centres = {
    '1er Arrondissement': [
      { centre: 'Ecole publique Balise 2 - Ngadi', bureaux: 11, inscrits: 5245, votants: 2898, abstentions: 2347, nuls: 113 },
      { centre: 'Centre de formation Professionnel et de perfectionnement', bureaux: 8, inscrits: 3738, votants: 1919, abstentions: 1812, nuls: 107 },
      { centre: 'Lycee Joseph Ambouroue AVARO', bureaux: 8, inscrits: 3665, votants: 1890, abstentions: 1775, nuls: 69 },
      { centre: 'Ecole publique de la cite', bureaux: 5, inscrits: 2440, votants: 1224, abstentions: 1216, nuls: 54 },
    ],
    '2e Arrondissement': [
      { centre: 'Centre social', bureaux: 17, inscrits: 8459, votants: 4294, abstentions: 4165, nuls: 194 },
      { centre: 'Ecole publique Abbe YOYA', bureaux: 8, inscrits: 3506, votants: 1848, abstentions:1658 , nuls: 90 },

      { centre: 'Ecole publique AMBOUROUE AVARO', bureaux: 5, inscrits: 2131, votants:1139, abstentions: 992, nuls: 84 },
      { centre: 'Ecole Sainte Therese', bureaux: 4, inscrits: 1655, votants: 899, abstentions: 756, nuls: 12 },
      { centre: 'Ecole publique Ancienne Balise', bureaux: 3, inscrits: 1140, votants: 577, abstentions: 563, nuls: 70 },
      { centre: 'Ecoles du stade blanc 1-balise', bureaux: 2, inscrits: 772, votants: 296, abstentions: 476, nuls: 15 },
      { centre: 'Ecole du stade blanc 2 - Henri Clement', bureaux: 1, inscrits: 278, votants: 124, abstentions: 154, nuls: 8 },
      { centre: 'Ecole protestante', bureaux: 2, inscrits: 608, votants: 309, abstentions: 299, nuls: 15 },
    ],
  }; 

  const allCentres = Object.values(centres).flat();
  const totalInscrits = allCentres.reduce((sum, c) => sum + c.inscrits, 0);
  const totalVotants = allCentres.reduce((sum, c) => sum + c.votants, 0);
  const totalAbstentions = allCentres.reduce((sum, c) => sum + c.abstentions, 0);
  const totalNullVotes = allCentres.reduce((sum, c) => sum + c.nuls, 0);
  const totalSuffragesExprimes = totalVotants - totalNullVotes;
  const percentageVotes = ((totalVotants / totalInscrits) * 100).toFixed(2);
  const percentageAbstentions = ((totalAbstentions / totalInscrits) * 100).toFixed(2);
  const percentageNull = ((totalNullVotes / totalInscrits) * 100).toFixed(2);

  useEffect(() => {
    // Démarrer la musique
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .catch(error => console.log("Auto-play prevented:", error));
      }
    }, 10);

    // Animation des valeurs
    const duration = 4000; // 2 secondes
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / duration);

      setAnimatedValues({
        totalInscrits: Math.floor(progress * totalInscrits),
        totalVotants: Math.floor(progress * totalVotants),
        totalNullVotes: Math.floor(progress * totalNullVotes),
        totalSuffragesExprimes: Math.floor(progress * totalSuffragesExprimes),
        totalAbstentions: Math.floor(progress * totalAbstentions),
        percentageVotes: (progress * parseFloat(percentageVotes)).toFixed(2),
        percentageAbstentions: (progress * parseFloat(percentageAbstentions)).toFixed(2),
        percentageNull: (progress * parseFloat(percentageNull)).toFixed(2)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      clearTimeout(timer);
    };
  }, [percentageVotes, percentageAbstentions, percentageNull, totalAbstentions, totalInscrits, totalNullVotes, totalSuffragesExprimes, totalVotants]);

  return (
    <div className="bilan-bureaux">
      <audio ref={audioRef} src={soundFile}  />
      
      <h1> <FaBoxTissue/> Commission Electorale 1er - 2e Arrondissements de Port-Gentil</h1>

      <section className="global-summary card">
        <h2><FaUniversity /> Résultats Électoraux</h2>
        <div className="summary-grid">

        <div className="summary-item">
            <div className="total-box">
              <FaUsers size={24} />
              <strong>Inscrits :</strong>
              <span className="counter">{animatedValues.totalInscrits}</span>
            </div>
            <div className="total-box">
              <FaVoteYea size={24} color="blue" />
              <strong>Suffrages exprimés :</strong>
              <span className="counter">{animatedValues.totalSuffragesExprimes}</span>
            </div>
          </div>


          <div className="summary-item">
            <CircularProgressbar
              value={animatedValues.percentageVotes}
              text={`${animatedValues.percentageVotes}%`}
              styles={buildStyles({
                pathColor: '#4CAF50',
                textColor: '#4CAF50',
                trailColor: '#f0f0f0'
              })}
            />
            <div className="summary-text">
              <FaCheckCircle color="green" />
              <strong>Total votants :</strong> 
              <span className="counter">{animatedValues.totalVotants}</span>
            </div>
          </div>


          <div className="summary-item">
            <CircularProgressbar
              value={animatedValues.percentageNull}
              text={`${animatedValues.percentageNull}%`}
              styles={buildStyles({
                pathColor: '#F44336',
                textColor: '#F44336',
                trailColor: '#f0f0f0'
              })}
            />
            <div className="summary-text">
              <FaPercentage color="red" />
              <strong>Bulletins nuls :</strong> 
              <span className="counter">{animatedValues.totalNullVotes}</span>
            </div>
          </div>

          
          <div className="summary-item">
            <CircularProgressbar
              value={animatedValues.percentageAbstentions}
              text={`${animatedValues.percentageAbstentions}%`}
              styles={buildStyles({
                pathColor: '#FF9800',
                textColor: '#FF9800',
                trailColor: '#f0f0f0'
              })}
            />
            <div className="summary-text">
              <FaTimesCircle color="orange" />
              <strong>Abstentions :</strong> 
              <span className="counter">{animatedValues.totalAbstentions}</span>
            </div>
          </div>

        </div>
      </section>

      <section className="centres-details">
        <h2> < FaArchway/> Détails par Arrondissement</h2>
        {Object.entries(centres).map(([arrondissement, centreList], i) => {
          const totalArrInscrits = centreList.reduce((sum, c) => sum + c.inscrits, 0);
          const totalArrVotants = centreList.reduce((sum, c) => sum + c.votants, 0);
          const totalArrAbstentions = centreList.reduce((sum, c) => sum + c.abstentions, 0);
          const totalArrNuls = centreList.reduce((sum, c) => sum + c.nuls, 0);
          const totalArrExprimes = totalArrVotants - totalArrNuls;

          return (
            <div key={i} className="arrondissement card">
              <h3>{arrondissement}</h3>
              <p className="arrondissement-summary">
              <span className="counter">{totalArrInscrits}</span> inscrits —   
                <span className="counter">{totalArrVotants}</span> votants — 
                <span className="counter">{totalArrNuls}</span> Bulletins Nuls ou Blanc  —  
                 <span className="counter">{totalArrExprimes}</span> suffrages exprimés  — 
                 <span className="counter">{totalArrAbstentions}</span> abstentions

              </p>
              <table className="centre-table">
                <thead>
                  <tr>
                    <th>Centre</th>
                    <th>Bureaux</th>
                    <th>Inscrits</th>
                    <th>Votants</th>
                    <th>Bulletins Nuls</th>
                    <th>Suffrages exprimés</th>
                    <th>% Participation</th>
                    <th>Abstentions</th>
                  </tr>
                </thead>
                <tbody>
                  {centreList.map((centre, idx) => {
                    const percentageParticipation = ((centre.votants / centre.inscrits) * 100).toFixed(1);
                    const suffragesExprimes = centre.votants - centre.nuls;
                    return (
                      <tr key={idx} className="fade-in-row">
                        <td>{centre.centre}</td>
                        <td><span className="counter">{centre.bureaux}</span></td>
                        <td><span className="counter">{centre.inscrits}</span></td>
                        <td><span className="counter">{centre.votants}</span></td>
                        <td><span className="counter">{centre.nuls}</span></td>
                        <td><span className="counter">{suffragesExprimes}</span></td>
                        <td><span className="counter">{percentageParticipation}</span>%</td>
                        <td><span className="counter">{centre.abstentions}</span></td>
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