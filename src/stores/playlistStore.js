// src/stores/playlistStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePlaylistStore = defineStore('playlistStore', () => {
  const playlist = ref([]);

  const addSongToPlaylist = (song) => {
    const exists = playlist.value.some(item => item.id === song.id);
    if (!exists) {
      playlist.value = [...playlist.value, song]; 
    }
  };

  const removeSongFromPlaylist = (id) => {
    playlist.value = playlist.value.filter(song => parseInt(song.id) !== parseInt(id));
  };

  return {
    playlist,
    addSongToPlaylist,
    removeSongFromPlaylist
  };
});
