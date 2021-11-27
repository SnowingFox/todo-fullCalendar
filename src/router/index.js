import { createRouter, createWebHistory } from 'vue-router'
import Calendar from '../components/Calendar'

const routes = [
  {
    path: '/',
    redirect: '/full-calendar',
  },
  {
    path: '/full-calendar',
    component: Calendar,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
