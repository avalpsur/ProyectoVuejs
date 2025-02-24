<template>
  <div class="text-center" v-if="album && album.title">
    <h3 class="text-white mb-3">Álbum: {{ album.title }}</h3>
    <img :src="album.cover_xl" class="img-fluid rounded mb-3" alt="Álbum" />
    <p class="text-light">Fecha de lanzamiento: {{ album.release_date || 'No disponible' }}</p>
    <p class="text-light">Total de canciones: {{ album.nb_tracks || 'No disponible' }}</p>

    <h4 class="text-white mt-4">Lista de canciones:</h4>
    <ul class="list-group">
      <li class="list-group-item bg-dark text-light" v-for="track in album.tracks.data" :key="track.id">
        {{ track.title }}
        <audio :src="track.preview" controls class="w-100 mt-2"></audio>
      </li>
    </ul>

    <a :href="album.link" class="btn btn-light mt-4" target="_blank">Ver en Deezer</a>
  </div>
  <div v-else class="text-center text-light">
    <p>Cargando información del álbum...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const album = ref({ tracks: { data: [] } });

onMounted(async () => {
  try {
    const response = await fetch(`/api/album/${id}`);
    if (!response.ok) throw new Error('Error al obtener datos del álbum');
    const data = await response.json();
    album.value = data;
  } catch (error) {
    console.error('Error al obtener datos del álbum:', error);
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
.list-group-item {
  border: none;
  border-bottom: 1px solid #444;
}
</style>
