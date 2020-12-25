<template>
  <v-color-picker
      elevation="6"
      dot-size="29"
      hide-mode-switch
      mode="hexa"
      swatches-max-height="191"
  ></v-color-picker>
</template>

<script>
export default {
  name: "Colors",
  computed:{
    colors(){
      return this.$store.getters.colors
    }
  },
  created() {
    this.$store.dispatch('GET_COLORS')
  },
}
</script>

<style scoped>

</style>