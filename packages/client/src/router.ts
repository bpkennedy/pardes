import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './pages/HomeView.vue'
import AboutView from './pages/AboutView.vue'
import BookView from './pages/BookView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/book/:name',
    name: 'Book',
    component: BookView,
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
