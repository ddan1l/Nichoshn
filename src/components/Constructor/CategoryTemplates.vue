<template>
  <v-sheet class=" mt-1 mb-8" outlined max-width="min-content">
    <v-slide-group v-model="model" class="pa-4" active-class="active" show-arrows>
      <v-slide-item v-for="(template, index) in templatesCategories" :key="index" v-slot="{active, toggle }">
        <v-card  outlined elevation="0" style="position: relative" :color="active ? undefined : 'grey lighten-4'" class=" ma-4 rounded-0 mb-10" height="400" width="300" @click="toggle">
        <v-img transition="scale-transition" origin="center center" style="width: 100%; height: 100%" :src="template.image">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon v-if="active" color="white" size="48" v-text="'mdi-close-circle-outline'"></v-icon>
            </v-scale-transition>
          </v-row>
          <h1 class="categoryName">{{template.category}}</h1>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  name: "TemplatesCategories",
  data(){
    return{
      templatesModel: undefined
    }
  },
  computed:{
    model:{
      get(){
        return this.templatesModel
      },
      set(val){
        this.templatesModel = val
        if (val !==undefined){
          this.$emit('selected',  this.$store.getters.getCategoryTemplates[val])
        }
        else{
          this.$emit('selected', null)
        }
      }
    },
    templatesCategories(){
      return this.$store.getters.getCategoryTemplates
    }
  },
}
</script>

<style scoped>
.active{
  transform: scale(1.05);
  transition: 300ms;
}
.active::before{
  content: '';
  transition: 300ms;
  background-color: #0000006e;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  opacity: 1;
  top: 0;
  left: 0;
}
.row.fill-height.align-center.justify-center {
  z-index: 2;
  position: absolute;
  top: 0;
  left: 50%;
}
.categoryName {
  letter-spacing: 2px;
  text-align: center;
  margin-top: 5px;
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 300;
}
</style>