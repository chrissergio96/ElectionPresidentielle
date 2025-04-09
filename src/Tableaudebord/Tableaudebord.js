import React, { useState } from 'react';
import FicheCandidats from '../FichesCandidat/FicheCandidats';
import Infoscandidats from '../InfoCandidats/Infoscand';
import BilanBureaux from '../BilanBureaux/BilanBureaux';
import './Tableaudebord.css';
import CartePortGentil from '../CartePortGentil/CartePortGentil'; // Composant par défaut

const Tableaudebord = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedCandidat, setSelectedCandidat] = useState(null);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
    setSelectedCandidat(null);
  };

  const handleCandidatClick = (id_candidat) => {
    setSelectedCandidat(id_candidat);
    setActiveComponent('ficheCandidats');
  };

  return (
    <div className="container">
      {/* Barre latérale */}
      <div className="sidebar">
        <h2>Tableau de bord</h2>
        <ul>
          <li><button onClick={() => handleButtonClick('ficheCandidats')}>Fiche Candidats</button></li>
          <li><button onClick={() => handleButtonClick('infoCandidats')}>Infos Candidats</button></li>
          <li><button onClick={() => handleButtonClick('bilanBureaux')}>Bilan Bureaux</button></li>
        </ul>
      </div>

      {/* Contenu principal */}
      <div className="content">
        {!activeComponent && <CartePortGentil />} {/* Affiche la carte par défaut */}
        {activeComponent === 'ficheCandidats' && (
          <FicheCandidats
            selectedCandidat={selectedCandidat}
            handleCandidatClick={handleCandidatClick}
          />
        )}
        {activeComponent === 'infoCandidats' && <Infoscandidats />}
        {activeComponent === 'bilanBureaux' && <BilanBureaux />}
      </div>
    </div>
  );
};

export default Tableaudebord;
