<template>
  <v-expansion-panel>
    <v-expansion-panel-header>
      КАТЕГОРИИ
    </v-expansion-panel-header>
    <v-expansion-panel-content >
      <v-list class="pa-0" dense>
        <v-list-item-group color="grey" >
          <v-list-item class="pl-6 py-1" v-for="(item, i) in categories" :key="i"  :to= "'/clothes/'+item.categoryURL">
            <v-list-item-content>
              <v-list-item-title  class="black--text font-weight-light" v-text="item.category"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props:{
    categories: Array
  },
  name: "ExpansionCategories"
  }
</script>
