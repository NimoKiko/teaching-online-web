import { createApp } from 'vue'
import App from './login.vue'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from '../../router'
import store from '../../store'

// createApp(App).use(ElementPlus).mount('#app')
createApp(App).use(store).use(router).use(ElementUI).use(VueAxios, axios).mount('#app');