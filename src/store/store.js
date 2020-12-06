import Vue from 'vue'
import Vuex from 'vuex'
import userModule from './user'
import generaleModule from './general'
import productsModule from "./products";
import constructorModule from "./constructor";

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
    productsModule,
    constuctorModule: constructorModule
  }
})
