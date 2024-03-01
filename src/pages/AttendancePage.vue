<template>
  <div id="attendance-page" class="bg-layer-2 min-h-screen">
    <DashboardLayout>
      <div class="top-0 right-0">
        <NameBox />
      </div>
      <div class="flex justify-center items-center h-full">
        <div
          class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-auto my-auto mt-10"
        >
          <!-- Menu items go here -->
          <MenuItem title="Attendance IN" icon="circle-in" path="/attendance/in" />
          <MenuItem title="Attendance Out" icon="circle-out" path="/attendance/out" />
          <MenuItem title="Attendance Log" icon="log" path="/attendance/log" />
        </div>
      </div>
    </DashboardLayout>
  </div>
</template>

<script setup>
import DashboardLayout from '@/components/DashboardLayout.vue'
import NameBox from '@/components/NameBox.vue'
import authService from '@/services/authService.js'
import MenuItem from '@/components/MenuItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isAuthenticated = authService.isTokenValid()

if (!isAuthenticated) {
  router.push('/')
}
</script>

<style scoped>
/* Add any additional styles for the menu items or adjust based on your needs */
</style>
