<script setup>
import VueCookies from 'vue-cookies'
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import authService from '@/services/authService'

const store = useStore()
const router = useRouter()
const nik = ref('')
const password = ref('')
const errorMessage = ref('')

const login = async () => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/logintest/', {
      nik: nik.value,
      password: password.value
    })

    if (response.status === 200) {
      const token = response.data.token
      VueCookies.set('token', token)

      const nikFromToken = authService.getNikFromToken()

      store.commit('setNik', nikFromToken)
      store.commit('setShouldShowLogin', false)

      router.push('/dashboard')
    } else {
      errorMessage.value = response.data.message
    }
  } catch (error) {
    errorMessage.value = 'An error occurred during login.'
    console.error('An error occurred during login:', error)
  }
}

const toggleLogin = () => {
  store.commit('setShouldShowLogin', !store.state.shouldShowLogin)
}

onMounted(() => {
  const isTokenValid = authService.isTokenValid()
  if (!isTokenValid) {
    errorMessage.value = 'Your session has expired. Please log in again.'
  }
})
</script>

<template>
  <div id="login-page" class="min-h-screen flex items-center justify-center bg-layer-2">
    <div class="bg-layer-3 p-8 rounded shadow-md w-96 h-96">
      <h2 class="text-2xl font-semibold mb-4">Login</h2>
      <form @submit.prevent="login" class="flex flex-col space-y-4">
        <label for="nik" class="text-white">NIK:</label>
        <input type="text" v-model="nik" required class="p-2 rounded border" />

        <label for="password" class="text-white">Password:</label>
        <input type="password" v-model="password" required class="p-2 rounded border" />

        <button type="submit" @click="toggleLogin" class="bg-blue-600 text-white py-2 px-4 rounded">
          Toggle Login
        </button>

        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* You can remove the scoped attribute for the Tailwind CSS part */
</style>
