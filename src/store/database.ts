import { collection, getDocs, query, where, addDoc, deleteDoc, getDoc, doc, updateDoc, setDoc } from "firebase/firestore/lite";
import { defineStore } from "pinia";
import { auth, db } from "@/services/firebase";
import { Document } from "@/models/document.model";
import { nanoid } from 'nanoid';
import router from "@/router";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [] as Document[],
    loading: false,
    loadingDoc: false,
    loadingURL: false
  }),
  actions: {
    async getUrls() {
      if (this.documents.length !== 0) {
        return;
      }
      this.loading = true;
      this.documents = [];
      const q = query(
        collection(db, "urls"),
        where("user", "==", auth.currentUser?.uid)
      );
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.documents.push({
            id: doc.id,
            name: doc.data().name,
            short: doc.data().short,
            user: doc.data().user,
          });
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async addUrl(name: string) {
      this.loadingURL = true;
      try {
        const objetoDoc = {
          name: name,
          short: nanoid(6),
          user: auth.currentUser?.uid,
        };
        await setDoc(doc(db, "urls", objetoDoc.short), objetoDoc);
        this.documents.push({
          ...objetoDoc,
          id: objetoDoc.short,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingURL = false;
      }
    },
    async deleteUrl(id: string) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error('no existe el doc')
        }

        if (docSnap.data().user === auth.currentUser?.uid) {
          await deleteDoc(docRef);
          this.documents = this.documents.filter(
            (item) => item.id !== id
          );
        } else {
          throw new Error('no eres el autor')
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async readUrl(id: string) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("no existe el doc");
        }

        if (docSnap.data().user === auth.currentUser?.uid) {
          return docSnap.data().name;
        } else {
          throw new Error("no eres el autor");
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async updateUrl(id: string, name: string) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, "urls", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("no existe el doc");
        }

        if (docSnap.data().user === auth.currentUser?.uid) {
          await updateDoc(docRef, {
            name: name,
          });
          this.documents = this.documents.map((item) =>
            item.id === id ? { ...item, name: name } : item
          );
          router.push("/");
        } else {
          throw new Error("no eres el autor");
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
    async searchURL(id: string) {
      try {
        const docRef = doc(db, "urls", id);
        const docSpan = await getDoc(docRef);
        if (!docSpan.exists()) {
          return false;
        }
        window.location.href = docSpan.data().name;
        return docSpan.data().name;
      } catch (error) {
        console.log(error);
        return false;
      } finally {
      }
    },
  },
});
