import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // revient à la page précédente
  };

  return (
    <button onClick={handleBack} style={styles.button}>
      ⬅ Retour
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
  }
};

export default BackButton;
