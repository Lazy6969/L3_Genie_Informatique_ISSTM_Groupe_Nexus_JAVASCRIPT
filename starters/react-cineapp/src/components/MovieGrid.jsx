import React from 'react';
import MovieCard from './MovieCard';
import './MovieGrid.css'; // Nous allons créer ce fichier CSS

function MovieGrid({ movies, onToggleFavorite, isMovieFavorite }) {
  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isMovieFavorite(movie.id)}
        />
      ))}
    </div>
  );
}

export default MovieGrid;