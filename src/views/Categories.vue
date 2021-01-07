<template>
  <v-container class="mt-7">
    <v-row>
      <v-col sm="12" md="3" :key="index" v-for="(item, index) in categories">
        <v-card style="cursor: pointer" elevation="0"  :to="'categories/' + item.categoryURL" color="transparent" min-height="400">
          <div style="transition: .5s"
            @mouseenter="activeIndex = index"
            @mouseleave="activeIndex = null"
            :style="{height: activeIndex === index? '400px': '100px',
            paddingTop: activeIndex === index ? '50px': '10px'}" class="text">
            <v-btn v-if="false" :style="{transform:  activeIndex === index ? 'rotate(180deg)': undefined}"
                 @click="activeIndex === index ? activeIndex = null: activeIndex = index"
                 style="top: 5px; right: 5px; transition: .5s" icon absolute right>
              <v-icon size="18">
                fas fa-chevron-up
              </v-icon>
            </v-btn>
            <div class="title">
              {{item.category}}
            </div>
            <div class="subtitle-1">
              {{item.description}}
            </div>
          </div>
            <v-img class="preview" :src="item.image">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Categories",
  data(){
    return{
      hover: false,
      activeIndex: null
    }
  },
  computed:{
    categories(){
      return this.$store.getters.categories
    }
  },
  created() {
    this.$store.dispatch('GET_CATEGORIES')
  }
}
</script>

<style scoped>
/deep/.v-image.v-responsive.preview.theme--light {
  position: absolute;
  height: 100%;
  top: 0;
}
.text{
  z-index: 2;
  position: relative;
  text-align: center;
  padding: 15px 10px;
  background-color: #ffffffe6;
  border-top: 1px solid #e1e1e1;
  border-radius: 0 !important;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.text::after{
  content: '';
  height: 90px;
  width: 100%;
  position: absolute;
  background: linear-gradient(#fff0, #ffffffa3);
  bottom: 0;
  left: 0;
}

/deep/.v-sheet.v-card:not(.v-sheet--outlined) {
  border: 1px solid #ababab !important;
  border-radius: 15px;
  overflow: hidden;

}
/deep/.v-card.v-sheet.theme--light.transparent {
  display: flex;
  flex-direction: column;
  justify-content: end;
}
</style>