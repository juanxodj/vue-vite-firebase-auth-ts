<template>
	<h1>Register</h1>
	<button @click="userStore.registerUser('Ignacio')">Acceder</button>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
</script>
