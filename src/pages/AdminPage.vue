<template>
  <div id="home-page" class="bg-layer min-h-screen">
    <div>
      <DashboardLayout> </DashboardLayout>
    </div>
    <div class="flex justify-center items-center h-full">
      <div
        class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-auto my-auto mt-10"
      >
        <MenuItem title="Register Member" icon="user" path="/admin/regist" />
        <MenuItem title="Change Member Settings" icon="cog" />
        <MenuItem
          title="Employee Attendance Log"
          icon="clipboard-list"
          path="/admin/attendancelog"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import DashboardLayout from '@/components/DashboardLayout.vue'
import authService from '@/services/authService.js'
import MenuItem from '@/components/MenuItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isAuthenticated = authService.isTokenValid()

if (!isAuthenticated) {
  router.push('/')
}
</script>

<style scoped></style>
