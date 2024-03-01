<template>
  <!-- Wrap the entire content with router-link -->
  <router-link
    :to="linkTo"
    class="bg-layer-3 rounded-[25px] shadow-md flex flex-col items-center justify-center"
  >
    <!-- Icon -->
    <div class="text-3xl mb-2 h-48 w-60 flex items-center justify-center">
      <!-- Using flex and justify-center to horizontally center the icon -->
      <img :src="iconSrc" alt="Icon" class="w-36 h-36" />
    </div>
    <!-- Title -->
    <div
      class="title-container flex items-center justify-center rounded-b-[25px] w-full py-2 bg-layer-4 text-lg font-semibold"
    >
      {{ title }}
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'
import calendarIcon1 from '@/assets/icons/calendar.png'
import calendarIcon2 from '@/assets/icons/calender2.png'
import circleInIcon from '@/assets/icons/circle-in.png'
import circleOutIcon from '@/assets/icons/circle-out.png'
import faceRecognitionIcon from '@/assets/icons/facerecognition.png'
import logIcon from '@/assets/icons/log.png'
import profileIcon from '@/assets/icons/profile.png'
import registerIcon from '@/assets/icons/register.png'
import settingsIcon from '@/assets/icons/settings.png'

const { title, icon, path } = defineProps(['title', 'icon', 'path'])

// Use path prop to generate the link destination
const linkTo = path || '/'

// Load the appropriate image based on the icon prop
let iconSrc = null
switch (icon) {
  case 'calendar':
    iconSrc = calendarIcon1
    break
  case 'calender2':
    iconSrc = calendarIcon2
    break
  case 'circle-in':
    iconSrc = circleInIcon
    break
  case 'circle-out':
    iconSrc = circleOutIcon
    break
  case 'facerecognition':
    iconSrc = faceRecognitionIcon
    break
  case 'log':
    iconSrc = logIcon
    break
  case 'profile':
    iconSrc = profileIcon
    break
  case 'register':
    iconSrc = registerIcon
    break
  case 'settings':
    iconSrc = settingsIcon
    break
  default:
    iconSrc = null // Default icon jika tidak ada yang cocok
}
</script>
