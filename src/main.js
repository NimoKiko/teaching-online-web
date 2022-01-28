import { createApp } from 'vue'
import App from './views/home.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(store).use(router).use(ElementUI).mount('#app')
