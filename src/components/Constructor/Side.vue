<template>
    <v-card min-height="650">
      <ControlPanel :layers="layers" @refresh="layers=$event"/>
      <v-img transition="scale-transition" origin="center center"  class="mx-auto" max-width="500" :src="image"></v-img>
    </v-card>
</template>

<script>
import ControlPanel from "@/components/Constructor/ControlPanel";
export default {
  name: "Side",
  props:{
    image: String
  },
  components: {
    ControlPanel
  },
  data(){
    return{
      layers:
          [
            {
              id: 1,
              name: 'Слои',
              children: [

              ]
            }
          ]
    }
  },
  computed: {

  }
}
</script>

<style scoped>
/deep/path {
  fill: rgba(0, 0, 0, 0.54) !important;
}
.v-list-item__title {
  font-size: 15px !important;
  font-weight: 400 !important;
}
.purchase{
  font-weight: 500 !important;
}
/deep/.v-image__image.v-image__image--cover {
  filter: drop-shadow(0px 5px 5px #00000024);
}
.v-navigation-drawer.v-navigation-drawer--absolute.v-navigation-drawer--mini-variant.v-navigation-drawer--open.v-navigation-drawer--open-on-hover.theme--light {
  box-shadow: 5px 0 5px 0 rgba(235, 235, 235, 0.75);
}
.v-navigation-drawer.v-navigation-drawer--absolute.v-navigation-drawer--open.theme--light {
  box-shadow: 5px 0 5px 0 rgba(235, 235, 235, 0.75);
}

.v-card.v-sheet.theme--light {
  background: #fbfbfb;
  background-image: linear-gradient(rgba(229, 229, 229, 0.7) .1em, transparent .1em), linear-gradient(90deg, rgba(229, 229, 229, 0.7) .1em, transparent .1em);
  background-size: 2.5em 2.5em;
}
/deep/.v-treeview-node__prepend {
  min-width: 0 !important;
}
/deep/.v-treeview-node__root::before{
  background-color: transparent !important;
}
/deep/.v-treeview-node--leaf > .v-treeview-node__root::before {
  background-color: black !important;
  border-radius: 5px;
  height: 40px;
}
/deep/.v-treeview-node__content {
  margin: 0 !important;
}
/deep/.v-treeview-node__root {
  margin-right: 15px !important;
}
/deep/.v-treeview-node__root {
  height: 40px;
  margin-bottom: 7px;
  cursor: pointer;
  min-height: 40px !important;
}
</style>