import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TableauBoard from './Pages/TableauBoard'; // La page principale avec la barre latérale
import ResultatsElection from './Pages/ResultatsElection'; // Composant à afficher
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

function App() {
  return (
    <Router>
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

      </Routes>
    </Router>
  );
}

export default App;
