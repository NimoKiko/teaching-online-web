import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/Home.vue'
import lesson from '../views/lesson/lesson.vue'
import stdManage from '../views/studentManage/stdManage.vue'
import teaManage from '../views/teacherManage/teaManage.vue'
import lessonDetail from '../views/lesson/lessonDetailTab.vue'

const routes = [
  { path: '/home', component: home },
  { path: '/lesson', component: lesson },
  { path: '/stdManage', component: stdManage },
  { path: '/teaManage', component: teaManage },
  { path: '/lessonDetail', name: 'detail', component: lessonDetail },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
