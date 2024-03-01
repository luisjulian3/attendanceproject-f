<template>
  <div id="attendance-page" class="bg-layer-2 min-h-screen">
    <DashboardLayout>
      <div class="top-0 right-0">
        <NameBox />
      </div>
      <div class="mt-10 px-2 py-10 sm:px-6 lg:px-8">
        <div class="mt-2 bg-layer-3 shadow overflow-hidden rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-2 leading-6 font-medium">Attendance IN</h3>
            <p class="mt-1 max-w-2xl text-3">
              Melakukan Input Foto Wajah Untuk Proses Training Wajah
            </p>
          </div>
          <div class="border-t border-gray-200 flex justify-center">
            <!-- Camera layout moved here -->
            <div id="app" class="web-camera-container flex flex-col justify-center items-center">
              <div class="camera-button">
                <button
                  type="button"
                  class="button is-rounded"
                  :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }"
                  @click="toggleCamera"
                >
                  <span v-if="!isCameraOpen" class="text-3">Open Camera</span>
                  <span v-else class="text-3">Close Camera</span>
                </button>
              </div>
              <div
                v-show="isCameraOpen && isLoading"
                class="camera-loading flex justify-center items-center"
              >
                <ul class="loader-circle">
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div
                v-if="isCameraOpen"
                v-show="!isLoading"
                class="camera-box flex justify-center items-center"
                :class="{ flash: isShotPhoto }"
              >
                <div class="camera-shutter" :class="{ flash: isShotPhoto }"></div>
                <video
                  v-show="!isPhotoTaken"
                  ref="camera"
                  :width="450"
                  :height="337.5"
                  autoplay
                  class="border-8 border-[#E8E8E8] rounded"
                ></video>
                <canvas
                  v-show="isPhotoTaken"
                  id="photoTaken"
                  ref="canvas"
                  :width="450"
                  :height="337.5"
                  class="border-8 border-[#145374] rounded"
                ></canvas>
              </div>
              <div
                v-if="isCameraOpen && !isLoading"
                class="camera-shoot flex justify-center items-center"
              >
                <button type="button" class="button" @click="takePhoto">
                  <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png" />
                </button>
              </div>
              <div
                v-if="isPhotoTaken && isCameraOpen"
                class="camera-download flex justify-center items-center"
              >
                <a
                  id="downloadPhoto"
                  download="my-photo.jpg"
                  class="button"
                  role="button"
                  @click="downloadImage"
                >
                  Download
                </a>
              </div>
            </div>
            <!-- End of Camera layout -->
          </div>
          <div class="flex justify-center my-2">
            <!-- Centering the submit button -->
            <button @click="submitAttendance" class="button text-3 bg-layer-4 px-4 py-2 rounded-lg">
              Submit
            </button>
          </div>
        </div>
      </div>
      <ErrorPopup v-if="errorMessage" :errorMessage="errorMessage" @close="errorMessage = ''" />
    </DashboardLayout>
  </div>
</template>

<script setup>
import ErrorPopup from '@/components/ErrorMessagePopup.vue'
import NameBox from '@/components/NameBox.vue'
import DashboardLayout from '@/components/DashboardLayout.vue'
import authService from '@/services/authService.js'
import * as faceapi from 'face-api.js'
import { useRouter } from 'vue-router'
import { ref, onMounted, watchEffect } from 'vue'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const isAuthenticated = authService.isTokenValid()

const isCameraOpen = ref(false)
const isPhotoTaken = ref(false)
const isShotPhoto = ref(false)
const isLoading = ref(false)
const nik = store.state.nik
const latitude = ref(null)
const longitude = ref(null)
const errorMessage = ref('')

const toggleCamera = () => {
  if (isCameraOpen.value) {
    isCameraOpen.value = false
    isPhotoTaken.value = false
    isShotPhoto.value = false
    stopCameraStream()
    // Clear any existing face detection canvas
    const canvas = document.querySelector('canvas')
    if (canvas) {
      canvas.remove()
    }
  } else {
    isCameraOpen.value = true
    createCameraElement()
  }
}

