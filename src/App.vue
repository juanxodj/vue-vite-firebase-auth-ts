<template>
  <div v-if="userStore.loading">Loading...</div>
  <div v-else>
    <nav>
      <router-link to="/" v-if="userStore.userData">
        Home
      </router-link> |
      <router-link to="/about" v-if="userStore.userData">
        About
      </router-link> |
      <router-link to="/data" v-if="userStore.userData">
        Data
      </router-link> |
      <router-link to="/grocery" v-if="userStore.userData">
        Grocery
      </router-link> |
      <router-link to="/login" v-if="Object.keys(userStore.userData).length === 0">
        Login
      </router-link> |
      <router-link to="/register" v-if="Object.keys(userStore.userData).length === 0">
        Register
      </router-link>
    </nav>
    <router-view />
  </div>

</template>

<script setup lang="ts">
import { useUserStore } from "@/store/user";
const userStore = useUserStore();
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
