import React from 'react';
import './AlainSimplice.css';
import Alain from '../Images/alain.webp'

const AlainSimplice = () => {
  return (
    <div className="biography-container">
      <header className="biography-header">
      <img src={Alain} alt="alain" />
      <div className='alain'>
      <h1>Alain Simplice</h1>
      <h3>Responsable de projets éducatifs</h3>
      </div>
       
      </header>
      
      <section className="bio-section">
        <div className='bio'>
        <h2>Biographie</h2>
        <p>Alain Simplice est diplômé en gestion d'entreprise avec 10 ans d'expérience dans la gestion de projets éducatifs. Il a contribué à la mise en place de stratégies pour améliorer les performances dans plusieurs établissements scolaires.</p>

        </div>
      </section>

      <section className="results-section">
        <h2>Résultats par centre/bureau</h2>
        <ul>
          <li><h3>Centre A</h3><p>Taux de réussite : 75%</p></li>
          <li><h3>Centre B</h3><p>Taux de réussite : 82%</p></li>
        </ul>
      </section>

      <section className="contact-section">
        <button>Contactez Alain Simplice</button>
      </section>
    </div>
  );
};

export default AlainSimplice;
