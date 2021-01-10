<template>
  <v-container class="px-0">
    <v-btn color="black" outlined @click="animate= !animate" style="position: absolute; top: 20px; left: 20px; z-index: 15">toggle</v-btn>
    <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        :css="false">
          <v-row v-show="animate">
            <v-col animateHome  sm="4">
              <v-card height="200"></v-card>
            </v-col>
            <v-col animateHome  sm="8">
              <v-card  height="200"></v-card>
            </v-col>
            <v-col animateHome  sm="6">
              <v-card height="200"></v-card>
            </v-col>
            <v-col animateHome  sm="6">
              <v-card height="200"></v-card>
            </v-col>
            <v-col animateHome  sm="12">
              <v-card height="200"></v-card>
            </v-col>
          </v-row>
    </transition>

  </v-container>

</template>

<script>
import Velocity from "velocity-animate";

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.name === null || from.meta.routeLevel === undefined){
        vm.animationDirection= 'center'
        setTimeout(() => vm.animate = true, 1000)
      }
      if (to.meta.routeLevel > from.meta.routeLevel ){
        vm.animationDirection= 'right'
      }
      else{
        vm.animationDirection= 'left'
        vm.animate = true
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    next()
  },
  beforeRouteLeave (to, from, next) {
    next(vm => {
      if (from.name === null || from.meta.routeLevel === undefined){
        vm.animationDirection= 'center'
        setTimeout(() => vm.animate = false, 1000)
      }
      if (to.meta.routeLevel > from.meta.routeLevel ){
        vm.animationDirection= 'right'
      }
      else{
        vm.animationDirection= 'right'
        vm.animate = false
      }
    })
  },
  name: "Home",
  data(){
    return {
      animatedList: [],
      animate: false,
      delay: 0.2,
      animationDirection: 'center'
    }
  },
  mounted() {
    this.animatedList = Array.from(document.querySelectorAll('[animateHome]'))
  },
  methods: {
    beforeEnter() {
      for (let child of this.animatedList){
        child.style.opacity = 0
        child.style.transformOrigin = 'center center'
      }
    },
    enter(el, done) {
      let arr = this.animatedList
      if (this.animationDirection === 'center'){
        for (let child of arr){
          this.delay += 10
          if (arr.indexOf(child) === arr.length -1){
            Velocity(child, {opacity: 1, scale: [1, 0]}, {duration: 700, delay: this.delay }, { complete: done })
          }
          else {
            Velocity(child, {opacity: 1, scale: [1, 0]}, {duration: 700, delay: this.delay })
          }
        }
      }
      if (this.animationDirection === 'left'){
        for (let child of arr){
          if (arr.indexOf(child) === arr.length -1){
            Velocity(child, {opacity: 1, translateX: [0, '100px']}, {duration: 200, delay: this.delay }, { complete: done })
          }
          else {
            Velocity(child, {opacity: 1, translateX: [0, '100px']}, {duration: 200, delay: this.delay })
          }
          this.delay += 100
        }
      }
      this.delay = 0.2
    },
    leave(el, done) {
      let arr = this.animatedList
      if (this.animationDirection === 'center'){
        for (let child of this.animatedList){
          this.delay+= 100
          if (arr.indexOf(child) === arr.length -1){
            Velocity(child, { opacity: 0,  scale: [0, 1]}, {duration: 700, delay: this.delay },{ complete: done })
          }
          else {
            Velocity(child, { opacity: 0,  scale: [0, 1]}, {duration: 700, delay: this.delay })
          }
        }
      }
      if (this.animationDirection === 'right'){
        for (let child of arr){
          this.delay += 10
          if (arr.indexOf(child) === arr.length -1){
            Velocity(child, {opacity: 0, translateX:['-100px', 0]}, {duration: 700, delay: this.delay }, { complete: done })
          }
          else {
            Velocity(child, {opacity: 0, translateX: ['-100px', 0]}, {duration: 700, delay: this.delay })
          }
        }
      }
      this.delay = 0.2

    },
  }
}
</script>

<style scoped>

</style>