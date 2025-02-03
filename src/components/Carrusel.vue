<template>
    <div v-if="songs.length > 0" id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button v-for="(song, index) in songs" :key="index" type="button" :data-bs-target="'#carouselExampleIndicators'" :data-bs-slide-to="index" :class="{ active: index === 0 }" :aria-current="index === 0 ? 'true' : undefined" :aria-label="'Slide ' + (index + 1)"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item" :class="{ active: index === 0 }" v-for="(song, index) in songs" :key="song.id">
          <img :src="song.album.cover_xl" class="d-block w-100" :alt="song.title">
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ song.title }}</h5>
            <p>{{ song.artist.name }}</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <div v-else>
      <p>Cargando canciones destacadas...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const songs = ref([]);
  
  const fetchSongs = async () => {
    const url = `http://localhost:8080/https://api.deezer.com/chart`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error fetching data');
      const data = await response.json();
      songs.value = data.tracks.data.slice(0, 4); // Limita a las primeras 4 canciones
    } catch (error) {
      console.error(error.message);
    }
  };
  
  onMounted(() => {
    fetchSongs();
  });
  </script>
  
  <style scoped>
  .carousel-item img {
    height: 500px;
    object-fit: cover;
  }
  
  .carousel-inner {
    width: 100vw; /* Ocupa todo el ancho de la pantalla */
    margin-left: calc(-50vw + 50%); /* Elimina el margen en los lados */
  }
  
  .carousel-control-prev,
  .carousel-control-next {
    width: 5%; /* Ajusta el ancho de las flechas de control */
  }
  
  .carousel-control-prev {
    left: -2%; /* Mueve la flecha de control izquierda más hacia el extremo */
  }
  
  .carousel-control-next {
    right: -2%; /* Mueve la flecha de control derecha más hacia el extremo */
  }
  </style>