const loadFaceDetectionModel = async () => {
  console.log('Loading face detection model...')
  await faceapi.nets.tinyFaceDetector.loadFromUri('/weights')
  await faceapi.nets.faceLandmark68Net.loadFromUri('/weights')
  await faceapi.nets.faceRecognitionNet.loadFromUri('/weights')
  console.log('Face detection model loaded successfully.')
}

const initializeFaceDetection = async () => {
  console.log('Initializing face detection...')
  await loadFaceDetectionModel()
  const video = document.querySelector('#app video')
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
  }, 100)
}

const createCameraElement = async () => {
  isLoading.value = true
  const constraints = { audio: false, video: true }
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    isLoading.value = false
    const camera = document.querySelector('#app video')
    if (camera) {
      camera.srcObject = stream
      camera.onloadedmetadata = () => {
        initializeFaceDetection()
      }
    } else {
      console.error('Video element not found in the document')
    }
  } catch (error) {
    isLoading.value = false
    console.error('Error accessing camera:', error)
    alert("May the browser didn't support or there is some errors.")
  }
}
const stopCameraStream = () => {
  const tracks = document.querySelector('#app video').srcObject.getTracks()
  tracks.forEach((track) => track.stop())
}

const takePhoto = () => {
  if (!isPhotoTaken.value) {
    isShotPhoto.value = true
    const FLASH_TIMEOUT = 50
    setTimeout(() => {
      isShotPhoto.value = false
    }, FLASH_TIMEOUT)
  }
  isPhotoTaken.value = !isPhotoTaken.value
  const context = document.querySelector('#app canvas').getContext('2d')
  context.drawImage(document.querySelector('#app video'), 0, 0, 450, 337.5)
}

if (!isAuthenticated) {
  router.push('/')
}

const submitAttendance = async () => {
  try {
    // Check if latitude and longitude are available
    if (latitude.value !== null && longitude.value !== null) {
      // Convert image data to a Blob object
      const canvas = document.getElementById('photoTaken')
      const imageFile = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'))

      // Replace '872613' with the actual value of the nik parameter

      // Create FormData object and append image, nik, latitude, and longitude
      const formData = new FormData()
      formData.append('image', imageFile)
      formData.append('nik', nik)
      formData.append('latitude', latitude.value)
      formData.append('longitude', longitude.value)

      // Make POST request to the API endpoint
      const response = await fetch('http://127.0.0.1:8000/attendancein/', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        // Handle successful response
        const data = await response.json()
        errorMessage.value = data.message
        isCameraOpen.value = false
        isPhotoTaken.value = false
        isShotPhoto.value = false
        stopCameraStream()
      } else {
        // Handle error response
        const errorData = await response.json()
        console.error('Error:', errorData.message)
        // Set error message to display in the view
        errorMessage.value = errorData.message
        isCameraOpen.value = false
        isPhotoTaken.value = false
        isShotPhoto.value = false
        stopCameraStream()
      }
    } else {
      console.error('Latitude and longitude are not available.')
    }
  } catch (error) {
    console.error('Error:', error.message)
    // Set error message to display in the view
    errorMessage.value = 'An error occurred while submitting attendance.'
  }
}

// Get user's location when the component is mounted
onMounted(() => {
  if (navigator.geolocation) {
    // Initially get the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        latitude.value = position.coords.latitude
        longitude.value = position.coords.longitude
        console.log('lat', latitude.value)
        console.log('long', longitude.value)
      },
      (error) => {
        console.error('Error getting user location:', error)
      }
    )

    // Watch for changes in geolocation continuously
    watchEffect(() => {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          latitude.value = position.coords.latitude
          longitude.value = position.coords.longitude
        },
        (error) => {
          console.error('Error watching user location:', error)
        }
      )

      // Stop watching when the component is unmounted
      return () => {
        navigator.geolocation.clearWatch(watchId)
      }
    })
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
  console.log('Component mounted.')
})
</script>
