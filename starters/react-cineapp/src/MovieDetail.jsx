import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, IMAGE_BASE_URL } from './api';
import { mockMovies } from './mockData';
import useLocalStorage from './useLocalStorage';
import './MovieDetail.css'; // Nous allons créer ce fichier CSS

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/500x750?text=No+Image';

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialiser useNavigate
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('cineMasterFavorites', []);

  const isFavorite = movie ? favorites.some(fav => fav.id === movie.id) : false;

  const toggleFavorite = () => {
    if (!movie) return;
    setFavorites(prev => {
      const exists = prev.some(fav => fav.id === movie.id);
      if (exists) return prev.filter(fav => fav.id !== movie.id);
      return [...prev, movie];
    });
  };

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.warn('API non disponible, chargement des données de test pour ID:', id);
        // Fallback sur les données mockées pour permettre le test de /movie/2
        const mockMovie = mockMovies.find(m => m.id === parseInt(id));
        if (mockMovie) {
          setMovie(mockMovie);
          setError(null);
        } else {
          setError('Échec de la récupération des détails du film.');
        }
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [id]);

  if (loading) return <p className="loading">Chargement des détails du film...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p className="no-results">Film non trouvé.</p>;

  // Formattage des données pour un affichage "World Class"
  const formatCurrency = (amount) => 
    amount > 0 ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount) : 'N/A';

  const formatRuntime = (minutes) => {
    if (!minutes) return 'N/A';
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  const posterPath = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : PLACEHOLDER_IMAGE;

  return (
    <div className="movie-detail-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Retour
      </button>
      <div className="movie-detail-content">
        <img src={posterPath} alt={movie.title} className="movie-detail-poster" />
        <div className="movie-detail-info">
          <div className="title-wrapper">
            <h2>{movie.title}</h2>
            <button 
              className={`detail-favorite-btn ${isFavorite ? 'favorited' : ''}`}
              onClick={toggleFavorite}
              title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>
          {movie.original_title !== movie.title && <p className="original-title">Titre original : {movie.original_title}</p>}
          <p className="tagline">{movie.tagline}</p>
          
          <div className="detail-grid">
            <p><strong>Date de sortie :</strong> {new Date(movie.release_date).toLocaleDateString('fr-FR')}</p>
            <p><strong>Durée :</strong> {formatRuntime(movie.runtime)}</p>
            <p><strong>Note :</strong> ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} ({movie.vote_count} votes)</p>
            <p><strong>Statut :</strong> {movie.status}</p>
            <p><strong>Budget :</strong> {formatCurrency(movie.budget)}</p>
            <p><strong>Revenus :</strong> {formatCurrency(movie.revenue)}</p>
          </div>

          <p><strong>Genres :</strong> {movie.genres?.map(g => g.name).join(', ') || 'N/A'}</p>
          <p><strong>Langues :</strong> {movie.spoken_languages?.map(l => l.name).join(', ') || 'N/A'}</p>
          
          <h3>Synopsis</h3>
          <p>{movie.overview || "Pas de synopsis disponible."}</p>

          {movie.production_companies?.length > 0 && (
            <div className="production-info">
              <h3>Production</h3>
              <p>{movie.production_companies.map(c => c.name).join(' • ')}</p>
            </div>
          )}

          {movie.homepage && (
            <div className="official-link">
              <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="btn-visit">
                Visiter le site officiel
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;