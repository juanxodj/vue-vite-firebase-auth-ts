import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/Home.vue";
import About from "@/views/About.vue";
import Data from "@/views/Data.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/data",
    name: "data",
    component: Data,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
