import React from 'react';
import Infoscandidats from '../InfoCandidats/Infoscand.jsx';
import FicheCandidats from '../FichesCandidat/FicheCandidats.js';
import BilanBureaux from '../BilanBureaux/BilanBureaux.jsx';


function ResultatsElection() {
  return (
    <div>
      <FicheCandidats />
      <Infoscandidats/>
      <BilanBureaux/>

    </div>
  );
}

export default ResultatsElection;
