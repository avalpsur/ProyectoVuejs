<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <div class="song-info">
      <h5 class="song-title">{{ song.title }}</h5>
      <h6 class="song-artist">{{ song.artist }}</h6>
    </div>
    <button @click="remove" class="btn btn-danger">Eliminar</button>
  </li>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  song: Object,
});

const emit = defineEmits(['remove']);

const remove = () => {
  emit('remove', props.song.id);
};
</script>

<style scoped>
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
</style>