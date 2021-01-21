import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user'
import generaleModule from './general'
import productsModule from "./products";
import constructorModule from "./constructor";
import adminModule from "./admin"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userModule,
    generaleModule,
    productsModule,
    constructorModule,
    adminModule
  }
})
