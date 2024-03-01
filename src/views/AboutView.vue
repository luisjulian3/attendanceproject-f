<template>
  <div class="flex flex-col h-screen">
    <div class="bg-blue-800 text-white p-4 flex justify-between items-center fixed w-full top-0">
      <router-link to="/dashboard/profile" class="hover:underline">Profile</router-link>
      <router-link to="/dashboard/home" class="hover:underline">Home</router-link>
      <button @click="logout">Logout</button>
    </div>

    <!-- Add a router-view to display the content of each menu item -->
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
  // Implement your logout logic
  // For example, clear the authentication token and navigate to the login page
  router.push('/login');
};
</script>

<style scoped>
/* Additional styles for a fixed top bar */
body {
  margin: 0;
  /* Remove default margin to prevent content from being pushed down */
}

.router-link {
  margin-right: 1rem;
  /* Adjust the margin between menu items */
}
</style>
