<template>
  <div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import authService from '@/services/authService.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  authService.removeToken()

  router.push('/login')
}
</script>
