import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import KiteUI from '@kite-nest/ui'

createApp(App)
  .use(KiteUI)
  .mount('#app')
