import { createApp } from 'vue'
import { pinia } from '@store/index'
import App from './App.vue'
import router from './router/index'


createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')
