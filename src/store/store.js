import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user'
import generaleModule from './general'
import productsModule from "./products";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userModule,
    generaleModule,
    productsModule
  }
})
