<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
  >
    <div class="bg-white p-8 rounded-lg shadow-md">
      <p class="mb-4">{{ message }}</p>
      <div class="flex justify-between">
        <button @click="confirm" class="bg-blue-500 px-4 py-2 rounded-md mr-2">
          {{ confirmText }}
        </button>
        <button @click="cancel" class="bg-gray-300 px-4 py-2 rounded-md">{{ cancelText }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'

const show = ref(false)
const { emit } = getCurrentInstance()

const confirm = () => {
  show.value = false
  // Emit a custom event to notify the parent component
  emit('confirmed')
}

const cancel = () => {
  show.value = false
}

const message = 'Are you sure you want to submit the form?'
const confirmText = 'Yes'
const cancelText = 'No'
</script>
