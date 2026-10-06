import { createApp } from 'vue'
import App from './App.vue'
import BaseButton from './components/BaseButton.vue'
import BaseCard from './components/BaseCard.vue'
import './style.css'

const app = createApp(App)

app.component('BaseButton', BaseButton)
app.component('BaseCard', BaseCard)

app.mount('#app')