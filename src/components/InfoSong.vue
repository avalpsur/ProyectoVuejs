<template>
  <div class="text-center" v-if="song && song.title">
    <h3 class="text-white mb-3">Canción: {{ song.title }}</h3>
    <img :src="song.album.cover_xl" class="img-fluid rounded mb-3" alt="Álbum" />
    <p class="text-light">Artista: {{ song.artist ? song.artist.name : 'No disponible' }}</p>
    <p class="text-light">Álbum: {{ song.album ? song.album.title : 'No disponible' }}</p>
    <p class="text-light">Duración: {{ formatDuration(song.duration) }}</p>
    <audio :src="song.preview" controls class="w-100 mt-3"></audio>
    <a :href="song.link" class="btn btn-light mt-4" target="_blank">Ver en Deezer</a>
  </div>
  <div v-else class="text-center text-light">
    <p>Cargando información de la canción...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const song = ref(null);

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

onMounted(async () => {
  try {
    const response = await fetch(`/api/track/${id}`);
    if (!response.ok) throw new Error('Error al obtener datos de la canción');
    const data = await response.json();
    song.value = data;
  } catch (error) {
    console.error('Error al obtener datos de la canción:', error);
  }
});
</script>

<style scoped>
.img-fluid {
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
