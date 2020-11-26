<template>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-header>
      РАЗМЕРЫ
    </v-expansion-panel-header>
    <v-expansion-panel-content >
      <v-list class="pa-0" dense>
        <v-list-item-group color="grey" multiple>
          <v-list-item class="pa-0 pr-5" v-for="(item, index) in sizes" :key="index">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-subtitle class="black--text font-weight-light pl-6">{{item.size}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox v-model="filtered" :value="item.size" :input-value="active"></v-checkbox>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>
<script>
export default {
  props:{
    sizes: Array,
    sizeFilter: Array
  },
  model:{
    prop: 'sizeFilter',
    event: 'change'
  },
  computed:{
    filtered:{
      get: function() {
        return this.sizeFilter
      },
      set: function(value) {
        this.$emit('change', value)
      }
    }
  },
  name: "ExpansionSizes"
}
</script>
