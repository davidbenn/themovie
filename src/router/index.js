import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '../views/LoginView.vue'
import CategoryView from '../views/CategoryView.vue'

// LOADING
import '../../node_modules/nprogress/nprogress.css'
import nprogress from 'nprogress'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/contato',
    name: 'contato',
    component: ContactView
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/category/:id/:categoryRouteMatch',
    name: 'category',
    component: CategoryView 
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// LOADING PROGRESS
router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if(to.name){
    // Start the route progress bar.
    nprogress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  nprogress.done()
})


export default router
