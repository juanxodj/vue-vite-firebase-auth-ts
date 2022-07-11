import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/user";

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loading = true;
  const user = await userStore.currentUser();
  console.log(user);
  if (user && user.emailVerified) {
    next();
  } else {
    next("/login");
  }
  userStore.loading = false;
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    beforeEnter: requireAuth
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue"),
  },
  {
    path: "/data",
    name: "data",
    component: () => import("@/views/Data.vue"),
  },
  {
    path: "/grocery",
    name: "grocery",
    component: () => import("@/views/Grocery.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Auth/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Auth/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
