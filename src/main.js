import { createApp } from 'vue'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './assets/main.css'
import App from './App.vue'
import { initVersionCheck } from './utils/versionCheck'

initVersionCheck()

createApp(App).mount('#app')
