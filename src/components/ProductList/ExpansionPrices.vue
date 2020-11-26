<template>
  <v-expansion-panel class="mt-2">
    <v-expansion-panel-header>
      ЦЕНА
    </v-expansion-panel-header>
    <v-expansion-panel-content >
      <div class="mt-5">
        <v-nus :config="config" v-model="filtered" />
      </div>
      <div class="d-flex justify-space-between mb-4">
        <div class="ml-4 font-weight-light">Минимум: {{parseInt(priceFilter[0])}} </div>
        <div class="mr-4 font-weight-light">Максимум: {{parseInt(priceFilter[1])}} </div>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {
  props:{
    config: Object,
    priceFilter: Array
  },
  model:{
    prop: 'priceFilter',
    event: 'update'
  },
  computed:{
    filtered:{
      get: function() {
        return this.priceFilter
      },
      set: function(value) {
        this.$emit('update', value)
      }
    }
  },
name: "ExpansionPrices"
}
</script>

<style scoped>

</style>