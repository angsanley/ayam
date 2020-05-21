import Vue from 'vue'
import VueRouter from 'vue-router'
import DashboardHome from '../views/Dashboard/Home.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: () => import('../views/Maintenance.vue')
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      { path: '/', name: 'Dashboard', component: DashboardHome },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
