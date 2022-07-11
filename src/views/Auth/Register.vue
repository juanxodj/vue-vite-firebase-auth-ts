<template>
  <div class="w-full max-w-xs">
    <h1>Register</h1>
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email" type="email" placeholder="Email" v-model.trim="email">
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input
          class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password" type="password" placeholder="******************" v-model.trim="password">
        <p class="text-red-500 text-xs italic">Please choose a password.</p>
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit" :disabled="userStore.loadingUser">
          Sign In
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
          Forgot Password?
        </a>
      </div>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2022 Acme Corp. All rights reserved.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const email = ref("jlsc92@gmail.com");
const password = ref("123456");

const handleSubmit = async () => {
  if (!email.value || password.value.length < 6) {
    alert("ingresa los campos");
  }

  try {
    await userStore.registerUser(email.value, password.value);
    alert("Verifica email");
  } catch (error) {
    console.log(error);
  }
};
</script>
