<template>
  <a-layout>
    <a-layout-header v-if="!userStore.loadingSession">
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }" v-model:selectedKeys="selectedKeys">
        <a-menu-item v-if="userStore.loggedIn" key="home">
          <router-link to="/">{{ t('menu.home') }}</router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.loggedIn" key="profile">
          <router-link to="/profile">{{ t('menu.profile') }}</router-link>
        </a-menu-item>
        <a-menu-item v-if="userStore.loggedIn" key="grocery">
          <router-link to="/grocery">{{ t('menu.grocery') }}</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.loggedIn" key="login">
          <router-link to="/login">{{ t('menu.login') }}</router-link>
        </a-menu-item>
        <a-menu-item v-if="!userStore.loggedIn" key="register">
          <router-link to="/register">{{ t('menu.register') }}</router-link>
        </a-menu-item>
        <a-menu-item @click="userStore.logoutUser" v-if="userStore.loggedIn" key="logout">
          {{ t('menu.logout') }}
        </a-menu-item>
      </a-menu>
      <nav>| | |</nav>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div class="container">
        <div v-if="userStore.loadingSession">Loading user...</div>
        <router-view v-else></router-view>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/store/user";

const { t } = useI18n();
const userStore = useUserStore();
const route = useRoute();
const selectedKeys = ref([]);

watch(
  () => route.name,
  () => {
    selectedKeys.value = [route.name];
  }
);
</script>

<style>
.container {
  background-color: #fff;
  padding: 24px;
  min-height: calc(100vh - 64px);
}

.text-center {
  text-align: center;
}
</style>
