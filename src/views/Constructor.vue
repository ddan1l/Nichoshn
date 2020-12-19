<template>
    <v-container v-if="processing" fill-height fluid>
      <v-row align="center" justify="center">
        <v-col>
          <v-progress-circular
              style="transform: translateY(-100%)"
              indeterminate
              color="black"
              :size="50"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>
    <div  class="mt-4 mb-3" v-else>
      <v-snackbar outlined :timeout="10000" v-model="TabSnackbar">
        Просмотрите для начала все стороны
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="TabSnackbar = false; tab = 1  ">
            Перейти
          </v-btn>
        </template>
      </v-snackbar>
        <stepper @configure="configure" v-if="!configuration.isConfigured"></stepper>
        <v-container class="pa-0" v-if="configuration.isConfigured">
            <v-card elevation="0" tile outlined  class="mx-auto pa-0">
              <v-tabs  fixed-tabs color="black" v-model="tab">
                <v-tab  :class="[index===0 ? 'br' : undefined, item.side]" v-for="(item, index) in items" :key="index">
                  {{item.tab}}
                </v-tab>
                <v-tab class="plug"> </v-tab>
              </v-tabs>
              <v-tabs-items :style="{marginTop: tab===2 ? '-50px': 0}" v-model="tab">
                <v-tab-item v-for="item in items" :key="item.tab">
                  <v-card flat>
                    <keep-alive>
                      <component @loaded="loadedTabItems++" :saveDataURL="saveDataURL" @order="order()" @reconfigure="reconfigure()" :side="item.side" :image="item.image" v-bind:is="item.content"></component>
                    </keep-alive>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <Ordering @close="tab = 0"/>
                </v-tab-item>
              </v-tabs-items>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import Stepper from "@/components/Constructor/Stepper";
import Side from "@/components/Constructor/Side";
import Ordering from "@/components/Constructor/Ordering";
export default {
  name: "Constructor",
  data(){
    return{
      sidesDataURL: [],
      TabSnackbar: false,
      loadedTabItems: 0,
      overlay: true,
      notifications: false,
      sound: true,
      widgets: false,
      orderingDialog: false,
      saveDataURL: 0,
      tab: null,
    }
  },
  beforeRouteLeave (to, from, next) {
    //this.animationClass = 'animate__animated animate__zoomOut'
    setTimeout(()=>{
      next()
    }, 500)
  },
  components:{
    Stepper, Ordering
  },
  methods:{
    order(){
      if (this.loadedTabItems === this.items.length){
        let min = 0
        let max = 100000
        this.saveDataURL = Math.floor(Math.random() * (max - min + 1) ) + min
        this.tab = 2
      }
      else {
        this.TabSnackbar = true
      }
    },
    reconfigure(){
     // this.animationClass = 'animate__animated animate__zoomOut'
      setTimeout(()=>{
        this.$store.dispatch('RECONFIGURE', {})
      }, 500)
    },
    configure(){
      //this.animationClass = 'animate__animated animate__zoomIn'
    }
  },
  computed: {
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

    processing(){
      return this.$store.getters.getProcessing
    },
    configuration(){
      return this.$store.getters.getConfiguration
    },
  },
  created() {
    this.$store.commit('SET_PROCESSING', true)
    setTimeout(()=>{
      this.$store.commit('SET_PROCESSING', false)
    }, 1000)
  },
  mounted() {
    if (localStorage.Configuration)
    {
      this.$store.dispatch('CONFIGURE', JSON.parse(localStorage.Configuration))
    }
  },

}
</script>

<style scoped>

.br{
  border-right: thin solid rgba(0, 0, 0, 0.12);
}
/deep/.v-icon.v-icon::after {
  background-color: transparent
}
/deep/.v-image__image {

  background-size: 90%;
}
/deep/.v-snack__wrapper{
  margin-bottom: 50px !important;
  box-shadow: 0 0 15px #00000026 !important;
}
/deep/.v-item-group.theme--light.v-slide-group.v-tabs-bar.black--text {
  border-bottom: thin solid rgba(0, 0, 0, 0.12);
}
.v-tab.v-tab {
  width: 50% !important;
  max-width: none;
}
.col {
  text-align: center;
}
.v-sheet.theme--dark.v-toolbar {
  border-radius: 0;
}

/deep/.v-icon.notranslate.mdi.mdi-chevron-right.theme--dark,
/deep/.v-icon.notranslate.mdi.mdi-chevron-left.theme--dark{
  font-size: 60px !important;
}

.plug{
  display: none;
}
.container.orderingContainer {
  box-shadow:0 9px 12px -6px rgba(0, 0, 0, 0.04),0 19px 29px 2px rgba(0, 0, 0, 0),0 7px 36px 6px rgba(0, 0, 0, 0.05) !important;
  background: #fbfbfb;
  background-image: linear-gradient(rgba(229, 229, 229, 0.7) .1em, transparent .1em), linear-gradient(90deg, rgba(229, 229, 229, 0.7) .1em, transparent .1em);
  background-size: 2.4em 2.4em;
}

</style>
