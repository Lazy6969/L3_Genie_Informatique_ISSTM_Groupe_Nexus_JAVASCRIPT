const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

async function fetchFromTMDB(endpoint) {
  if (!API_KEY || API_KEY === 'VOTRE_CLE_API_TMDB') {
    console.error("API_KEY manquante ou non configurée dans le fichier .env");
    throw new Error("Clé API TMDB non configurée.");
  }
  try {
    const separator = endpoint.includes('?') ? '&' : '?';
    const response = await fetch(`${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=fr-FR`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results || data; // Pour les listes (trending, search) ou un seul objet (details)
  } catch (error) {
    console.error("Error fetching from TMDB:", error);
    throw error;
  }
}

export const fetchTrendingMovies = async () => {
  return fetchFromTMDB('/trending/movie/week');
};

export const searchMovies = async (query) => {
  return fetchFromTMDB(`/search/movie?query=${encodeURIComponent(query)}`);
};

export const fetchMovieDetails = async (movieId) => {
  return fetchFromTMDB(`/movie/${movieId}`);
};

export { IMAGE_BASE_URL };