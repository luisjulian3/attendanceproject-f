<template>
  <div id="profile-page" class="bg-layer-2 min-h-screen">
    <DashboardLayout>
      <div class="top-0 right-0">
        <NameBox />
      </div>
      <div class="px-2 py-10 sm:px-6 lg:px-8">
        <div v-if="userData" class="mt-2 bg-layer-3 shadow overflow-hidden rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-2 leading-6 font-medium">Personal Information</h3>
            <p class="mt-1 max-w-2xl text-3">Basic personal details</p>
          </div>
          <div class="">
            <dl class="">
              <div class="bg-layer-4 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium">NIK</dt>
                <dd class="mt-1 text-sm sm:col-span-2">{{ userData.nik }}</dd>
              </div>
              <div class="bg-layer-4 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium">Email</dt>
                <dd class="mt-1 text-sm sm:col-span-2">{{ userData.email }}</dd>
              </div>
              <div class="bg-layer-4 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium">Name</dt>
                <dd class="mt-1 text-sm sm:col-span-2">{{ userData.full_name }}</dd>
              </div>
              <div class="bg-layer-4 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium">Place of birth</dt>
                <dd class="mt-1 text-sm sm:col-span-2">
                  {{ userData.place_of_birth }}
                </dd>
              </div>
              <div class="bg-layer-4 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium">Date</dt>
                <dd class="mt-1 text-sm sm:col-span-2">
                  {{ userData.date_of_birth }}
                </dd>
              </div>
              <div class="bg-layer-4 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium">Bind Image Attendance</dt>
                <dd class="mt-1 text-sm sm:col-span-2">{{ userData.bind }}</dd>
              </div>
              <div class="bg-layer-4 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium">Role</dt>
                <dd class="mt-1 text-sm sm:col-span-2">{{ userData.role }}</dd>
              </div>
              <div class="bg-layer-4 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium">Departement</dt>
                <dd class="mt-1 text-sm sm:col-span-2">{{ userData.department }}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div v-else class="mt-6">Loading...</div>
      </div>
    </DashboardLayout>
  </div>
</template>

<script setup>
import DashboardLayout from '@/components/DashboardLayout.vue'
import NameBox from '@/components/NameBox.vue'
import axios from 'axios'
import authService from '@/services/authService.js'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const userData = ref(null)
let error

const isAuthenticated = authService.isTokenValid()
if (!isAuthenticated) {
  router.push('/')
}

onMounted(async () => {
  try {
    const token = authService.getToken()
    console.log('TOKEN PROFILE: ', token)
    const response = await axios.get('http://127.0.0.1:8000/userview/', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    console.log(response.data)
    userData.value = response.data
    console.log(userData.value)
  } catch (fetchError) {
    error = fetchError
    console.error('Error fetching user data:', error)
  }
})
</script>

<style></style>
