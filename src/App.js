import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResultatsElection from './Pages/ResultatsElection'; // Import du bon composant

function App() {
  return (
    <Router>

      <div className="App">
        
        <ResultatsElection/>

       
      </div>
    </Router>
  );
}

export default App;
