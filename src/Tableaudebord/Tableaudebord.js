import React, { useState } from 'react';
import FicheCandidats from '../FichesCandidat/FicheCandidats';
import Infoscandidats from '../InfoCandidats/Infoscand';
import BilanBureaux from '../BilanBureaux/BilanBureaux';
import './Tableaudebord.css';
import Accueil from '../PageAccueil/PageAccueil';
import CartePortGentil from '../CartePortGentil/CartePortGentil';
import PageAccueil from '../PageAccueil/PageAccueil';
import Panthere from './téléchargement.png'; // Noms sans accents
import Panthere1 from './téléchargement1.png';
import Panthere2 from './téléchargement2.png';

const Tableaudebord = () => {
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedCandidat, setSelectedCandidat] = useState(null);
  const [currentImage, setCurrentImage] = useState(Panthere); // État pour l'image

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
          <li><button onClick={() => handleButtonClick('accueil')}>Accueil</button></li>
          <li><button onClick={() => handleButtonClick('carte')}>Vue Carte</button></li>
          <li><button onClick={() => handleButtonClick('ficheCandidats')}>Fiche Candidats</button></li>
          <li><button onClick={() => handleButtonClick('infoCandidats')}>Graphique</button></li>
          <li><button onClick={() => handleButtonClick('bilanBureaux')}>Bilan Bureaux</button></li>
        </ul>
        <img 
          src={currentImage} 
          alt="Logo" 
          className="sidebar-logo"
          onMouseEnter={() => setCurrentImage(Panthere2)}
          onMouseLeave={() => setCurrentImage(Panthere1)}
          onClick={() => setCurrentImage(Panthere)}
        />
      </div>

      {/* Contenu principal */}
      <div className="content">
        {!activeComponent && <Accueil />}
        {activeComponent === 'ficheCandidats' && (
          <FicheCandidats
            selectedCandidat={selectedCandidat}
            handleCandidatClick={handleCandidatClick}
          />
        )}
        {activeComponent === 'infoCandidats' && <Infoscandidats />}
        {activeComponent === 'carte' && <CartePortGentil />}
        {activeComponent === 'accueil' && <PageAccueil />}
        {activeComponent === 'bilanBureaux' && <BilanBureaux />}
      </div>
    </div>
  );
};

export default Tableaudebord;