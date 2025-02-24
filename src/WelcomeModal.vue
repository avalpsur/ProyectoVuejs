<template>
  <div class="modal fade" id="welcomeModal" tabindex="-1" aria-labelledby="welcomeModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="welcomeModalLabel">Bienvenido</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="saveUser">
            <div class="mb-3">
              <label for="username" class="form-label">Nombre de usuario</label>
              <input type="text" class="form-control" id="username" v-model="username" required>
            </div>
            <div class="mb-3">
              <label for="avatar" class="form-label">Elige un avatar</label>
              <input type="file" class="form-control" id="avatar" @change="onFileChange">
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const username = ref('');
const avatar = ref(null);

const onFileChange = (event) => {
  avatar.value = event.target.files[0];
};

const saveUser = () => {
  const user = {
    username: username.value,
    avatar: avatar.value ? URL.createObjectURL(avatar.value) : null,
  };
  localStorage.setItem('user', JSON.stringify(user));
  const modal = new bootstrap.Modal(document.getElementById('welcomeModal'));
  modal.hide();
};
</script>

<style scoped>
.modal-content {
  background: linear-gradient(135deg, #1db954, #191414);
  color: white;
}
</style>