<template>
  <div id="admin-regist-page" class="bg-layer-2 min-h-screen">
    <DashboardLayout>
      <div class="top-0 right-0">
        <NameBox />
      </div>
      <div>
        <div class="px-2 py-10 sm:px-6 lg:px-8">
          <div class="mt-2 bg-layer-3 shadow overflow-hidden rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-2 leading-6 font-medium">Personal Information</h3>
              <p class="mt-1 max-w-2xl text-3">Basic personal details</p>
            </div>
            <div class="border-t border-gray-200 flex justify-between items-center">
              <div class="flex-grow px-4 py-2">
                <input
                  type="text"
                  v-model="searchQuery"
                  class="w-full border rounded-md py-2 px-3 text-black"
                  placeholder="Search..."
                  @input="handleSearch"
                />
              </div>
              <button
                @click="searchProfileData"
                class="bg-layer-4 text-black py-2 px-4 mr-2 rounded-md"
              >
                Search
              </button>
            </div>
            <!-- Filtered Results -->
            <div v-if="filteredResults.length === 0" class="px-4 py-2"></div>
            <div v-else>
              <div
                v-for="result in filteredResults"
                :key="result.id"
                class="px-6 py-2 border bg-slate mx-4 m-2 rounded-md bg-layer-4"
                @click="populateSearch(result)"
              >
                <!-- Display filtered results here -->
                {{ result.full_name }} - {{ result.nik }}
              </div>
            </div>
          </div>
        </div>
        <!-- Profile Information -->
        <div v-if="userData" class="pb-10 px-2 sm:px-6 lg:px-8">
          <div class="mt-2 bg-layer-3 shadow overflow-hidden rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium">Profile Information</h3>
            </div>
            <div class="border-t border-gray-200">
              <dl>
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
                  <dd class="mt-1 text-sm sm:col-span-2">
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
import NameBox from '@/components/NameBox.vue'
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

// Function to fetch data based on the search query
const fetchData = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/search?nik=${searchQuery.value}`)
    filteredResults.value = response.data
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

// Function to handle search when searchQuery changes
const handleSearch = () => {
  if (searchQuery.value.length >= 2) {
    fetchData() // Call fetchData when searchQuery changes and meets the minimum length requirement
  } else {
    filteredResults.value = [] // Clear filteredResults if searchQuery is less than 2 characters
  }
}

// Function to populate search box with the clicked result's nik
// Function to populate search box with the clicked result's nik
const populateSearch = (result) => {
  searchQuery.value = result.nik
  handleSearch()
  setTimeout(() => {
    filteredResults.value = [] // Clear filteredResults after a short delay
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

// Watch for changes in searchQuery and trigger handleSearch
watch(searchQuery, () => {
  handleSearch()
})

// Fetch data on component mount
onMounted(() => {
  fetchData()
})
</script>

<style>
/* Add your component-specific styles here */
</style>
