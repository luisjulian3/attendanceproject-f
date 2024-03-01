<template>
  <div id="home-page" class="bg-layer-2 min-h-screen">
    <DashboardLayout>
      <div class="top-0 right-0">
        <NameBox />
      </div>
      <div class="flex justify-center items-center h-full">
        <div
          class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-auto my-auto mt-10"
        >
          <!-- Menu items go here -->
          <MenuItem title="Profile" icon="profile" path="/profile" />
          <MenuItem title="Attendance" icon="calendar" @click="checkBindStatus" />
          <MenuItem title="Attendance Register" icon="facerecognition" path="/attendregist" />
          <!-- Use flags to conditionally render menu items -->
          <MenuItem
            v-if="registerEmployeeFlag"
            title="Register Member"
            icon="register"
            path="/su/regist"
          />
          <MenuItem
            v-if="attendanceEmployeeLogFlag"
            title="Employee Attendance Log"
            icon="log"
            path="/su/attendancelog"
          />
          <MenuItem
            v-if="attendanceEmployeeLogFlag"
            title="Employee Profile Log"
            icon="log"
            path="/su/profilelog"
          />

          <MenuItem
            v-if="settingsEmployeeFlag"
            title="Change Member Settings"
            icon="settings"
            path="/su/updatemember"
          />
        </div>
      </div>
      <ErrorPopup v-if="errorMessage" :errorMessage="errorMessage" @close="errorMessage = ''" />
    </DashboardLayout>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import DashboardLayout from '@/components/DashboardLayout.vue'
import NameBox from '@/components/NameBox.vue'
import ErrorPopup from '@/components/ErrorMessagePopup.vue'
import authService from '@/services/authService.js'
import MenuItem from '@/components/MenuItem.vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import createPersistedState from 'vuex-persistedstate'

// Get router instance
const router = useRouter()

// Get the Vuex store instance
const store = useStore()

const errorMessage = ref('')

createPersistedState({})(store)

const registerEmployeeFlag = computed(() => store.state.registerEmployeeFlag)
const attendanceEmployeeLogFlag = computed(() => store.state.attendanceEmployeeLogFlag)
const settingsEmployeeFlag = computed(() => store.state.settingsEmployeeFlag)
const bindStatus = computed(() => store.state.bind_status)

const checkBindStatus = () => {
  if (!bindStatus.value) {
    // Show error component
    errorMessage.value = 'Bind status is false. Cannot access attendance page.'
    router.push('/home')
    console.log(errorMessage.value)
  } else {
    // Navigate to the attendance page
    router.push('/attendance')
  }
}
onMounted(async () => {
  try {
    const token = authService.getToken()
    console.log('TOKEN PROFILE: ', token)
    const response = await axios.get('http://127.0.0.1:8000/home/', {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    })
    const {
      full_name,
      bind_status,
      attendance_employee_log_flag,
      register_employee_flag,
      settings_employee_flag
    } = response.data.data
    console.log(full_name)
    store.commit('setFullName', full_name)
    store.commit('setBindStatus', bind_status)
    store.commit('setAttendanceEmployeeLogFlag', attendance_employee_log_flag)
    store.commit('setRegisterEmployeeFlag', register_employee_flag)
    store.commit('setSettingsEmployeeFlag', settings_employee_flag)
  } catch (fetchError) {
    console.error('Error fetching user data:')
  }
})
</script>

<style scoped>
/* Add any additional styles for the menu items or adjust based on your needs */
</style>
