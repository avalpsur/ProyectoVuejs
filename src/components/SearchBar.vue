<template>
  <div class="search-container input-group">
    <input
      type="text"
      v-model="searchQuery"
      @keyup.enter="searchDeezer"
      class="form-control"
      placeholder="Buscar en Deezer"
    />
    <button class="btn btn-success" @click="searchDeezer">
      <i class="bi bi-search"></i>
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const searchQuery = ref("");
const emit = defineEmits(["results"]);
const searchDeezer = async () => {
  if (searchQuery.value.trim() === "") return;
  const url = `/api/search?q=${encodeURIComponent(searchQuery.value)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error al buscar en Deezer");
    const data = await response.json();
    emit("results", data.data);
  } catch (error) {
    console.error(error.message);
  }
};
</script>

<style scoped>
.search-container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
