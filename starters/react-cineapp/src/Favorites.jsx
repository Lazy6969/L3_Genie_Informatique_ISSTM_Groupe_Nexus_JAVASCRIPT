import React from 'react';
import useLocalStorage from './useLocalStorage';
import MovieGrid from './components/MovieGrid'; // Correction du chemin relatif
import './Favorites.css'; // Nous allons créer ce fichier CSS
import { useNavigate } from 'react-router-dom';

function Favorites() {
  const [favorites, setFavorites] = useLocalStorage('cineMasterFavorites', []);

  const toggleFavorite = (movie) => {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(fav => fav.id === movie.id);
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== movie.id);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  const navigate = useNavigate(); // Initialiser useNavigate

  const isMovieFavorite = (movieId) => favorites.some(fav => fav.id === movieId);

  return (
    <div className="favorites-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Retour
      </button>
      <h2>Mes Films Favoris</h2>
      {favorites.length === 0 ? <p className="no-favorites">Vous n'avez pas encore de films favoris.</p> : (
        <MovieGrid movies={favorites} onToggleFavorite={toggleFavorite} isMovieFavorite={isMovieFavorite} />
      )}
    </div>
  );
}

export default Favorites;