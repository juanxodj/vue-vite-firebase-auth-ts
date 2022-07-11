import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { db, auth } from "@/services/firebase";
import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import router from "@/router";
import { Document } from "@/models/document.model";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [] as Document[],
    loadingDoc: false,
    loading: false,
  }),
  actions: {
    async getURL(id: string) {
      try {
        const docRef = doc(db, "urls", id);
        const docSpan = await getDoc(docRef);

        if (!docSpan.exists()) {
          return false;
        }

        return docSpan.data().name;
      } catch (error) {
        return error;
      } finally {
      }
    },
    async getUrls() {
      if (this.documents.length !== 0) {
        return;
      }

      this.loadingDoc = true;
      try {
        const q = query(
          collection(db, "urls"),
          where("user", "==", auth.currentUser?.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.documents.push({
            id: doc.id,
            name: doc.data().name,
            short: doc.data().short,
            user: doc.data().user,
            ...doc.data(),
          });
        });
      } catch (error) {
        return error;
      } finally {
        this.loadingDoc = false;
      }
    },
    async addUrl(name: string) {
      this.loading = true;
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
        return error;
      } finally {
        this.loading = false;
      }
    },
    async readUrl(id: string) {
      try {
        const docRef = doc(db, "urls", id);
        const docSpan = await getDoc(docRef);

        if (!docSpan.exists()) {
          throw new Error("no existe el doc");
        }

        if (docSpan.data().user !== auth.currentUser?.uid) {
          throw new Error("no le pertenece ese documento");
        }

        return docSpan.data().name;
      } catch (error) {
        return error
      } finally {
      }
    },
    async updateUrl(id: string, name: string) {
      this.loading = true;
      try {
        const docRef = doc(db, "urls", id);

        const docSpan = await getDoc(docRef);
        if (!docSpan.exists()) {
          throw new Error("no existe el doc");
        }

        if (docSpan.data().user !== auth.currentUser?.uid) {
          throw new Error("no le pertenece ese documento");
        }

        await updateDoc(docRef, {
          name: name,
        });

        this.documents = this.documents.map((item) =>
          item.id === id ? { ...item, name: name } : item
        );
        router.push("/");
      } catch (error) {
        return error;
      } finally {
        this.loading = false;
      }
    },
    async deleteUrl(id: string) {
      this.loading = true;
      try {
        const docRef = doc(db, "urls", id);

        const docSpan = await getDoc(docRef);
        if (!docSpan.exists()) {
          throw new Error("no existe el doc");
        }

        if (docSpan.data().user !== auth.currentUser?.uid) {
          throw new Error("no le pertenece ese documento");
        }

        await deleteDoc(docRef);
        this.documents = this.documents.filter(
          (item) => item.id !== id
        );
      } catch (error) {
        return error;
      } finally {
        this.loading = false;
      }
    },
  },
});
