<template>
  <div>
    <SearchBar @results="handleResults" />

    <label>
      Duración mínima (segundos):
      <input type="number" v-model.number="minDuration" @input="applyFilters" />
    </label>
    <label>
      <input type="checkbox" v-model="filterByTitle" @change="applyFilters" /> Ordenar por título
    </label>
    <label>
      <input type="checkbox" v-model="filterByArtist" @change="applyFilters" /> Ordenar por artista
    </label>

    <div class="row no-gutters" v-if="filteredSongs.length > 0">
      <div class="col-md-3 p-0" v-for="song in filteredSongs" :key="song.id">
        <div class="card-container mt-2">
          <div class="card card-fixed-size custom-card">
            <div class="img-container">
              <img :src="song.album.cover_medium" class="card-img-top" alt="Album Cover" />
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ song.title }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">{{ song.artist.name }}</h6>
              <p class="card-text">{{ song.album.title }}</p>
              <button class="btn btn-primary" @click="addToPlaylist(song)">Agregar a Playlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p v-else>No hay resultados para mostrar</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/counter"; // Importa la store de Pinia
import SearchBar from "../components/SearchBar.vue"; // Importa el componente hijo

const songs = ref([]); // Estado para almacenar la lista de canciones
const userStore = useUserStore(); // Accede a la store de Pinia

const filterByTitle = ref(false);
const filterByArtist = ref(false);
const minDuration = ref(0); // Estado para almacenar la duración mínima

// Computed property to get the playlist from the store
const playlist = computed(() => userStore.playlist);

// Computed property to get the filtered songs
const filteredSongs = computed(() => {
  let sortedSongs = [...songs.value];
  if (filterByTitle.value) {
    sortedSongs.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filterByArtist.value) {
    sortedSongs.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
  }
  return sortedSongs.filter(song => song.duration >= minDuration.value);
});

// Maneja los resultados emitidos por el componente hijo
const handleResults = (data) => {
  songs.value = data; // Actualiza la lista de canciones
};

// Aplica los filtros
const applyFilters = () => {
  // Trigger the computed property to re-evaluate
};

// Agrega una canción a la playlist
const addToPlaylist = (song) => {
  userStore.addSong(song); // Llama a la acción addSong en la store
};

// Elimina una canción de la playlist
const removeFromPlaylist = (songId) => {
  userStore.removeSong(songId);
};
</script>

<style>
.card-container {
  height: 100%;
  display: flex;
  align-items: stretch;
  margin-top: 10px; /* Añade margen superior a las tarjetas */
}

.card-fixed-size {
  height: 100%;
  display: flex;
  flex-direction: column;
  max-height: 400px; /* Altura máxima para las tarjetas */
  overflow: hidden; /* Oculta el contenido que exceda la altura máxima */
}

.img-container {
  height: 150px;
  width: 100%;
  overflow: hidden;
}

.card-img-top {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-height: 200px; /* Altura máxima para el cuerpo de la tarjeta */
}

.custom-card {
  background-color: #f8f9fa; /* Color de fondo personalizado */
  border: 1px solid #dee2e6; /* Color del borde */
}

.custom-card .card-title,
.custom-card .card-subtitle,
.custom-card .card-text {
  color: #343a40; /* Color del texto */
  font-size: 0.875rem; /* Tamaño de fuente más pequeño */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.custom-card .card-title {
  height: 1.5rem; /* Altura fija para el título */
}

.custom-card .card-subtitle {
  height: 1.25rem; /* Altura fija para el subtítulo */
}

.custom-card .card-text {
  height: 1.25rem; /* Altura fija para el texto */
}

.custom-card .btn-primary {
  background-color: #007bff; /* Color del botón primario */
  border-color: #007bff;
}

.custom-card .btn-danger {
  background-color: #dc3545; /* Color del botón de eliminar */
  border-color: #dc3545;
}
</style>