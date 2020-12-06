<template>
<h1>ІІ</h1>
</template>

<script>
export default {
  props:{
    selectedIDTemplate: Number
  },
  name: "CategoryPatterns",
  computed:{
    pattern(){
      let vm = this
      return this.$store.getters.getCategoryPatterns.filter(template => template.categoryId === vm.selectedIDTemplate)
    }
  }
}
</script>

<style scoped>

</style>