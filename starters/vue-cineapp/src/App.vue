<template>
  <div class="app">
    <Header />
    <main>
      <div class="movie-grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Header from './components/Header.vue';
import MovieCard from './components/MovieCard.vue';
import { mockMovies } from './mockData';
import './App.css';

const movies = ref(mockMovies);
</script>
