import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/store/user";
import { useDatabaseStore } from "@/store/database"

const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  userStore.loadingSession = true;
  const user = await userStore.currentUser();
  if (user) {
    userStore.loggedIn = true;
    next();
  } else {
    userStore.loggedIn = false;
    next("/login");
  }
  userStore.loadingSession = false;
};

const redirection = async (to, from, next) => {
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
    beforeEnter: requireAuth
  },
  {
    path: "/data",
    name: "data",
    component: () => import("@/views/Data.vue"),
    beforeEnter: requireAuth
  },
  {
    path: "/grocery",
    name: "grocery",
    component: () => import("@/views/Grocery.vue"),
    beforeEnter: requireAuth
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile.vue"),
    beforeEnter: requireAuth
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
    name: "redirection",
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/NotFound.vue"),
    beforeEnter: redirection,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
