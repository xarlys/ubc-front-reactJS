import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';

//import logoimg from '../images/logo.svg';

function Landing() {
  return (
    <div id="page-landing">
    <div className="content-wrapper">
      <img alt="Ubicua Cloud - Aqui vai a logo" /> { /* src={logoimg} */}
      <main>
        
        <h1>Encontre caminhoneiros e cargas disponíveis</h1>
        <p>em toda região em poucos minutos.</p>

      </main>

      <div className="location">
        <strong>Ubicua Cloud</strong>
        <span>São Paulo</span>
      </div>
      
      <Link to="/app" className="enter-app">
        <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
      </Link>
    </div>
  </div>
  );
}

export default Landing;