<template>
    <div id="camera-component" class="web-camera-container">
        <div class="border-t border-gray-200">
            <div class="border-t border-gray-200 flex justify-center">
                <div id="app" class="web-camera-container flex flex-col justify-center items-center">
                    <!-- Added flex classes -->
                    <div class="camera-button">
                        <button type="button" class="button is-rounded"
                            :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }" @click="toggleCamera">
                            <span v-if="!isCameraOpen">Open Camera</span>
                            <span v-else>Close Camera</span>
                        </button>
                    </div>
                    <div v-show="isCameraOpen && isLoading" class="camera-loading flex justify-center items-center">
                        <!-- Added flex classes -->
                        <ul class="loader-circle">
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box flex justify-center items-center"
                        :class="{ 'flash': isShotPhoto }"> <!-- Added flex classes -->
                        <div class="camera-shutter" :class="{ 'flash': isShotPhoto }"></div>
                        <video v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5" autoplay></video>
                        <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450" :height="337.5"></canvas>
                    </div>
                    <div v-if="isCameraOpen && !isLoading" class="camera-shoot flex justify-center items-center">
                        <!-- Added flex classes -->
                        <button type="button" class="button" @click="takePhoto">
                            <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
                        </button>
                    </div>
                    <div v-if="isPhotoTaken && isCameraOpen" class="camera-download flex justify-center items-center">
                        <!-- Added flex classes -->
                        <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage">
                            Download
                        </a>
                    </div>
                </div>
            </div>
    </div>
</div></template>

<script setup>
import { ref } from 'vue';

const isCameraOpen = ref(false);
const isPhotoTaken = ref(false);
const isShotPhoto = ref(false);
const isLoading = ref(false);

const toggleCamera = () => {
    if (isCameraOpen.value) {
        isCameraOpen.value = false;
        isPhotoTaken.value = false;
        isShotPhoto.value = false;
        stopCameraStream();
    } else {
        isCameraOpen.value = true;
        createCameraElement();
    }
};

const createCameraElement = async () => {
    isLoading.value = true;
    const constraints = { audio: false, video: true };
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        isLoading.value = false;
        const camera = document.querySelector('#app video');
        if (camera) {
            camera.srcObject = stream;
        } else {
            console.error('Video element not found in the document');
        }
    } catch (error) {
        isLoading.value = false;
        console.error('Error accessing camera:', error);
        alert("May the browser didn't support or there is some errors.");
    }
};

const stopCameraStream = () => {
    const tracks = document.querySelector('#app video').srcObject.getTracks();
    tracks.forEach(track => track.stop());
};

const takePhoto = () => {
    if (!isPhotoTaken.value) {
        isShotPhoto.value = true;
        const FLASH_TIMEOUT = 50;
        setTimeout(() => {
            isShotPhoto.value = false;
        }, FLASH_TIMEOUT);
    }
    isPhotoTaken.value = !isPhotoTaken.value;
    const context = document.querySelector('#app canvas').getContext('2d');
    context.drawImage(document.querySelector('#app video'), 0, 0, 450, 337.5);
};

const downloadImage = () => {
    const download = document.getElementById('downloadPhoto');
    const canvas = document.getElementById('photoTaken').toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream');
    download.setAttribute('href', canvas);
};

</script>