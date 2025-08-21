import './assets/main.css'
import './assets/main.css' 
import { createPinia } from "pinia";



import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



const app = createApp(App)
app.use(router)
app.use(createPinia())
app.config.globalProperties.$filters = {
  currency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value)
  }
}

app.mount('#app')