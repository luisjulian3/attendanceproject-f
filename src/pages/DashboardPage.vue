<template>
  <div id="profile-page" class="bg-layer-2 min-h-screen">
    <DashboardLayout>
      <div class="top-0 right-0">
        <NameBox />
      </div>
      <div class="px-2 py-10 sm:px-6 lg:px-8">
        <div v-if="userData" class="mt-2 bg-layer-3 shadow overflow-hidden rounded-lg">
          <!-- Personal Information Section -->
          <div class="px-4 py-5 sm:px-6">
            <div class="flex flex-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="25"
                viewBox="0 0 50 50"
              >
                <path
                  d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z"
                ></path>
              </svg>
              <h3 class="text-4 leading-6 font-medium">Employee Data</h3>
            </div>
          </div>
          <div class="border-t border-gray-200 px-4 py-4 sm:px-6">
            <h3 class="text-3 leading-6 font-medium ml-5">{{ userData.full_name }}</h3>
            <div class="mt-2 flex flex-wrap items-center">
              <p class="bg-layer-4 rounded-lg p-3 mr-4">Role: {{ userData.role }}</p>
              <p class="bg-layer-4 rounded-lg p-3 mr-4">Phone Number: {{ userData.phone }}</p>
              <p class="bg-layer-4 rounded-lg p-3">Email: {{ userData.email }}</p>
            </div>
            <div class="flex mt-5">
              <div class="bg-layer-4 rounded-lg p-3 mr-4">
                <p class="mb-2">Avg Check In Time</p>
                <p class="mt-2">{{ userData.average_attendance_in_time }}</p>
              </div>
              <div class="bg-layer-4 rounded-lg p-3 mr-4">
                <p class="mb-2">Avg Check Out Time</p>
                <p class="mt-2">{{ userData.average_attendance_out_time }}</p>
              </div>
              <div class="bg-layer-4 rounded-lg p-3">
                <p class="mb-2">Avg Working Hours</p>
                <p class="mt-2">{{ userData.average_working_hours }}</p>
              </div>
            </div>
          </div>
          <div class="px-4 py-2 sm:px-6"></div>
        </div>
        <div v-if="userData" class="mt-10 bg-layer-3 shadow overflow-hidden rounded-lg">
          <!-- Employee Last Attendance Section -->
          <div class="px-4 py-5 sm:px-6">
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="25"
                viewBox="0 0 50 50"
              >
                <path
                  d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z"
                ></path>
              </svg>
              <h3 class="text-4 leading-6 font-medium ml-2">Employee Last Attendance</h3>
            </div>
            <p class="mt-1 max-w-2xl text-sm">
              ---------------------------------------------------------------------------------------------------
            </p>
          </div>
          <div class="flex flex-wrap">
            <div
              v-for="attendanceLog in userAtt"
              :key="attendanceLog.id"
              class="flex-initial px-4 mb-6 sm:w-1/3"
            >
              <div class="bg-layer-4 px-4 py-4 rounded-lg text-sm">
                <div class="flex flex-col">
                  <div class="flex justify-between">
                    <div class="text-[12px]">
                      {{ getDayFromDate(attendanceLog.attendance_date) }},
                      {{ attendanceLog.attendance_date }}
                    </div>
                    <div>{{ getStatus(attendanceLog.presence_status) }}</div>
                  </div>
                  <div class="flex justify-between mt-4">
                    <div class="">
                      <p>Check-in Time</p>
                    </div>
                    <div>
                      <p>Check-out Time</p>
                    </div>
                  </div>
                  <div class="flex justify-between">
                    <div>
                      <p>{{ attendanceLog.attendance_in_time }}</p>
                    </div>
                    <div>
                      <p>{{ attendanceLog.attendance_out_time }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="userData" class="mt-10 bg-layer-3 shadow overflow-hidden rounded-lg">
          <!-- Information Section -->
          <div class="px-4 py-5 sm:px-6">
            <div class="flex flex-wrap">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="40"
                height="25"
                viewBox="0 0 50 50"
              >
                <path
                  d="M 12.8125 2 C 12.335938 2.089844 11.992188 2.511719 12 3 L 12 47 C 11.996094 47.359375 12.1875 47.691406 12.496094 47.871094 C 12.804688 48.054688 13.1875 48.054688 13.5 47.875 L 25 41.15625 L 36.5 47.875 C 36.8125 48.054688 37.195313 48.054688 37.503906 47.871094 C 37.8125 47.691406 38.003906 47.359375 38 47 L 38 3 C 38 2.449219 37.550781 2 37 2 L 13 2 C 12.96875 2 12.9375 2 12.90625 2 C 12.875 2 12.84375 2 12.8125 2 Z M 14 4 L 36 4 L 36 45.25 L 25.5 39.125 C 25.191406 38.945313 24.808594 38.945313 24.5 39.125 L 14 45.25 Z"
                ></path>
              </svg>
              <h3 class="text-4 leading-6 font-medium">Employee Message</h3>
            </div>
          </div>
          <div class="border-t border-gray-200 px-4 py-4 sm:px-6">
            <div class="flex items-center ml-10">
              <!-- Warning Icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-yellow-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.22-1.95 1.165-3.04L13.165 4.96c-1.056-1.09-2.916-1.09-3.972 0L2.835 15.96c-1.054 1.09-.375 3.04 1.165 3.04z"
                />
              </svg>
              <!-- Message -->
              <p>{{ message }}</p>
            </div>
          </div>
          <div class="px-4 py-2 sm:px-6"></div>
        </div>

        <div v-else class="mt-6">Loading...</div>
      </div>
    </DashboardLayout>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DashboardLayout from '@/components/DashboardLayout.vue'
import NameBox from '@/components/NameBox.vue'
import axios from 'axios'
import authService from '@/services/authService.js'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const store = useStore()
const router = useRouter()
const userData = ref(null)
const userAtt = ref(null)
const message = ref('')
let error

const isAuthenticated = authService.isTokenValid()
if (!isAuthenticated) {
  router.push('/')
}

const getStatus = (presentStatus) => {
  console.log(presentStatus)
  if (presentStatus === 'LE') {
    return 'Leave Early'
  } else if (presentStatus === 'AWT') {
    return 'Await'
  } else {
    // Handle other cases if needed
    return presentStatus // Return the original value if no match is found
  }
}

const getDayFromDate = (attendanceDate) => {
  // Create a new Date object from the attendance date string
  const dateObj = new Date(attendanceDate)

  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = dateObj.getDay()

  // Define an array of day names
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

  // Return the day name corresponding to the day of the week
  return days[dayOfWeek]
}

const bindStatus = computed(() => store.state.bind_status)

const checkBindStatus = () => {
  if (!bindStatus.value) {
    message.value =
      'If you havent registered your attendance yet, please register on the attendance register menu'
  } else {
    message.value = 'no message'
  }
}

onMounted(async () => {
  try {
    const token = authService.getToken()
    console.log('TOKEN PROFILE: ', token)
    const response = await axios.get('http://127.0.0.1:8000/dashboard/', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    userData.value = response.data.user
    userAtt.value = response.data.attendance_logs
    console.log(userAtt.value)
    console.log(userData.value)
    checkBindStatus()
  } catch (fetchError) {
    error = fetchError
    console.error('Error fetching user data:', error)
  }
})
</script>
