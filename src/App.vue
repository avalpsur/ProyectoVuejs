<template>
  <div class="app-container">
    <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">DeezerTotal</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link text-light" to="/">Inicio</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-light" to="/playlists">Playlists</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link text-light" to="/search">Buscar</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="content mt-3">
      <router-view @play-song="setCurrentTrack"></router-view>
    </div>

    <Reproductor :track="currentTrack" />

    <footer class="footer bg-dark text-light text-center py-3 mt-auto">
      <p class="m-0">&copy; 2025 DeezerTotal - Todos los derechos reservados</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Reproductor from './components/Reproductor.vue';

const currentTrack = ref(null);

const setCurrentTrack = (song) => {
  currentTrack.value = song;
};
</script>


<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 60px; /* Espacio para el reproductor */
}

.content {
  flex: 1;
  padding: 20px;
  background: linear-gradient(135deg, #1db954, #191414);
  color: white;
}

.footer {
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>
