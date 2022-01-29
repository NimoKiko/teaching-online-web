import { createApp } from 'vue'
import App from './login.vue'
// import store from '../../store/login/store'
import ElementPlus from 'element-plus' //引入element-ui
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).mount('#app')