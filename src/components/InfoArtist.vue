<template>
  <div class="text-center" v-if="artist && artist.name">
    <h3 class="text-white mb-3">Artista: {{ artist.name }}</h3>
    <img :src="artist.picture_xl" class="img-fluid rounded mb-3" alt="Artista" />
    <p class="text-light">Fans: {{ artist.nb_fan ? artist.nb_fan.toLocaleString() : 'No disponible' }}</p>
    <a :href="artist.link" class="btn btn-light" target="_blank">Ver en Deezer</a>
  </div>
  <div v-else class="text-center text-light">
    <p>Cargando información del artista...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;

const artist = ref({});

onMounted(async () => {
  try {
    const response = await fetch(`/api/artist/${id}`);
    if (!response.ok) throw new Error('Error al obtener datos del artista');
    const data = await response.json();
    artist.value = data;
  } catch (error) {
    console.error('Error al obtener datos del artista:', error);
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
