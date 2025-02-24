<template>
  <div class="container py-4">
    <h1 class="text-white text-center mb-4">🎶 Tu Playlist</h1>
    <div v-if="playlist.length > 0" class="row">
      <div class="col-md-3" v-for="song in playlist" :key="song.id">
        <div class="card song-card h-100 shadow-lg">
          <div class="card-img-container">
            <img :src="song.album.cover_medium" class="card-img-top" alt="Album Cover" />
          </div>
          <div class="card-body text-center">
            <h5 class="card-title fw-bold text-white">{{ song.title }}</h5>
            <h6 class="card-subtitle text-light">{{ song.artist.name }}</h6>
            <p class="card-text text-muted">{{ song.album.title }}</p>
            <button class="btn btn-danger w-100 mt-2" @click="removeFromPlaylist(song.id)">❌ Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <p v-else class="text-white text-center">No hay canciones en tu playlist</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { usePlaylistStore } from '@/stores/playlistStore';

const playlistStore = usePlaylistStore();
const playlist = computed(() => playlistStore.playlist); // Usa computed para mantener la reactividad

const removeFromPlaylist = (id) => {
  playlistStore.removeSongFromPlaylist(id);
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