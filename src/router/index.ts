import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/user";
import { useDatabaseStore } from "@/store/database"

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
  userStore.loadingSession = false;
};

const redireccion = async (to, from, next) => {
  const databaseStore = useDatabaseStore();
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const name = await databaseStore.getURL(to.params.pathMatch[0]);
  if (!name) {
    next();
    userStore.loadingSession = false;
  } else {
    window.location.href = name;
    userStore.loadingSession = true;
    next();
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    beforeEnter: requireAuth
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => import("@/views/Edit.vue"),
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
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile.vue"),
  },
  {
    name: "redireccion",
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/NotFound.vue"),
    beforeEnter: redireccion,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
