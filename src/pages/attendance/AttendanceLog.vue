<template>
  <div id="attendance-log" class="bg-layer-2 min-h-screen">
    <DashboardLayout>
      <div class="top-0 right-0">
        <NameBox />
      </div>
      <div class="px-2 py-10 sm:px-6 lg:px-8">
        <div class="mt-2 pb-10 bg-layer-3 shadow overflow-hidden rounded-lg">
          <div class="container mx-auto">
            <h1 class="text-2 font-semibold my-4 ml-10">Attendance Logs</h1>
            <div class="overflow-x-auto">
              <table class="table-auto mx-2 text-5">
                <thead>
                  <tr>
                    <th class="border px-4 py-2 w-1/6">Day</th>
                    <th class="border px-4 py-2 w-1/6">Date</th>
                    <th class="border px-4 py-2 w-1/6">Status</th>
                    <th class="border px-4 py-2 w-1/6">Attendance In Time</th>
                    <th class="border px-4 py-2 w-1/6">Attendance Out Time</th>
                    <th class="border px-4 py-2 w-1/6">Working Hours</th>
                    <th class="border px-4 py-2 w-1/6">Location</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  <tr v-for="log in attendanceLogs" :key="log.id">
                    <td class="border px-4 py-2">{{ log.day }}</td>
                    <td class="border px-4 py-2">
                      {{ log.attendance_date }}
                    </td>
                    <td class="border px-4 py-2">{{ log.presence_status }}</td>
                    <td
                      class="border px-4 py-2"
                      :class="{ 'text-red-500': log.attendance_in_status === 'Late' }"
                    >
                      {{ log.attendance_in_time }}
                    </td>
                    <td class="border px-4 py-2">{{ log.attendance_out_time }}</td>
                    <td class="border px-4 py-2">{{ log.working_hours }}</td>
                    <td class="border px-4 py-2">{{ log.attendance_office }}</td>
                  </tr>
                </tbody>
              </table>
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
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const router = useRouter()
const isAuthenticated = authService.isTokenValid()
const attendanceLogs = ref([])
const store = useStore()

if (!isAuthenticated) {
  router.push('/')
}

console.log(store.state.nik)

const fetchAttendanceLogs = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/attendance-logs/?nik=${store.state.nik}`
    )
    console.log('Response:', response.data.data) // Access data key
    attendanceLogs.value = response.data.data // Access data key
  } catch (error) {
    console.error('Error fetching attendance logs:', error)
  }
}

onMounted(fetchAttendanceLogs)
</script>

<style scoped>
/* Add your custom scrollbar styles here */
</style>
