<template>
  <div class="flex justify-end">
    <div class="bg-layer-3 shadow overflow-hidden rounded-lg mr-2 mt-4">
      <div class="mx-2">
        <p class="text-sm font-medium">{{ realTime }}</p>
        <p class="text-sm font-medium">{{ realDate }}</p>
      </div>
    </div>
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

const store = useStore()

const fullName = computed(() => store.state.full_name)
console.log(store.state.full_name)

const realTime = ref(getCurrentTime())

const realDate = ref(getCurrentDate())

function getCurrentTime() {
  const now = new Date()
  return now.toLocaleTimeString('en-US', { hour12: false })
}

function getCurrentDate() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const now = new Date()
  const dayOfWeek = days[now.getDay()]
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  return `${dayOfWeek}, ${day}/${month}/${year}`
}

const updateRealTime = () => {
  realTime.value = getCurrentTime()
}
setInterval(updateRealTime, 1000)

const updateRealDate = () => {
  realDate.value = getCurrentDate()
}
setInterval(updateRealDate, 60000)
</script>

<style scoped></style>
