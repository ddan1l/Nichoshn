<template>
  <v-app>
    <app-header></app-header>
      <v-content class="mt-6">
        <transition
            @enter="enter"
            @leave="leave"
            :css="false">
            <router-view :animationDirection="animationDirection"></router-view>
        </transition>
      </v-content>
  </v-app>
</template>

<script>
import Header from "@/components/Header/index";
import Velocity from "velocity-animate";
export default {
  name: 'App',
  components: {
    AppHeader: Header
  },
  data(){
    return {
      animationDirection: ''
    }
  },
  created() {
    this.$store.dispatch('GET_CATEGORIES')
  },
  methods: {
    enter(el, done) {
     el.style.position = 'absolute'
     let width
     if (this.animationDirection === 'right'){
       width = window.innerWidth
     }
     if(this.animationDirection === 'left'){
       width = - window.innerWidth
     }
      Velocity(el, {translate: [0, width]}, {duration: 500}, { complete: done }).then(()=>{
        el.style.translate = 'none'
      })
      el.style.position = 'relative'
    },
    leave(el, done) {
      let offset = el.offsetLeft
      el.style.position = 'absolute'
      el.style.left = offset + 'px'
      let width
      if (this.animationDirection === 'right'){
        width = -window.innerWidth
      }
      if(this.animationDirection === 'left'){
        width = window.innerWidth
      }
      Velocity(el, {translate: [width, 0] }, {duration: 500}, { complete: done })
    },
  },
  watch: {
    $route(to, from) {
        if (from.name === null || from.meta.routeLevel === undefined){
          this.animationDirection = 'center'
        }
        else if (to.meta.routeLevel > from.meta.routeLevel ){
          this.animationDirection= 'right'
        }
        else{
          this.animationDirection= 'left'
        }
    }
  }
};
</script>
