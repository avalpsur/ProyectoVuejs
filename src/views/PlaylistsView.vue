<template>
  <div>
    <h1>Playlists</h1>
    <p>Gestiona tus playlists aquí.</p>
  </div>
  <!-- Mostrar datos de la store directamente -->
  <div class="store-data">
    <h3>Datos desde la Store:</h3>
    <p>Email actual: {{ userEmail }}</p>
    <p>Dominio del email: {{ emailDomain }}</p>
  </div>
  <!-- Mostrar la lista de canciones en la playlist -->
  <div v-if="playlist.length > 0">
    <h3>Tu Playlist:</h3>
    <ul>
      <li v-for="song in playlist" :key="song.id" class="playlist-item">
        <img :src="song.album.cover_medium" alt="Album Cover" class="album-cover" />
        <div class="song-info">
          <h5 class="song-title">{{ song.title }}</h5>
          <h6 class="song-artist">{{ song.artist.name }}</h6>
          <p class="song-album">{{ song.album.title }}</p>
        </div>
        <button @click="removeFromPlaylist(song.id)" class="btn btn-danger">Eliminar</button>
      </li>
    </ul>
  </div>
  <p v-else>No hay canciones en tu playlist</p>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '../stores/counter'; // Importa la store de Pinia

// Vincula datos de la store
const userStore = useUserStore();

const userEmail = computed(() => userStore.email);
const emailDomain = computed(() => userStore.emailDomain);

// Computed property to get the playlist from the store
const playlist = computed(() => userStore.playlist);

// Elimina una canción de la playlist
const removeFromPlaylist = (songId) => {
  userStore.removeSong(songId);
};
</script>

<style scoped>
h1 {
  color: #28a745;
}

.playlist-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.album-cover {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.song-info {
  flex: 1;
}

.song-title {
  margin: 0;
  font-size: 1rem;
}

.song-artist {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

.song-album {
  margin: 0;
  font-size: 0.75rem;
  color: #6c757d;
}

.btn-danger {
  margin-left: 10px;
}
</style>