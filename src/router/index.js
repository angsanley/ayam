import Vue from 'vue'
import VueRouter from 'vue-router'
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
      { path: '/', name: 'Dashboard', component: () => import('../views/Dashboard/Home.vue') },
      { path: 'academics', name: 'Academics', component: () => import('../views/Dashboard/Academics.vue') },
      { path: 'assignments', name: 'Assignments', component: () => import('../views/Dashboard/Assignments.vue') },
      { path: 'videoconferences', name: 'VideoConferences', component: () => import('../views/Dashboard/VideoConferences.vue') },
      { path: 'financial', name: 'Financial', component: () => import('../views/Dashboard/Financial.vue') },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
