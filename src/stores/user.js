import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: "bluuweb",
  }),
  getters: {
    userMayuscula(state) {
      return state.userData.toUpperCase();
    },
  },
  actions: {
    registerUser(name) {
      this.userData = name;
    },
  },
});
