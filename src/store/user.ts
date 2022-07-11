import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore/lite";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "@/services/firebase";
import router from "../router";
import { useDatabaseStore } from "@/store/database";
import { User } from "@/models/user.model";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: {} as User,
    loadingUser: false,
    loadingSession: false,
    loggedIn: false,
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
    async updateUser(displayName: string, imagen: object) {
      this.loadingUser = true;
      try {
        if (imagen) {
          const storageRef = ref(
            storage,
            `profile/${this.userData.uid}`
          );
          await uploadBytes(storageRef, imagen.originFileObj);
          const photoURL = await getDownloadURL(storageRef);
          await updateProfile(auth.currentUser, {
            photoURL,
          });
        }
        await updateProfile(auth.currentUser, {
          displayName,
        });
        this.setUser(auth.currentUser);
      } catch (error) {
        return error;
      } finally {
        this.loadingUser = false;
      }
    },
    async setUser(user: User) {
      try {
        const docRef = doc(db, "users", user.uid);
        let userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }

        this.userData = userData;

        await setDoc(docRef, this.userData);
      } catch (error) {
        return error;
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
        await this.setUser(user);
        this.loggedIn = true;
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
        await signOut(auth);
        this.loggedIn = false;
        router.push("/login");
      } catch (error) {
        return error;
      }
    },
    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          async (user) => {
            if (user) {
              this.userData = {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
              };
            } else {
              this.userData = {};
              const databaseStore = useDatabaseStore();
              databaseStore.$reset();
            }
            resolve(user);
          },
          (e) => reject(e)
        );
        unsuscribe();
      });
    },
  },
});
