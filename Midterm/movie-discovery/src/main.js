import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/main.css'

import BaseLoader from './components/BaseLoader.vue'
import ErrorMessage from './components/ErrorMessage.vue'

const app = createApp(App)
app.component('BaseLoader', BaseLoader)
app.component('ErrorMessage', ErrorMessage)

app.use(store).use(router).mount('#app')
