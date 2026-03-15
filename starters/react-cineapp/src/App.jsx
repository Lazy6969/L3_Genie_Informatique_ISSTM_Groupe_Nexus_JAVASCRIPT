import { useState } from 'react'
import Header from './components/Header'
import MovieCard from './components/MovieCard'
import { mockMovies } from './mockData'
import './App.css'

function App() {
  const [movies] = useState(mockMovies);

  return (
    <div className="app">
      <Header />
      <main>
        <div className="movie-grid">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
