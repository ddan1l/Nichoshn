<template>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-header>
      ЦВЕТА
    </v-expansion-panel-header>
    <v-expansion-panel-content >
      <v-list class="pa-0" dense>
        <v-list-item-group color="grey" multiple>
          <v-list-item class="pa-0 pr-5" v-for="(item, index) in colors" :key="index">
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-subtitle class="black--text font-weight-light pl-6">
                  <span style="width: 12px; height: 12px; display: inline-block; border: 1px solid" class="mr-1" :style="{backgroundColor: item.hex}"></span>
                  {{item.color}}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-checkbox v-model="filtered" :value="item.url" :input-value="active"></v-checkbox>
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
    colors: Array,
    colorFilter: Array
  },
  model:{
    prop: 'colorFilter',
    event: 'change'
  },
  computed:{
    filtered:{
      get: function() {
        return this.colorFilter
      },
      set: function(value) {
        this.$emit('change', value)
      }
    }
  },
  name: "ExpansionColors"
}
</script>
