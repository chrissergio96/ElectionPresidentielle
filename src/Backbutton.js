import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // revient à la page précédente
  };

  return (
    <div style={styles.container}>
      <button onClick={handleBack} style={styles.button}>
        ⬅ Retour
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70px', // prend toute la hauteur de la vue pour le centrage vertical
  },
  button: {
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '10px 50px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
  }
};

export default BackButton;
