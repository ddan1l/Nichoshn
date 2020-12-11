<template>
  <v-sheet class="mt-1 mb-8 main" outlined max-width="min-content">
    <v-slide-group  v-model="model" class="pa-4" active-class="active" show-arrows>
      <v-slide-item v-for="(pattern, index) in categoryPatterns.patterns" :key="index" v-slot="{active, toggle}">
        <div class="slide-item">
          <v-card :class="model === undefined ? 'lighten': (active? undefined: 'darken')"
                  :elevation="model === undefined ? 2 : active? 2 : 0"
                  outlined style="position: relative"
                  color="gray lighten-4" class="ma-4 rounded-lg"
                  width="300" height="490">
            <div>
              <div @click="toggle" @mousedown="selectedPattern = pattern" :style="{'border-bottom': model === undefined ? '1px solid #ddd' : (active ? '1px solid #ddd' : '1px solid #979797') }" class="px-4 imageContainer">
                  <v-img style="width: 100%; min-height: 350px" :style="{'z-index': model === undefined? 1 : -2}" :src="pattern.options[pattern.selectedColor].front">
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
                    </v-row>
                  </v-img>
              </div>
              <div :class="model === undefined ? undefined: (active? undefined: 'cover')">
                <h1 class="templateName">{{pattern.name}}</h1>
                <div class="colorContainer">
                  <v-btn :disabled="!active" class="pa-0 rounded-xl elevation-0 mx-1 mt-2 mb-1" width="20" height="20" min-width="20"
                         style="cursor: pointer" @click="pattern.selectedColor=index; pattern.selectedSize = 0; selectedPattern = pattern; change()" v-for="(option, index) in pattern.options" :key="index">
                    <div v-if="!option.additional" :style="{'background-color': option.hex}" class="color"></div>
                    <div v-else class="doubleColorContainer ">
                      <div class="firstColor" :style="{'background-color': option.hex}"></div>
                      <div class="secondColor" :style="{'background-color': option.additional}"></div>
                    </div>
                  </v-btn>
                </div>
                <div class="sizeContainer">
                  <v-btn @click="pattern.selectedSize = index; selectedPattern = pattern; change()" :class="pattern.selectedSize === index ? 'selected' : undefined" min-width="40" height="30" text :disabled="!active" class="pa-0 mx-1 elevation-0 mt-2 mb-5"
                       style="cursor: pointer" v-for="(size, index) in sizes(pattern)" :key="index">
                    {{size}}
                  </v-btn>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  props:{
    selectedIDTemplate: Number
  },
  name: "CategoryPatterns",
  data(){
    return{
      modelPatterns: 0,
      a: 0,
      selectedPattern: {}
    }
  },
  methods: {
    sizes(pattern){
      return pattern.options[pattern.selectedColor].sizes
    },
    change(){
      let pattern = JSON.parse(JSON.stringify(this.selectedPattern.options[this.selectedPattern.selectedColor]))
      pattern.sizes =  this.selectedPattern.options[this.selectedPattern.selectedColor].sizes[this.selectedPattern.selectedSize]
      this.$emit('patternSelected', pattern)
    },
  },
  computed:{
    model:{
      get(){
        return this.modelPatterns
      },
      set(val){
        this.modelPatterns = val
        if (val!==undefined){
          this.change()
        }
        else{
          this.$emit('patternSelected', null)
        }
      }
    },
    categoryPatterns(){
      let vm = this
      return this.$store.getters.getCategoryPatterns.filter(template => template.categoryId === vm.selectedIDTemplate)[0]
    }
  },
  mounted() {
    let vm = this
    this.selectedPattern = this.$store.getters.getCategoryPatterns.filter(template => template.categoryId === vm.selectedIDTemplate)[0].patterns[0]
    this.change()
  },
}
</script>

<style scoped>
.active .v-card {
  transform: scale(1.05);
  transition: 300ms;
}
.imageContainer{
  margin-bottom: 15px !important;
  cursor: pointer
}
.cover{
  opacity: 0.3;
}
.main.v-sheet {
  background-color: #eee;
}
.v-card--link:focus::before {
  opacity: 0;
}
.row.fill-height.ma-0.align-center.justify-center {
  z-index: -2;
}
.darken::before{
  content: '';
  z-index: -1;
  transition: 300ms;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.24) 100%);
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 1;
  top: 0;
  left: 0;
  border-radius: 8px;
}
.darken{
  transform: scale(0.85);
  transition: 300ms;
}
.lighten{
  transform: scale(1);
  transition: 300ms;
}
.row.fill-height.align-center.justify-center {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 50%;
}
.selected{
  border: 1px solid;
}
.templateName, .templateColors {
  letter-spacing: 2px;
  text-align: center;
  margin-top: 5px;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 300;
}
.templateColors{
  font-size: 18px;
}
.colorContainer, .sizeContainer{
  display: flex;
  justify-content: center;
}
.color {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid;
}
.doubleColorContainer{
  display: flex;
  border: 1px solid;
  border-radius: 50%;
}
.firstColor{
  width: 10px;  /* ширина в два раза меньше высоты, иначе получится полуовал */
  height: 20px;
  border-radius: 100% 0 0 100% / 50% 0 0 50%;
}
.secondColor{
  width: 10px;  /* ширина в два раза меньше высоты, иначе получится полуовал */
  height: 20px;
  border-radius: 0 100% 100% 0 / 0 50% 50% 0;

}
</style>