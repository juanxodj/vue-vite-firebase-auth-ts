<template>
  <h1>Home {{ userStore.userData }}</h1>
  <p>VITE_MY_ENV_VARIABLE: {{ envVariable }}</p>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const envVariable = import.meta.env.VITE_APP_TITLE;
</script>
