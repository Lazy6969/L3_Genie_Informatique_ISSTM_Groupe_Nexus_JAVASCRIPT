import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../api';
import './MovieCard.css'; // Nous allons créer ce fichier CSS

function MovieCard({ movie, onToggleFavorite, isFavorite }) {
  const placeholder = `https://via.placeholder.com/500x750?text=${encodeURIComponent(movie.title)}`;
  
  const posterPath = movie.poster_path 
    ? `${IMAGE_BASE_URL}${movie.poster_path.startsWith('/') ? movie.poster_path.substring(1) : movie.poster_path}` 
    : placeholder;

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Empêche la navigation vers la page de détail
    e.stopPropagation(); // Empêche l'événement de se propager au Link
    onToggleFavorite(movie);
  };

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img 
          src={posterPath} 
          alt={movie.title} 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = placeholder;
          }}
        />
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <div className="movie-actions">
            <span className="movie-rating">⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
            <button
              className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;