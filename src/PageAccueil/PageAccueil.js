import React from 'react';
import './PageAccueil.css';
import logoMinistere from '../Images/drapeau.jpg'; // remplace avec ton chemin réel
import blason from '../Images/logoministereinterieur.jpg';


const PageAccueil = () => {
  return (
    <div className='presidentielle'>
  <div className="header">
    <img
      src={logoMinistere}
      alt="Logo Ministère de l'intérieur"
      className="logo-gauche logo-animation"
    />

    <div className='mereelec text-fade-in'>
      <h1 className="titre">
        <span className="elections">
          ÉLECTION
          <img src="https://d24irw6hr5upwc.cloudfront.net/641-large_default/drapeau-gabon-5075-cm.jpg" alt="carte" className="logo-gabon" />
          <p>12 AVRIL</p>
        </span>
      </h1>

      <h1 className='titrepresi'>
        <span className="presidentielle-text">PRÉSIDENTIELLE <h4>2025</h4></span>
      </h1>
    </div>

    <img
      src={blason}
      alt="Blason officiel"
      className="logo-droit logo-animation"
    />
  </div>
  
  <div className='rectangle text-fade-in'>
    <h6>COMMISSION ELECTORALE LOCALE</h6>
    <h6>1er - 2ème ARRONDISSEMENT</h6>
  </div>
</div>

  );
};

export default PageAccueil;
