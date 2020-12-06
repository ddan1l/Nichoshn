import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from "../store/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home')
  },
  {
    path: '/clothes/:categoryURL',
    props: true,
    name: 'Clothes',
    component: () => import('../views/Сlothes')
  },
  {
    path: '/clothes/:categoryURL/:productURL',
    props: true,
    name: 'Product',
    component: () => import('../views/Product')
  },
  {
    path: '/constructor',
    name: 'Constructor',
    component: () => import('../views/Constructor')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('../components/SignIn')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../components/SignUp')
  },
  {
    path: '/identify',
    name: 'Identify',
    component: () => import('../views/Identify')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})


router.beforeEach((to, from, next) => {
  if (to.name === 'Profile' && !Store.getters.isAuthenticated) next({ name: 'Identify' })
  else next()
})

export default router
