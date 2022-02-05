import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './utils/request'

const app = createApp({
  router,
  store,
  render() {
    return h(App)
  }
})

app.config.globalProperties.$axios = axios

console.log(app)

app.use(router)
app.use(store)
app.mount('#app')
