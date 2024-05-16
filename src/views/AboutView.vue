<template>
  <div class="flex flex-col h-screen">
    <div class="bg-blue-800 text-white p-4 flex justify-between items-center fixed w-full top-0">
      <router-link to="/dashboard/profile" class="hover:underline">Profile</router-link>
      <router-link to="/dashboard/home" class="hover:underline">Home</router-link>
      <button @click="logout">Logout</button>
    </div>
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  router.push('/login');
};
</script>

<style scoped>
body {
  margin: 0;
}

.router-link {
  margin-right: 1rem;
}
</style>
