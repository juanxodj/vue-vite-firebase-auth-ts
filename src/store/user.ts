import { auth, db, storage } from "@/services/firebase";
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, updateProfile } from "firebase/auth";
import { defineStore } from "pinia";
import router from "@/router";
import { useDatabaseStore } from "./database";
import { User } from "@/models/user.model";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {} as User,
    loadingUser: false,
    loadingSession: false,
  }),
  actions: {
    async registerUser(email: string, password: string) {
      this.loadingUser = true;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(auth.currentUser);
        router.push("/login");
      } catch (error) {
        return error;
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
        return error;
      } finally {
        this.loadingUser = false;
      }
    },
    async logoutUser() {
      const databaseStore = useDatabaseStore();
      databaseStore.$reset();
      try {
        router.push("/login");
        await signOut(auth);
      } catch (error) {
        console.log(error);
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsubcribe = onAuthStateChanged(
          auth,
          (user) => {
            const databaseStore = useDatabaseStore();
            if (user) {
              this.userData = {
                email: user.email,
                uid: user.uid,
              };
            } else {
              this.userData = {};
              databaseStore.$reset();
            }
            resolve(user);
          },
          (e) => reject(e)
        );
        unsubcribe();
      });
    },
    async updateUser(displayName: string, imagen: string) {
      this.loadingUser = true;
      try {
        await updateProfile(auth.currentUser, {
          displayName,
        });

        if (imagen) {
          const storageRef = ref(
            storage,
            `perfiles/${this.userData.uid}`
          );
          await uploadBytes(storageRef, imagen.originFileObj);
          const photoURL = await getDownloadURL(storageRef);
          await updateProfile(auth.currentUser, {
            photoURL,
          });
        }

        this.setUser(auth.currentUser);
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loadingUser = false;
      }
    },
  },
});
