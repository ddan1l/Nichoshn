<template>
  <v-container>
    <v-row>
      <v-col v-animate sm="8">
        <v-card color="blue" height="200">
          <div class="container"><a class="border-animation" href="#">
            <div class="border-animation__inner">Новинки</div>
          </a></div>
        </v-card>
      </v-col>
      <v-col v-animate  sm="4">
        <v-card color="red" height="200"></v-card>
      </v-col>
      <v-col v-animate  sm="5">
        <v-card  color="red" height="200"></v-card>
      </v-col>
      <v-col v-animate  sm="3">
        <v-card  color="red" height="400"></v-card>
      </v-col>
      <v-col v-animate  sm="4">
        <v-card  color="red" height="200"></v-card>
      </v-col>
      <v-col v-animate  sm="4">
        <v-card  color="red" height="200"></v-card>
      </v-col>
      <v-col v-animate  sm="4">
        <v-card  color="red" height="200"></v-card>
      </v-col><v-col v-animate  sm="4">
      <v-card  color="red" height="200"></v-card>
    </v-col>

    </v-row>
  </v-container>
</template>

<script>
import Velocity from "velocity-animate";

export default {
  name: "Novelties",
  props:{
    animationDirection: String
  },
  directives: {
    animate: {
      inserted(el, binding, vnode) {
        vnode.context.animatedList.push(el)
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    next()
  },
  data(){
    return {
      animatedList: [],
      delay: 50
    }
  },
  mounted() {
    this.animate()
  },
  methods:{
    animate(done){
      if (this.animationDirection !== 'center'){
        let firstEpisode = {
          translateX: this.animationDirection==='left' ? -40: this.animationDirection==='right' ? 40 : undefined,
          scale: 0.97
        }
        let secondEpisode = {
          translateX: 0,
          scale: 1
        }
        for (let child of this.animatedList){
          this.delay += 20
          child.style.transformOrigin = `${this.animationDirection} center`
          if (this.animatedList.indexOf(child) === this.animatedList.length -1) {
            Velocity(child, firstEpisode , {duration: 500, delay: this.delay})
            Velocity(child, secondEpisode, {duration: 400, delay: this.delay}, {complete: done})
          }
          else{
            Velocity(child, firstEpisode, {duration: 500, delay: this.delay})
            Velocity(child, secondEpisode , {duration: 400, delay: this.delay}, {complete: done})
          }
        }
      }
    }
  },

}
</script>

<style scoped>

</style>