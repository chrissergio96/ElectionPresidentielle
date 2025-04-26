import React, { useEffect, useRef,useState } from 'react';import './PageAccueilcopy.css';
import logoMinistere from '../Images/drapeau-removebg-preview (3).png'  ; // remplace avec ton chemin réel
import blason from '../Images/logoministereinterieur-removebg-preview.png';
import soundFile from './son.mp3'; // Importez votre fichier audio
import backgroundVideo from './video.mp4'; // Importez votre fichier audio




const PageAccueil = () => {
  const audioRef = useRef(null);
     const [volume, setVolume] = useState(0.08); // Volume par défaut à 50%
  

  useEffect(() => {
    // Démarrer la musique quand le composant est monté
    const timer = setTimeout(() => {
      audioRef.current.volume = volume; // Applique le volume
      if (audioRef.current) {
        audioRef.current.play()
          .catch(error => console.log("Auto-play prevented:", error));
      }
    }, 10); // Délai pour synchroniser avec l'animation
  
    return () => clearTimeout(timer);
  }, []);


  return (

    <div className='presidentielle'>
  <audio ref={audioRef} src={soundFile} />
  <div className='blanc'>

  <div className="header">
    <div  className="video-backgroundflou" ></div>
    <video 
      autoPlay 
      loop 
      muted 
      playsInline 
      className="video-background"
    >
      <source src={backgroundVideo} type="video/mp4" />
    </video>
    <img
      src={logoMinistere}
      alt="Logo Ministère de l'intérieur"
      className="logo-gauche logo-animation"
    />

<div className="text">

    <div className='mereelec1 text-fade-in'>
      <h1 className="titre1">
        <span className="elections1">
          ÉLECTION
          <img src="https://d24irw6hr5upwc.cloudfront.net/641-large_default/drapeau-gabon-5075-cm.jpg" alt="carte" className="logo-gabon" />
          <p>12 AVRIL</p>
        </span>
      </h1>

      <h1 className='titrepresi1'>
        <span className="presidentielle-text1">PRÉSIDENTIELLE <h4>2025</h4></span>
      </h1>
    </div>
    <div className='rectangle1 text-fade-in'>
    <h6 className='commission'>COMMISSION ELECTORALE LOCALE</h6>
    <h6 className='commission'>1er - 2ème ARRONDISSEMENT</h6>
  </div>

</div>

    <img
      src={blason}
      alt="Blason officiel"
      className="logo-droit logo-animation"
    />

  </div>

  
</div>
</div>

  );
};

export default PageAccueil;
