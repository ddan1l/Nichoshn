import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from "../store/store";

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      routeLevel: 0
    },
    component: () => import('../views/Home')
  },
  {
    path: '/novelties',
    name: 'Novelties',
    meta: {
      routeLevel: 1
    },
    component: () => import('../views/Novelties')
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {
      routeLevel: 2
    },
    component: () => import('../views/Categories')
  },
  {
    path: '/basket',
    name: 'Basket',
    meta: {
      routeLevel: 2
    },
    component: () => import('../views/Basket')
  },
  {
    path: '/categories/:categoryURL',
    props: true,
    name: 'Category',
    meta: {
      routeLevel: 3
    },
    component: () => import('../views/Products')
  },
  {
    path: '/clothes/:categoryURL/:productURL',
    props: true,
    name: 'Product',
    meta: {
      routeLevel: 4
    },
    component: () => import('../views/Product')
  },
/*  {
    path: '/constructor',
    name: 'Constructor',
    meta: {
      routeLevel: 5
    },
    component: () => import('../views/Constructor')
  },*/
  {
    path: '/contacts',
    name: 'Contacts',
    meta: {
      routeLevel: 6
    },
    component: () => import('../views/Contacts')
  },

  {
    path: '/identify',
    name: 'Identify',
    meta: {
      routeLevel: 6
    },
    component: () => import('../views/Identify')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {
      authRequired: true,
      routeLevel: 7
    },
    component: () => import('../views/Profile')
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {
      adminRequired: true,
      routeLevel: 8
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
