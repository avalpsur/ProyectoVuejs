<template>
  <div class="search-container container py-4">
    <SearchBar @results="handleResults" />
    <div class="filters mt-3">
      <label class="form-label">Duración mínima (segundos):</label>
      <input type="number" v-model.number="minDuration" @input="applyFilters" class="form-control" />
      <div class="form-check mt-2">
        <input class="form-check-input" type="checkbox" v-model="filterByTitle" @change="applyFilters" />
        <label class="form-check-label">Ordenar por título</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" v-model="filterByArtist" @change="applyFilters" />
        <label class="form-check-label">Ordenar por artista</label>
      </div>
    </div>
    <div class="row mt-4" v-if="filteredSongs.length > 0">
      <div class="col-md-3" v-for="song in filteredSongs" :key="song.id">
        <div class="card h-100 shadow-sm">
          <img :src="song.album.cover_medium" class="card-img-top" alt="Album Cover" />
          <div class="card-body">
            <h5 class="card-title">{{ song.title }}</h5>
            <h6 class="card-subtitle text-muted">{{ song.artist.name }}</h6>
            <p class="card-text">{{ song.album.title }}</p>
            <button class="btn btn-success w-100" @click="playSong(song)">Reproducir</button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-center text-light">No hay resultados para mostrar</p>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';
import { useUserStore } from '../stores/counter';
import SearchBar from '../components/SearchBar.vue';

const emit = defineEmits(["play-song"]);

const songs = ref([]);
const userStore = useUserStore();
const filterByTitle = ref(false);
const filterByArtist = ref(false);
const minDuration = ref(0);

const filteredSongs = computed(() => {
  let sortedSongs = [...songs.value];
  if (filterByTitle.value) {
    sortedSongs.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filterByArtist.value) {
    sortedSongs.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
  }
  return sortedSongs.filter(song => song.duration >= minDuration.value);
});

const handleResults = (data) => {
  songs.value = data;
};

const applyFilters = () => {};

// Emitir la canción seleccionada al componente padre (App.vue)
const playSong = (song) => {
  emit("play-song", song);
};
</script>


<style scoped>
.search-container {
  background: linear-gradient(135deg, #1db954, #191414);
  color: white;
  padding: 20px;
  border-radius: 10px;
}
.card {
  border-radius: 10px;
}
.card img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
