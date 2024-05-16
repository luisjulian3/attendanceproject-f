<template>
  <div id="admin-regist-page" class="bg-layer min-h-screen">
    <DashboardLayout>
      <div>
        <div class="mt-10 px-2 py-10 sm:px-6 lg:px-8">
          <div class="mt-2 bg-white shadow overflow-hidden rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Basic personal details</p>
            </div>
            <div class="border-t border-gray-200 flex justify-between items-center">
              <div class="flex-grow px-4 py-2">
                <input
                  type="text"
                  v-model="searchQuery"
                  class="w-full border rounded-md py-2 px-3"
                  placeholder="Search..."
                  @input="handleSearch"
                />
              </div>
              <button
                @click="searchProfileData"
                class="bg-blue-500 text-white py-2 px-4 mr-2 rounded-md"
              >
                Search
              </button>
            </div>
            <div v-if="filteredResults.length === 0" class="px-4 py-2 text-gray-500"></div>
            <div v-else>
              <div
                v-for="result in filteredResults"
                :key="result.id"
                class="px-6 py-2 border-b bg-slate-500 mx-4 m-2 rounded-md"
                @click="populateSearch(result)"
              >
                {{ result.full_name }} - {{ result.nik }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="userData" class="pb-10 px-2 sm:px-6 lg:px-8">
          <div class="mt-2 bg-white shadow overflow-hidden rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">NIK</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">{{ userData.nik }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Email</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">{{ userData.email }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Name</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">{{ userData.full_name }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Place of birth</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
                    {{ userData.place_of_birth }}
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Date</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
                    {{ userData.date_of_birth }}
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Bind Image Attendance</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">{{ userData.bind }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Role</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">{{ userData.role }}</dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Departement</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:col-span-2">
                    {{ userData.department }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  </div>
</template>

<script setup>
import DashboardLayout from '@/components/DashboardLayout.vue'
import authService from '@/services/authService.js'
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const searchQuery = ref('')
const filteredResults = ref([])
const userData = ref(null)

const isAuthenticated = authService.isTokenValid()
if (!isAuthenticated) {
  router.push('/')
}

const fetchData = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/search?nik=${searchQuery.value}`)
    filteredResults.value = response.data
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const handleSearch = () => {
  if (searchQuery.value.length >= 2) {
    fetchData()
  } else {
    filteredResults.value = []
  }
}

const populateSearch = (result) => {
  searchQuery.value = result.nik
  handleSearch()
  setTimeout(() => {
    filteredResults.value = []
  }, 100)
}

const searchProfileData = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/userviewlog?nik=${searchQuery.value}`)
    userData.value = response.data
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching profile data:', error)
  }
}

watch(searchQuery, () => {
  handleSearch()
})

onMounted(() => {
  fetchData()
})
</script>

<style></style>
