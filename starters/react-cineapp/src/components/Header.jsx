import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Nous allons créer ce fichier CSS

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-title">
        <h1>CineMaster</h1>
      </Link>
      <nav className="header-nav">
        <Link to="/favorites">Favoris</Link>
      </nav>
    </header>
  );
}

export default Header;