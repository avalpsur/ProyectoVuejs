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
        <div class="card song-card h-100 shadow-lg">
          <div class="card-img-container">
            <img :src="song.album.cover_medium" class="card-img-top" alt="Album Cover" />
          </div>
          <div class="card-body text-center">
            <h5 class="card-title fw-bold text-dark">{{ song.title }}</h5>
            <h6 class="card-subtitle text-muted">{{ song.artist.name }}</h6>
            <p class="card-text text-muted">{{ song.album.title }}</p>

            <!-- Botón para reproducir la canción -->
            <button class="btn btn-success w-100" @click="playSong(song)">🎵 Reproducir</button>

            <!-- Botón para agregar a playlist -->
            <button class="btn btn-primary w-100 mt-2" @click="addToPlaylist(song)">➕ Agregar a Playlist</button>

            <!-- Botones para ver información -->
            <router-link
              :to="`/info/artist/${song.artist.id}`"
              class="btn btn-outline-dark w-100 mt-2"
            >👤 Ver Artista</router-link>
            <router-link
              :to="`/info/album/${song.album.id}`"
              class="btn btn-outline-dark w-100 mt-2"
            >💿 Ver Álbum</router-link>
            <router-link
              :to="`/info/song/${song.id}`"
              class="btn btn-outline-dark w-100 mt-2"
            >🎵 Ver Canción</router-link>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-center text-light">No hay resultados para mostrar</p>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import { usePlaylistStore } from '@/stores/playlistStore';

const emit = defineEmits(["play-song"]);
const songs = ref([]);
const playlistStore = usePlaylistStore(); // Conectar con Pinia

const filteredSongs = computed(() => {
  return songs.value;
});

const handleResults = (data) => {
  songs.value = data;
};

const playSong = (song) => {
  emit("play-song", song);
};

// Agregar la canción a la playlist
const addToPlaylist = (song) => {
  playlistStore.addSongToPlaylist(song);
};
</script>

<style scoped>
.song-card {
  background: #fff;
  border-radius: 15px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.song-card:hover {
  transform: scale(1.05);
}

.card-img-container {
  height: 200px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-img-top {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.btn-primary {
  background-color: #007bff;
  border: none;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-outline-dark {
  color: #343a40;
  border-color: #343a40;
}

.btn-outline-dark:hover {
  background-color: #343a40;
  color: #fff;
}
</style>

