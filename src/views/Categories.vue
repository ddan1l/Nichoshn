<template>
  <v-container  class="mt-7 px-0">
    <div style="justify-content: center; display: flex; align-items: center">
      <v-card ref="categoryImage"  elevation="1"  class="categoryImage rounded-r-0" height="450" width="270">
        <v-img v-if="categoriesLoaded" height="450" :src="categories[activeIndex].image"></v-img>
      </v-card>
      <v-card ref="categories" style="z-index: 2" class="py-5 categories" elevation="1" height="500" width="350">
        <div :ref="`categoryItem${index}`" class="title categoryItem mb-2 font-weight-regular text-center text-uppercase"
             :key="index" v-for="(item, index) in categories"
             @click="changeCategory(index)">
          {{item.category}}
        </div>
      </v-card>
      <v-card style="display: flex; flex-direction: column; align-items: center; justify-content: center" ref="categoryDescription" elevation="1" class="categoryDescription rounded-l-0  px-8" height="450" width="270">
          <div class="title text-uppercase text-center mb-3">Описание</div>
          <div v-if="categoriesLoaded" class="text-center subtitle-1">{{categories[activeIndex].description}}</div>
          <v-btn v-if="categoriesLoaded" height="40" :to="'/categories/'+categories[activeIndex].categoryURL" width="200" class="mt-5" outlined>Перейти</v-btn>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import Velocity from "velocity-animate";

export default {
  name: "Categories",
  props:{
    animationDirection: String
  },
  data(){
    return {
      animatedImages: [],
      categoriesLoaded: false,
      animationComplete: false,
      activeIndex: 0,
      delay: 100,
    }
  },
  mounted() {
    this.animateSelector()
  },
  computed:{
    categories(){
      for (let item of this.$store.getters.categories){
        item.imageLoaded = false
      }
      return this.$store.getters.categories
    }
  },
  methods:{
    changeCategory(index){
      Velocity(this.$refs.categoryDescription.$el, {translateX: [-270, 0]}, {duration: 800})
      Velocity(this.$refs.categoryImage.$el, {translateX: [270, 0]}, {duration: 800})
      .then(() => {
        this.activeIndex = index
        Velocity(this.$refs.categoryDescription.$el, {translateX: [0, -270]}, {duration: 800, delay: 300})
        Velocity(this.$refs.categoryImage.$el, {translateX: [0, 270]}, {duration: 800, delay: 300})
      })
    },
    animateSelector(done){
        Velocity(this.$refs.categories.$el, {scale: [1, 0]} , {duration: 500, delay: this.animationDirection === 'center' ? 2000: 500}, {complete: done})
      }
  },
  created() {
    this.$store.dispatch('GET_CATEGORIES')
  },
  watch: {
    categories(){
      if (this.categoriesLoaded === false){
        this.$nextTick(() =>{
          let delay = this.animationDirection === 'center' ? 2000 : 500
            for (let [key, value] of Object.entries(this.$refs)){
                if (key.includes('categoryItem')){
                  delay+=100
                  Velocity(value[0], {opacity: [1, 0], translateY: [0, 10]}, {duration: 500, delay: delay})
                }
            }
          Velocity(this.$refs.categoryDescription.$el, {opacity: [1,0]}, {delay: delay})
          Velocity(this.$refs.categoryImage.$el, {opacity: [1,0]}, {delay: delay})
          Velocity(this.$refs.categoryDescription.$el, {translateX: [0, -270]}, {duration: 800})
          Velocity(this.$refs.categoryImage.$el, {translateX: [0, 270]}, {duration: 800})
          this.categoriesLoaded = true
        })
      }

    }
  }
}
</script>

<style scoped>
.categoryItem{
  transform: translateY(10px);
  opacity: 0;
}
.categoryItem:hover{
  transition: 1s;
  cursor: pointer;
}
.categoryDescription{
  transform: translateX(-270px);
  opacity: 0;
}
.categoryImage{
  transform: translateX(270px);
  opacity: 0;
 }
.categories{
  transform: scale(0);
}
/deep/.text-center.subtitle-1 {
  font-size: 18px !important;
  font-weight: 300;
}
</style>