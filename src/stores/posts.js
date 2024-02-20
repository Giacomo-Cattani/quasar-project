
import { defineStore } from 'pinia';

export const PostsLikeStore = defineStore('postlikestore', {
  state: () => ({
    likes: [],
    expirationDate: null
  }),
  getters: {
    getLikes() {
      return this.likes;
    },
    isLogged() {
      return this.expirationDate > Date.now();
    }
  },
  actions: {
    addLike(obj) {
      this.likes.push(obj);
    },
    removeLike(obj) {
      const objLike = this.searchLikedPost(obj);
      this.likes.splice(this.likes.indexOf(objLike), 1);
    },
    searchLikedPost(obj) {
      return this.likes.find((element) => element === obj);
    },
    addLoggedUser(expirationDate) {
      this.expirationDate = expirationDate;
    }
  },
  persist: true,
});
