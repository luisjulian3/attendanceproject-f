<template>
  <div>
    <!-- Sidebar -->
    <div class="bg-layer-2 p-4 flex flex-col h-full w-64 fixed top-0 left-0 z-10">
      <!-- Your dashboard content goes here -->
      <div>
        <h2 class="text-[40px] font-semibold mb-4 ml-14">XYZ</h2>
        <!-- Add links or buttons for dashboard options -->
        <router-link
          :to="{ name: 'Home' }"
          class="flex items-center py-2 px-4 hover:bg-gray-600 rounded-lg"
          :class="{ 'bg-layer-4': isRouteActive('Home') }"
        >
          <svg
            width="35"
            height="35"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M14 20V14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14V20M10.9833 3.60011L4.98335 7.14177C4.37395 7.50149 4 8.15646 4 8.8641V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V8.8641C20 8.15646 19.6261 7.50149 19.0167 7.14177L13.0167 3.60011C12.3894 3.22988 11.6106 3.22988 10.9833 3.60011Z"
                stroke="#E8E8E8"
                stroke-width="1.56"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
          <p class="text-1 ml-4">Home</p>
        </router-link>
        <router-link
          :to="{ name: 'Dashboard' }"
          class="flex items-center py-2 px-4 hover:bg-gray-600 rounded-lg"
          :class="{ 'bg-layer-4': isRouteActive('Dashboard') }"
        >
          <svg
            width="35"
            height="35"
            viewBox="-0.96 -0.96 25.92 25.92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M3 8.976C3 4.05476 4.05476 3 8.976 3H15.024C19.9452 3 21 4.05476 21 8.976V15.024C21 19.9452 19.9452 21 15.024 21H8.976C4.05476 21 3 19.9452 3 15.024V8.976Z"
                stroke="#E8E8E8"
                stroke-width="1.8"
              ></path>
              <path
                d="M21 9L3 9"
                stroke="#E8E8E8"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M9 21L9 9"
                stroke="#E8E8E8"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
          <p class="text-1 ml-4">Dashboard</p>
        </router-link>
        <!-- Add more dashboard options as needed -->
        <router-link
          @click="checkBindStatus"
          :to="{ name: 'AttendancePage' }"
          class="flex items-center py-2 px-4 hover:bg-gray-600 rounded-lg"
          :class="{ 'bg-layer-4': isRouteActive('AttendancePage') }"
        >
          <svg
            width="35"
            height="35"
            viewBox="-1.68 -1.68 27.36 27.36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#000000"
            stroke-width="0.00024000000000000003"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke="#CCCCCC"
              stroke-width="0.144"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 1C6.44772 1 6 1.44772 6 2V3H5C3.34315 3 2 4.34315 2 6V20C2 21.6569 3.34315 23 5 23H13.101C12.5151 22.4259 12.0297 21.7496 11.6736 21H5C4.44772 21 4 20.5523 4 20V11H20V11.2899C20.7224 11.5049 21.396 11.8334 22 12.2547V6C22 4.34315 20.6569 3 19 3H18V2C18 1.44772 17.5523 1 17 1C16.4477 1 16 1.44772 16 2V3H8V2C8 1.44772 7.55228 1 7 1ZM16 6V5H8V6C8 6.55228 7.55228 7 7 7C6.44772 7 6 6.55228 6 6V5H5C4.44772 5 4 5.44772 4 6V9H20V6C20 5.44772 19.5523 5 19 5H18V6C18 6.55228 17.5523 7 17 7C16.4477 7 16 6.55228 16 6Z"
                fill="#E8E8E8"
              ></path>
              <path
                d="M17 16C17 15.4477 17.4477 15 18 15C18.5523 15 19 15.4477 19 16V17.703L19.8801 18.583C20.2706 18.9736 20.2706 19.6067 19.8801 19.9973C19.4896 20.3878 18.8564 20.3878 18.4659 19.9973L17.2929 18.8243C17.0828 18.6142 16.9857 18.3338 17.0017 18.0588C17.0006 18.0393 17 18.0197 17 18V16Z"
                fill="#E8E8E8"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M24 18C24 21.3137 21.3137 24 18 24C14.6863 24 12 21.3137 12 18C12 14.6863 14.6863 12 18 12C21.3137 12 24 14.6863 24 18ZM13.9819 18C13.9819 20.2191 15.7809 22.0181 18 22.0181C20.2191 22.0181 22.0181 20.2191 22.0181 18C22.0181 15.7809 20.2191 13.9819 18 13.9819C15.7809 13.9819 13.9819 15.7809 13.9819 18Z"
                fill="#E8E8E8"
              ></path>
            </g>
          </svg>
          <p class="text-1 ml-4">Attendance</p>
        </router-link>
      </div>

      <!-- Logout button -->
      <button
        @click="logout"
        class="flex items-center mt-[400px] py-2 px-4 bg-layer-4 rounded-lg hover:bg-gray-600 w-auto h-12"
      >
        <svg
          width="60"
          height="60"
          viewBox="-158.72 -158.72 829.44 829.44"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <title>ionicons-v5-o</title>
            <path
              d="M304,336v40a40,40,0,0,1-40,40H104a40,40,0,0,1-40-40V136a40,40,0,0,1,40-40H256c22.09,0,48,17.91,48,40v40"
              style="
                fill: none;
                stroke: #e8e8e8;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 32px;
              "
            ></path>
            <polyline
              points="368 336 448 256 368 176"
              style="
                fill: none;
                stroke: #e8e8e8;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 32px;
              "
            ></polyline>
            <line
              x1="176"
              y1="256"
              x2="432"
              y2="256"
              style="
                fill: none;
                stroke: #e8e8e8;
                stroke-linecap: round;
                stroke-linejoin: round;
                stroke-width: 32px;
              "
            ></line>
          </g>
        </svg>
        <p class="text-1 ml-4">Logout</p>
      </button>
    </div>

    <!-- Main content -->
    <div class="ml-64 relative z-0">
      <!-- Adjust margin-left to match the sidebar width -->
      <div class="">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import VueCookies from 'vue-cookies'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { ref } from 'vue'
import createPersistedState from 'vuex-persistedstate'

const router = useRouter()

// Get the Vuex store instance
const store = useStore()

const errorMessage = ref('')

// Plugin to persist Vuex state
createPersistedState({})(store)

const bindStatus = computed(() => store.state.bind_status)

const logout = () => {
  VueCookies.remove('token') // Clear authentication token
  router.push('/') // Redirect to the login page
}

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

const isRouteActive = (routeName) => {
  console.log(router.currentRoute.value.name)
  console.log(routeName)
  return router.currentRoute.value.name === routeName
}
</script>

<style scoped>
/* Additional styles for the fixed top bar */
body {
  margin: 0;
  /* Remove default margin to prevent content from being pushed down */
}
</style>
