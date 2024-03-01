<template>
  <div
    v-if="errorMessage"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-layer-2 p-4 rounded-lg shadow flex flex-col items-center">
      <!-- Added flex and items-center -->
      <p class="mb-2">{{ errorMessage }}</p>
      <button @click="closePopup" class="bg-layer-3 py-2 px-4 rounded inline-block mt-4">
        Close
      </button>
      <!-- Added mt-4 for margin top -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      required: true
    }
  },
  methods: {
    closePopup() {
      // Emit an event to notify the parent component to close the pop-up
      this.$emit('close')
    }
  }
}
</script>
