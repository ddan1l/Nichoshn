<template>
    <stepper v-if="!configuration.isConfigured"></stepper>
    <v-container v-else>
      <v-card elevation="0" tile outlined  class="mx-auto pa-0">
        <v-tabs fixed-tabs color="black" v-model="tab">
          <v-tab :class="index===0 ? 'br' : undefined" v-for="(item, index) in items" :key="index">
            {{item.tab}}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item.tab">
            <v-card flat>
              <keep-alive>
                <component :side="item.side" :image="item.image" v-bind:is="item.content"></component>
              </keep-alive>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-container>
</template>

<script>
import Stepper from "@/components/Constructor/Stepper";
import Side from "@/components/Constructor/Side";
export default {
  name: "Constructor",
  data(){
    return{
      tab: null,
    }
  },
  components:{
    Stepper
  },
  computed:{
    items(){
      let items = []
      if (this.configuration.front){
        items.push(
            {
              tab: 'Передняя сторона',
              image: this.configuration.front,
              side: 'front',
              content: Side
            },
        )
      }
      if (this.configuration.back){
        items.push(
            {
              tab: 'Задняя сторона',
              image: this.configuration.back,
              side: 'back',
              content: Side
            },
        )
      }
       return items
    },
    configuration(){
      return this.$store.getters.getConfiguration
    },
  },

  mounted() {
    if (localStorage.Configuration)
    {
      this.$store.dispatch('CONFIGURE', JSON.parse(localStorage.Configuration))
    }
  }
}
</script>

<style scoped>
.br{
  border-right: thin solid rgba(0, 0, 0, 0.12);
}
/deep/.v-icon.v-icon::after {
  background-color: transparent
}

/deep/.v-item-group.theme--light.v-slide-group.v-tabs-bar.black--text {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}
.v-tab.v-tab {
  width: 50% !important;
  max-width: none;
}
</style>