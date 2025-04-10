// src/components/SplashScreen.js
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './SplashScreen.css';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/accueil'); // redirige vers la page d'accueil
    }, 5000); // Durée de 5 secondes
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="splash-container">
      <motion.img
        src="/images/port-gentil-vue-haut.jpg" // vue de la ville
        alt="Vue de Port-Gentil"
        initial={{ scale: 1 }}
        animate={{ scale: 2 }}
        transition={{ duration: 4 }}
        className="splash-image"
      />
      <motion.div
        className="zoom-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <h1>1er & 2e Arrondissement</h1>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
