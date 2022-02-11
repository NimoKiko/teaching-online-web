import { createApp } from 'vue'
import App from './views/home.vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router'
import store from './store'
import ElementUI from 'element-plus'
import 'element-plus/dist/index.css'
import request from './utils/request'

createApp(App).use(store).use(router).use(ElementUI).use(VueAxios, axios).mount('#app');


