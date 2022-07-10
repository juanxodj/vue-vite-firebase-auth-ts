<template>
  <h1>About {{ userStore.userData }}</h1>
</template>

<script setup lang="ts">
import { useUserStore } from "../stores/user";
const userStore = useUserStore();
</script>
