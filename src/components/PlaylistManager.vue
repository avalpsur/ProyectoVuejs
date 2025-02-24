<template>
  <div class="playlist-manager">
    <h2>Tu Playlist</h2>
    <ul class="list-group">
      <PlaylistItem
        v-for="song in playlist"
        :key="song.id"
        :song="song"
        @remove="removeSong"
      />
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useUserStore } from '../stores/counter';
import PlaylistItem from './PlaylistItem.vue';

const userStore = useUserStore();
const playlist = computed(() => userStore.playlist);

const removeSong = (songId) => {
  userStore.removeSong(songId);
};
</script>

<style scoped>
.playlist-manager {
  background: linear-gradient(135deg, #1db954, #191414);
  color: white;
  padding: 20px;
  border-radius: 10px;
}
</style>