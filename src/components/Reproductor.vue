<template>
  <div class="player-container">
    <div class="player-controls">
      <button @click="prevTrack" class="btn btn-outline-light"><i class="bi bi-skip-backward-fill"></i></button>
      <button @click="togglePlayPause" class="btn btn-light mx-3">
        <i :class="isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'"></i>
      </button>
      <button @click="nextTrack" class="btn btn-outline-light"><i class="bi bi-skip-forward-fill"></i></button>
    </div>
    <div class="player-info text-light">
      <p class="m-0" v-if="track">{{ track.title }} - {{ track.artist.name }}</p>
      <p class="m-0" v-else>No hay canción en reproducción</p>
    </div>
    <div class="progress-container">
      <input type="range" min="0" :max="duration" v-model="currentTime" @input="seek" class="progress-bar" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  track: Object,
});

const isPlaying = ref(false);
const audio = ref(null);
const currentTime = ref(0);
const duration = ref(0);

const togglePlayPause = () => {
  if (isPlaying.value) {
    audio.value.pause();
  } else {
    audio.value.play();
  }
  isPlaying.value = !isPlaying.value;
};

const prevTrack = () => {
  console.log("Canción anterior");
};

const nextTrack = () => {
  console.log("Siguiente canción");
};

const seek = (event) => {
  if (audio.value) {
    audio.value.currentTime = event.target.value;
  }
};

const updateProgress = () => {
  if (audio.value) {
    currentTime.value = audio.value.currentTime;
    duration.value = audio.value.duration;
  }
};

// Watch for changes in the track prop to update the audio source
watch(() => props.track, (newTrack) => {
  if (newTrack && newTrack.preview) {
    if (audio.value) {
      audio.value.pause();
    }
    audio.value = new Audio(newTrack.preview);
    audio.value.addEventListener('timeupdate', updateProgress);
    if (isPlaying.value) {
      audio.value.play();
    }
  }
});

onMounted(() => {
  if (audio.value) {
    audio.value.addEventListener('timeupdate', updateProgress);
  }
});

onUnmounted(() => {
  if (audio.value) {
    audio.value.removeEventListener('timeupdate', updateProgress);
  }
});
</script>

<style scoped>
.player-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #343a40;
  border-top: 1px solid #dee2e6;
  z-index: 1000;
}

.player-controls {
  display: flex;
  align-items: center;
}

.player-info {
  flex: 1;
  text-align: center;
}

.progress-container {
  flex: 1;
  margin: 0 10px;
}

.progress-bar {
  width: 100%;
}
</style>