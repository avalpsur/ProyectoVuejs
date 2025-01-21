<template>
  <div>
    <h1>Búsqueda de canciones en Deezer</h1>
    <!-- Componente hijo -->
    <SearchBar @results="handleResults" />
    
    <!-- Filtros -->
    <div>
      <label>
        <input type="checkbox" v-model="filterByTitle" @change="applyFilters" />
        Filtrar por nombre de canción (ascendente)
      </label>
      <label>
        <input type="checkbox" v-model="filterByArtist" @change="applyFilters" />
        Filtrar por nombre de artista (ascendente)
      </label>
      <label>
        Duración mínima (segundos):
        <input type="number" v-model.number="minDuration" @input="applyFilters" />
      </label>
    </div>

    <!-- Lista de canciones -->
    <ul v-if="filteredSongs.length > 0">
      <li v-for="song in filteredSongs" :key="song.id">
        <img :src="song.album.cover" alt="Album Cover" class="album-cover" />
        <strong>{{ song.title }}</strong> - {{ song.artist.name }} - {{ song.album.title }} - {{ song.duration }}
        <button @click="addToPlaylist(song)">Agregar a Playlist</button>
      </li>
    </ul>
    <p v-else>No hay resultados para mostrar</p>

    <!-- Lista de canciones en la playlist -->
    <h2>Playlist</h2>
    <ul v-if="playlist.length > 0">
      <li v-for="song in playlist" :key="song.id">
        <img :src="song.cover" alt="Album Cover" class="album-cover" />
        <strong>{{ song.title }}</strong> - {{ song.artist }} - {{ song.album }} - {{ song.duration }}
        <button @click="removeFromPlaylist(song.id)">Eliminar</button>
      </li>
    </ul>
    <p v-else>No hay canciones en la playlist</p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
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
  if (filterByTitle.value && filterByArtist.value) {
    filterByArtist.value = false; // No se pueden aplicar ambos filtros a la vez
  }
};

// Agrega una canción a la playlist
const addToPlaylist = (song) => {
  userStore.addSong(song); // Llama a la acción para agregar la canción
};

// Elimina una canción de la playlist
const removeFromPlaylist = (id) => {
  userStore.removeSong(id); // Llama a la acción para eliminar la canción
};
</script>

<style scoped>
.album-cover {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>