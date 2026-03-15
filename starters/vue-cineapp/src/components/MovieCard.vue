<template>
  <div class="movie-card">
    <img :src="imageUrl" :alt="movie.title" />
    <h3>{{ movie.title }}</h3>
    <p>⭐ {{ movie.vote_average }}</p>
    <!-- TODO : Bouton de favoris ❤️ -->
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['movie']);

const imageUrl = computed(() => `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`);
</script>
