import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia"

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.config.globalProperties.$filters = {
  currency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }
}

app.mount('#app')