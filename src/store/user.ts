import { auth } from "@/services/firebase";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { defineStore } from "pinia";
import router from "@/router";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {},
    loadingUser: false,
    loading: false,
  }),
  actions: {
    async registerUser(email: string, password: string) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push("/");
      } catch (error) {
        console.log(error);
        this.userData = {};
      } finally {
        this.loadingUser = false;
      }
    },
    async loginUser(email: string, password: string) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push("/");
      } catch (error) {
        console.log(error);
        this.userData = {};
      } finally {
        this.loadingUser = false;
      }
    },
    async signOutUser() {
      this.loading = true;
      try {
        await signOut(auth);
      } catch (error) {
        console.log(error);
      } finally {
        this.userData = {};
        this.loading = false;
        router.push("/login");
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsubcribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = {
                email: user.email,
                uid: user.uid,
              };
            }
            resolve(user);
          },
          (e) => reject(e)
        );
        // Según la documentación, la función onAuthStateChanged() devuelve
        // La función de cancelación de suscripción para el observador
        unsubcribe();
      });
    },
  },
});
