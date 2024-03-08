<template>
  <div class="flex justify-end mr-32">
    <!-- Box for real-time and real date -->
    <div class="bg-layer-3 shadow overflow-hidden rounded-lg mr-2 mt-4">
      <div class="mx-2">
        <p class="text-sm font-medium">{{ realTime }}</p>
        <p class="text-sm font-medium">{{ realDate }}</p>
      </div>
    </div>

    <!-- Box for the name -->
    <div
      class="bg-layer-3 shadow overflow-hidden rounded-lg mr-10 mt-4 flex items-center justify-center"
    >
      <div class="mx-2">
        <h3 class="text-lg leading-6 font-medium">{{ fullName }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

// Get the Vuex store instance
const store = useStore()

// Define a computed property to get the full name from the store
const fullName = computed(() => store.state.full_name) // Corrected to store.state.full_name
console.log(store.state.full_name)

// Function to get real-time in the format HH:MM:SS
const realTime = ref(getCurrentTime())

// Function to get real date in the format "Day, DD/MM/YYYY"
const realDate = ref(getCurrentDate())

// Function to get current time in HH:MM:SS format
function getCurrentTime() {
  const now = new Date()
  return now.toLocaleTimeString('en-US', { hour12: false })
}

// Function to get current date in "Day, DD/MM/YYYY" format
function getCurrentDate() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const now = new Date()
  const dayOfWeek = days[now.getDay()]
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  return `${dayOfWeek}, ${day}/${month}/${year}`
}

// Update real-time value every second
const updateRealTime = () => {
  realTime.value = getCurrentTime()
}
setInterval(updateRealTime, 1000) // Update every second

// Update real date value every minute
const updateRealDate = () => {
  realDate.value = getCurrentDate()
}
setInterval(updateRealDate, 60000) // Update every minute
</script>

<style scoped>
/* Add any additional styles for the component */
</style>
