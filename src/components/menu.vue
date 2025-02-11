<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-gradient">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img src="/logo.png" alt="Logo" width="40" height="40" class="me-2" />
        <span class="fw-bold">MyMusicApp</span>
      </a>
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
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/playlists">Playlists</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/search">Buscar</router-link>
          </li>
        </ul>
        <form class="d-flex ms-3">
          <input class="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
          <button class="btn btn-outline-light" type="submit">Buscar</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.bg-gradient {
  background: linear-gradient(135deg, #1db954, #191414);
}
.navbar {
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}
.navbar-brand img {
  border-radius: 50%;
}
</style>
