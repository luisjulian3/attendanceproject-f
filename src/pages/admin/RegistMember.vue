<template>
  <div id="admin-regist-page" class="bg-layer-2 min-h-screen">
    <DashboardLayout>
      <div class="top-0 right-0">
        <NameBox />
      </div>
      <div>
        <div class="px-2 py-10 sm:px-6 lg:px-8">
          <div class="mt-2 bg-layer-3 shadow overflow-hidden rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-2 leading-6 font-bold">Registration</h3>
              <p class="mt-1 max-w-2xl text-3">Registrasi for user</p>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <form @submit.prevent="submitForm" class="px-4">
                  <div class="form-group">
                    <label for="nik">NIK:</label>
                    <input
                      class="bg-layer-4 px-4 py-2 w-full rounded-md"
                      type="text"
                      id="nik"
                      v-model="formData.nik"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="full_name">Full Name:</label>
                    <input
                      class="bg-layer-4 px-4 py-2 w-full rounded-md"
                      type="text"
                      id="full_name"
                      v-model="formData.full_name"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="phone">Phone Number:</label>
                    <input
                      class="bg-layer-4 px-4 py-2 w-full rounded-md"
                      type="text"
                      id="phone"
                      v-model="formData.phone"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="date_of_birth">Date of Birth:</label>
                    <input
                      class="bg-layer-4 px-4 py-2 w-full rounded-md"
                      type="date"
                      id="date_of_birth"
                      v-model="formData.date_of_birth"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="place_of_birth">Place of Birth:</label>
                    <input
                      class="bg-layer-4 px-4 py-2 w-full rounded-md"
                      type="text"
                      id="place_of_birth"
                      v-model="formData.place_of_birth"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email:</label>
                    <input
                      class="bg-layer-4 px-4 py-2 w-full rounded-md"
                      type="email"
                      id="email"
                      v-model="formData.email"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password:</label>
                    <input
                      class="bg-layer-4 px-4 py-2 w-full rounded-md"
                      type="password"
                      id="password"
                      v-model="formData.password"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="role_id">Role ID:</label>
                    <select
                      class="bg-layer-4 px-4 py-2 w-full rounded-md"
                      id="role_id"
                      v-model="formData.role_id"
                      required
                    >
                      <option value="" disabled>Select Role</option>
                      <option value="0">Admin</option>
                      <option value="1">Employee</option>
                      <option value="2">Coordinator</option>
                      <option value="3">Junior Manager</option>
                      <option value="4">Senior Manager</option>
                      <option value="5">General Manager</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="dept_id">Department ID:</label>
                    <select
                      class="bg-layer-4 px-4 py-2 w-full rounded-md"
                      id="dept_id"
                      v-model="formData.dept_id"
                      required
                    >
                      <option value="" disabled>Select Department</option>
                      <option value="0">Admin</option>
                      <option value="1">IT & Tech Product</option>
                      <option value="2">Commercial</option>
                      <option value="3">Finance & Human Capital</option>
                      <option value="4">Operation</option>
                      <option value="5">Sales</option>
                    </select>
                  </div>
                  <form @submit.prevent="submitForm" class="px-4 mb-4 flex flex-col items-center">
                    <button
                      type="submit"
                      class="mt-4 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700"
                    >
                      Register
                    </button>
                  </form>
                </form>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <ErrorPopup v-if="errorMessage" :errorMessage="errorMessage" @close="errorMessage = ''" />
    </DashboardLayout>
  </div>
</template>

<script setup>
import DashboardLayout from '@/components/DashboardLayout.vue'
import NameBox from '@/components/NameBox.vue'
import ErrorPopup from '@/components/ErrorMessagePopup.vue'
import authService from '@/services/authService.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const errorMessage = ref('')

const isAuthenticated = authService.isTokenValid()
if (!isAuthenticated) {
  router.push('/')
}

const formData = ref({
  nik: '',
  full_name: '',
  phone: '',
  date_of_birth: '',
  place_of_birth: '',
  email: '',
  password: '',
  role_id: null,
  dept_id: null
})

const submitForm = async () => {
  if (
    !formData.value.nik ||
    !formData.value.full_name ||
    !formData.value.phone ||
    !formData.value.date_of_birth ||
    !formData.value.place_of_birth ||
    !formData.value.email ||
    !formData.value.password ||
    !formData.value.role_id ||
    !formData.value.dept_id
  ) {
    errorMessage.value = 'Please fill all the fields'
    return
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/register/', formData.value)
    console.log('Response:', response)

    if (response.status === 200) {
      console.log('Registration successful:', response.data.message)
      errorMessage.value = 'Registration successful'
      formData.value.nik = ''
      formData.value.full_name = ''
      formData.value.phone = ''
      formData.value.date_of_birth = ''
      formData.value.place_of_birth = ''
      formData.value.email = ''
      formData.value.password = ''
      formData.value.role_id = null
      formData.value.dept_id = null
    } else {
      console.error('Failed to register. Unexpected status:', response.status)
      errorMessage.value = 'Failed to register. Please try again.'
    }
  } catch (error) {
    console.error('Failed to register:', error)
    if (error.response && error.response.status === 400) {
      console.log('Error response data:', error.response.data)
      errorMessage.value = error.response.data.message

      formData.value.nik = ''
      formData.value.full_name = ''
      formData.value.phone = ''
      formData.value.date_of_birth = ''
      formData.value.place_of_birth = ''
      formData.value.email = ''
      formData.value.password = ''
      formData.value.role_id = null
      formData.value.dept_id = null
    } else {
      errorMessage.value = 'Failed to register. Please try again later.'
    }
  }
}
</script>

<style scoped>
</style>
