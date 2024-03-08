<template>
  <div id="attendance-log" class="bg-layer-2 min-h-screen">
    <DashboardLayout>
      <div class="top-0 right-0">
        <NameBox />
      </div>
      <!--FILTER-->
      <div class="px-2 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center">
          <label for="nik" class="mr-2">Search by NIK:</label>
          <input
            type="text"
            id="nik"
            v-model="searchNIK"
            class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
          />
          <input
            type="date"
            v-model="startDate"
            class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
          />

          <!-- Add end date input -->
          <input
            type="date"
            v-model="endDate"
            class="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
          />
          <button
            @click="fetchAttendanceLogsByNIK"
            class="ml-2 px-4 py-1 bg-blue-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
      <!--TABLE-->
      <div class="px-2 py-10 sm:px-6 lg:px-8">
        <div class="mt-2 pb-10 bg-layer-3 shadow overflow-hidden rounded-lg">
          <div class="container mx-auto">
            <div class="flex flex-wrap justify-between">
              <div>
                <h1 class="text-2 font-semibold my-4 ml-10">Attendance Logs</h1>
              </div>
              <div class="text-3 font-semibold my-4 ml-10 mr-4">
                <div>Rekap Absensi</div>
                <div>
                  <p class="text-[14px]">Absent : {{ attendanceStat.PRS }}</p>
                </div>
                <div>
                  <p class="text-[14px]">Leave Early : {{ attendanceStat.AWT }}</p>
                </div>
                <div class="flex items-center mt-4">
                  <button
                    @click="downloadCSV"
                    class="ml-2 px-4 py-1 bg-green-500 text-white rounded-md"
                  >
                    Download CSV
                  </button>
                </div>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="table-auto mx-2 text-5">
                <!-- Table Headers -->
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
                <!-- Table Body -->
                <tbody class="text-center">
                  <tr v-for="log in filteredAttendanceLogs" :key="log.id">
                    <td class="border px-4 py-2">{{ log.day }}</td>
                    <td class="border px-4 py-2">{{ log.attendance_date }}</td>
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
import { ref, onMounted, computed } from 'vue'

const router = useRouter()
const isAuthenticated = authService.isTokenValid()
const attendanceLogs = ref([])
const attendanceStat = ref('')
const searchNIK = ref('')
const startDate = ref('')
const endDate = ref('')

if (!isAuthenticated) {
  router.push('/')
}

const fetchAttendanceLogs = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/attendance-logs/?nik=${searchNIK.value}&start_date=${startDate.value}&end_date=${endDate.value}`
    )
    attendanceLogs.value = response.data.data
    attendanceStat.value = response.data.presence_status_count
    console.log(response.data.presence_status_count)
  } catch (error) {
    console.error('Error fetching attendance logs:', error)
  }
}

// Filtered attendance logs based on searchNIK value
const filteredAttendanceLogs = computed(() => {
  if (!searchNIK.value) {
    return attendanceLogs.value
  } else {
    const searchValue = searchNIK.value.toString().toLowerCase() // Convert to string
    return attendanceLogs.value.filter((log) => {
      const nik = log.nik.toString().toLowerCase() // Convert to string
      return nik.includes(searchValue)
    })
  }
})

const fetchAttendanceLogsByNIK = async () => {
  fetchAttendanceLogs()
}

const downloadCSV = () => {
  const csvContent = generateCSVContent(attendanceLogs.value)

  // Create a Blob containing the CSV data
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })

  // Create a temporary anchor element
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(blob)

  // Set the filename for the download
  link.download = 'attendance_logs.csv'

  // Append the anchor element to the document
  document.body.appendChild(link)

  // Trigger a click on the anchor element to start the download
  link.click()

  // Remove the anchor element from the document
  document.body.removeChild(link)
}

const generateCSVContent = (data) => {
  const header = [
    'Day',
    'Date',
    'Status',
    'Attendance In Time',
    'Attendance Out Time',
    'Working Hours',
    'Location'
  ]

  // Convert data to CSV format
  const csvRows = [header.join(',')]
  data.forEach((log) => {
    const values = [
      log.day,
      log.attendance_date,
      log.presence_status,
      log.attendance_in_time,
      log.attendance_out_time,
      log.working_hours,
      log.attendance_office
    ]
    csvRows.push(values.join(','))
  })

  return csvRows.join('\n')
}

onMounted(fetchAttendanceLogs)
</script>

<style scoped>
/* Add your custom scrollbar styles here */
</style>
