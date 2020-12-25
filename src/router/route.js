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
    component: () => import('../components/Identify/Login')
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../components/Identify/Register')
  },
  {
    path: '/identify',
    name: 'Identify',
    component: () => import('../views/Identify')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      authRequired: true
    },
    component: () => import('../views/Profile')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      adminRequired: true
    },
    component: () => import('../views/Admin')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})


router.beforeEach((to, from, next) => {

    if (to.matched.some(route => route.meta.authRequired)){
      Store.dispatch('INIT_AUTH').then(user=>{
          if (!user || !Store.getters.isEmailVerified){
            next({ name: 'Identify' })
          }
          else{
            next()
          }
      })
    }
    else if(to.matched.some(route => route.meta.adminRequired)){
      Store.dispatch('INIT_AUTH').then(user=> {
          if (user) {
            Store.dispatch('CHECK_ADMIN', user.uid).then((isAdmin) => {
              if (!isAdmin) {
                Store.dispatch('SIGNOUT').then(() => next({
                  name: 'Home'
                }))
              } else {
                next()
              }
            })
          }
          else {
            next({name: 'Identify'})
          }
      })
    }
    else{
      next()
    }
})

export default router
