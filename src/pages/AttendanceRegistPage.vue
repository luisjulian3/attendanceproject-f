<template>
  <div id="attendance-page" class="bg-layer-2 min-h-screen">
    <DashboardLayout>
      <div class="top-0 right-0">
        <NameBox />
      </div>
      <div class="mt-10 px-2 py-10 sm:px-6 lg:px-8">
        <div class="mt-2 bg-layer-3 shadow overflow-hidden rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-2 leading-6 font-medium">Attendance Register</h3>
            <p class="mt-1 max-w-2xl text-3">
              Melakukan Input Foto Wajah Untuk Proses Training Wajah
            </p>
          </div>
          <div class="border-t border-gray-200 flex justify-center">
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
          </div>
          <div class="flex justify-center my-2">
            <button @click="submitPhoto" class="button text-3 bg-layer-4 px-4 py-2 rounded-lg">
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
import DashboardLayout from '@/components/DashboardLayout.vue'
import ErrorPopup from '@/components/ErrorMessagePopup.vue'
import NameBox from '@/components/NameBox.vue'
import authService from '@/services/authService.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from 'vue'

const store = useStore()
const router = useRouter()
const isAuthenticated = authService.isTokenValid()
const nik = store.state.nik
const errorMessage = ref('')

if (!isAuthenticated) {
  router.push('/')
}

const isCameraOpen = ref(false)
const isPhotoTaken = ref(false)
const isShotPhoto = ref(false)
const isLoading = ref(false)

const toggleCamera = () => {
  if (isCameraOpen.value) {
    isCameraOpen.value = false
    isPhotoTaken.value = false
    isShotPhoto.value = false
    stopCameraStream()
  } else {
    isCameraOpen.value = true
    createCameraElement()
  }
}

const createCameraElement = async () => {
  isLoading.value = true
  const constraints = {
    audio: false,
    video: {
      facingMode: 'user',
      zoom: 100
    }
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    isLoading.value = false
    const camera = document.querySelector('#app video')
    if (camera) {
      camera.srcObject = stream
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

const downloadImage = () => {
  const download = document.getElementById('downloadPhoto')
  const canvas = document
    .getElementById('photoTaken')
    .toDataURL('image/jpeg')
    .replace('image/jpeg', 'image/octet-stream')
  download.setAttribute('href', canvas)
}

const submitPhoto = () => {
  const formData = new FormData()
  formData.append('nik', nik)
  console.log('nik from regist submit photo :', nik)
  const canvas = document.getElementById('photoTaken')
  const dataURL = canvas.toDataURL('image/jpeg')
  const blob = dataURLtoBlob(dataURL)
  formData.append('image', blob, 'photo.jpg')

  fetch('http://127.0.0.1:8000/trainface/', {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      if (response.ok) {
        console.log('Photo submitted successfully')
        errorMessage.value = 'Photo submitted successfully'
        isCameraOpen.value = false
        isPhotoTaken.value = false
        isShotPhoto.value = false
        stopCameraStream()
        store.dispatch('setBindStatus', true)
      } else {
        console.error('Failed to submit photo')
        errorMessage.value = 'Failed to submit photo, please try again'
        isCameraOpen.value = false
        isPhotoTaken.value = false
        isShotPhoto.value = false
        stopCameraStream()
      }
    })
    .catch((error) => {
      console.error('Error submitting photo:', error)
      errorMessage.value = 'Error submitting photo'
    })
}

const dataURLtoBlob = (dataURL) => {
  const byteString = atob(dataURL.split(',')[1])
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([ab], { type: mimeString })
  return blob
}
</script>

<style scoped>
</style>
