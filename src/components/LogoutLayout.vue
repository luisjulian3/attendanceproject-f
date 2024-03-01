<template>
    <div>
        <!-- You can add a confirmation dialog or additional UI if needed -->
        <button @click="logout">Logout</button>
    </div>
</template>

<script setup>
import authService from '@/services/authService.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const logout = () => {
    // Remove all cookies
    authService.removeToken();

    // Redirect to the login page
    router.push('/login');
};
</script>
