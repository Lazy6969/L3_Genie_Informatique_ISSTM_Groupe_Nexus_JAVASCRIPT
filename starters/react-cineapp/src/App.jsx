import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import { fetchTrendingMovies, searchMovies } from './api';
import { mockMovies } from './mockData';
import useLocalStorage from './useLocalStorage';
import MovieDetail from './MovieDetail';
import Favorites from './Favorites';
import './App.css'

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('cineMasterFavorites', []);

  // Fetch trending movies on initial load or when search term is cleared
  useEffect(() => {
    const getTrending = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (err) {
        console.warn('API non disponible, chargement des données de test (mockData).');
        // Utilisation des données de secours si l'API échoue ou si la clé est absente
        setMovies(mockMovies);
        setError(null); // On annule l'erreur pour afficher le mock
      } finally {
        setLoading(false);
      }
    };

    if (!searchTerm) {
      getTrending();
    }
  }, [searchTerm]); // Re-fetch trending if searchTerm becomes empty

  // Handle search
  const handleSearch = async (query) => {
    setSearchTerm(query);
    if (!query.trim()) {
      setMovies([]); // Reset grid before re-fetching trending
      return;
    }

    setLoading(true);
    setError(null);
    setMovies([]); // On vide la grille pour donner un feedback visuel de chargement
    try {
      const data = await searchMovies(query);
      setMovies(data);
    } catch (err) {
      console.warn('Recherche API échouée, filtrage local des données de test.');
      // Simulation d'une recherche locale dans les mocks pour que l'UI reste interactive
      const filteredMocks = mockMovies.filter(movie => 
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setMovies(filteredMocks);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

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

  const isMovieFavorite = (movieId) => {
    return favorites.some(fav => fav.id === movieId);
  };

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={
          <main>
            <SearchBar onSearch={handleSearch} />
            {loading && <p className="loading">Chargement des films...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && movies.length === 0 && searchTerm && (
              <p className="no-results">Aucun film trouvé pour "{searchTerm}".</p>
            )}
            {!loading && !error && movies.length === 0 && !searchTerm && (
              <p className="no-results">Aucun film tendance disponible.</p>
            )}
            <MovieGrid movies={movies} onToggleFavorite={toggleFavorite} isMovieFavorite={isMovieFavorite} />
          </main>
        } />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  )
}

export default App
