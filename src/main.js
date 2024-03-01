import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/stores';
import axios from 'axios';
import VueCookies from 'vue-cookies';
import './assets/main.css'


const app = createApp(App)
app.use(store);
app.use(router)
app.config.globalProperties.$axios = axios;
app.use(VueCookies);
app.mount('#app')