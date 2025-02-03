<template>
    <div class="reproductor">
      <div class="reproductor-controls">
        <button @click="prevTrack">⏮️</button>
        <button @click="togglePlayPause">{{ isPlaying ? '⏸️' : '▶️' }}</button>
        <button @click="nextTrack">⏭️</button>
      </div>
      <div class="reproductor-info">
        <p>{{ currentTrack.title }} - {{ currentTrack.artist }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const isPlaying = ref(false);
  const currentTrack = ref({
    title: 'Título de la canción',
    artist: 'Artista',
  });
  
  const togglePlayPause = () => {
    isPlaying.value = !isPlaying.value;
  };
  
  const prevTrack = () => {
  };
  
  const nextTrack = () => {
  };
  </script>
  
  <style scoped>
  .reproductor {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: #f8f9fa;
    border-top: 1px solid #dee2e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  
  .reproductor-controls button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .reproductor-info {
    flex: 1;
    text-align: center;
  }
  </style>