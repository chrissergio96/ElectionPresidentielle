import React, { useEffect, useRef } from 'react';import './PageAccueil.css';
import logoMinistere from '../Images/drapeau.jpg'; // remplace avec ton chemin réel
import blason from '../Images/logoministereinterieur.jpg';
import soundFile from './son.mp3'; // Importez votre fichier audio
import backgroundVideo from './video.mp4'; // Importez votre fichier audio




const PageAccueil = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    // Démarrer la musique quand le composant est monté
    const timer = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play()
          .catch(error => console.log("Auto-play prevented:", error));
      }
    }, 10); // Délai pour synchroniser avec l'animation
  
    return () => clearTimeout(timer);
  }, []);


  return (
    <div className='presidentielle'>
  
<video 
  autoPlay 
  loop 
  muted 
  playsInline 
  className="video-background"
>
  <source src={backgroundVideo} type="video/mp4" />
</video>

<audio 
        ref={audioRef} 
        src={soundFile} 
      />

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