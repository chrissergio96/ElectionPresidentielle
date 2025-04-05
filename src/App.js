import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResultatsElection from './Pages/ResultatsElection'; // Import du bon composant

function App() {
  return (
    <Router>

      <div className="App">
        
        <ResultatsElection/>

        {/* Définition des routes */}
        <Routes>
          <Route path="/resultats" element={<ResultatsElection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
