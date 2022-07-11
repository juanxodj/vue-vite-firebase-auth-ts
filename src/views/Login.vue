<template>
	<h1>Login</h1>
	<h2>{{ pasarMayuscula }}</h2>
	<h2>{{ userStore.userMayuscula }}</h2>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const pasarMayuscula = computed(() => userStore.userData.toUpperCase());
</script>
