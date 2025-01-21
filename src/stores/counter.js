import { defineStore } from 'pinia';

export const useUserStore = defineStore('counter', {
    state: () => ({
        playlist: [],
    }),
    getters: {
        getTotal: (state) => state.playlist.length
    },
    actions: {
        addSong(song) {
          const newSong = {
            id: song.id,
            title: song.title,
            artist: song.artist.name,
            album: song.album.title,
            duration: song.duration,
            cover: song.album.cover,
          };
          this.playlist.push(newSong);
        },

        removeSong(id) {
            this.playlist = this.playlist.filter((song) => song.id !== id);
        },

        clearCounter() {
            this.playlist = [];
        },
      },
    });