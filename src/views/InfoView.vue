<template>
  <div class="info-view container py-4">
    <h2 class="text-center text-white mb-4">Detalles del Elemento</h2>
    <div class="card bg-dark text-light shadow-lg p-3 mb-5 rounded">
      <InfoArtist v-if="type === 'artist'" :id="id" />
      <InfoAlbum v-else-if="type === 'album'" :id="id" />
      <InfoSong v-else-if="type === 'song'" :id="id" />
      <p v-else class="text-center">No se encontró información</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import InfoArtist from '../components/InfoArtist.vue';
import InfoAlbum from '../components/InfoAlbum.vue';
import InfoSong from '../components/InfoSong.vue';

const route = useRoute();
const type = computed(() => route.params.type);
const id = computed(() => route.params.id);
</script>

<style scoped>
.info-view {
  background: linear-gradient(135deg, #1db954, #191414);
  color: white;
  border-radius: 10px;
  padding: 20px;
}
.card {
  border: 1px solid #444;
}
</style>
