import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/login/login.vue'


const routes = [
  { path: '/', component: login },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
