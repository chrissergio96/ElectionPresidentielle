import React from 'react';
import ElectionResults from '../ElectionResults/ElectionsResults.jsx'; // Import correct du composant
import InfosCandidats from '../InfoCandidats/InfosCandidats.jsx';

function ResultatsElection() {
  return (
    <div>
      <InfosCandidats />
      <ElectionResults /> ;
      
      
    </div>
  );
}

export default ResultatsElection;
