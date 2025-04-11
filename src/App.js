import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TableauBoard from './Pages/TableauBoard';
import ResultatsElection from './Pages/ResultatsElection';
import PageAccueil from './PageAccueil/PageAccueil copy';
import Candidats from './Pages/Candidats';
import BilanBureaux from './Pages/Bilanbureau';
import FicheCandidat from './Pages/FicheCandidat';
import Zenabacandidat from './Pages/Candidatures/Zenabacandidat';
import Oliguicandidat from './Pages/Candidatures/Oliguicandidat';
import Billiebinze from './Pages/Candidatures/Billiebinzecandidat';
import Alainsimplice from './Pages/Candidatures/Alainsimplice';
import Axelstophene from './Pages/Candidatures/Axelstophene';
import Josephlapensee from './Pages/Candidatures/Josephlapensee';
import Stephangermain from './Pages/Candidatures/Stephangermain';
import Thierryyvon from './Pages/Candidatures/Thierryyvon';
import Accueil from './Pages/Accueil';
import soundFile from './son.mp3';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const audioRef = useRef(null);
  const [volume] = useState(0.08); // Volume à 8%

  useEffect(() => {
    // Configuration audio
    if (audioRef.current) {
      audioRef.current.volume = volume;
      // Tentative de lecture automatique avec gestion des erreurs
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(_ => console.log("Lecture audio démarrée"))
          .catch(error => console.log("Erreur de lecture audio:", error));
      }
    }

    // Timer pour la page d'accueil (10 secondes)
    const timer = setTimeout(() => {
      setShowLanding(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
      // Arrêter la musique si nécessaire quand le composant est démonté
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [volume]); // Dépendance sur volume

  return (
    <div className="App">
      {/* Élément audio caché */}
      <audio 
        ref={audioRef} 
        src={soundFile} 
        loop // Pour boucler la musique
        style={{ display: 'none' }} // Cache l'élément audio
      />
      
      <Router>
        {showLanding ? (
         <PageAccueil onUserInteraction={() => audioRef.current.play()} />// Affiche la page d'accueil pendant 10 secondes
        ) : (
          <Routes>
            <Route path="/" element={<TableauBoard />} />
            <Route path="/bilan-bureau" element={<BilanBureaux />} />
            <Route path="/candidats" element={<Candidats/>} />
            <Route path="/fiche-candidats" element={<FicheCandidat />} />
            <Route path="/resultat-elections" element={<ResultatsElection />} />
            <Route path="/Zenaba Gninga Chaning : Militante pour la jeunesse" element={<Zenabacandidat />} />
            <Route path="/Brice Clotaire Oligui Nguema : Président de la Transition" element={<Oliguicandidat />} />
            <Route path="/Alain-Claude Bilié By Nzé : Ancien Ministre" element={<Billiebinze />} />
            <Route path="/Alain Simplice Boungouères : Député sortant" element={<Alainsimplice />} />
            <Route path="/Axel Stophène Ibinga Ibinga : Médecin spécialiste" element={<Axelstophene />} />
            <Route path="/Joseph Lapensée Essingone : Homme politique gabonais" element={<Josephlapensee />} />
            <Route path="/Stéphane Germain Iloko : Entrepreneur engagé" element={<Stephangermain />} />
            <Route path="/Thierry Yvon Michel Ngoma : Acteur social" element={<Thierryyvon />} />
            <Route path="/accueil" element={<Accueil />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;