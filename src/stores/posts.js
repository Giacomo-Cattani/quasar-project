
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const PostsLikeStore = defineStore('postlikestore', {
  state: () => ({
    likes: [],
    expirationDate: new Date(),
    username: '',
    psw: '',
  }),
  getters: {
    getLikes() {
      return this.likes;
    },
    isLogged() {
      let date = new Date();
      return this.expirationDate > date.getTime();
    }
  },
  actions: {
    addLike(obj) {
      this.likes.push(obj);
    },
    removeLike(obj) {
      const objLike = this.searchLikedPost(obj)
      this.likes.splice(objLike, 1);
    },
    searchLikedPost(obj) {
      return this.likes.findIndex((like) => like.userId === obj.userId && like.Id === obj.Id);
    },
    addLoggedUser(data, username, psw) {
      this.expirationDate = data;
      this.username = username;
      this.psw = psw;
    }
  },
  persist: true,
});
