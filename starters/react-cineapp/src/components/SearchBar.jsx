import React, { useState } from 'react';
import './SearchBar.css'; // Nous allons créer ce fichier CSS

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Rechercher un film..."
        value={query}
        onChange={handleChange}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}

export default SearchBar;