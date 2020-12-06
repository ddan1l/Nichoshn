<template>
  <div>
    <h1 v-if="processing">Загрузка...</h1>
    <h1 v-else-if="error">{{error}}</h1>
    <product-preview v-else :product="product"></product-preview>
  </div>
</template>
<script>
import ProductPreview from "@/components/ProductPreview";
export default {
  props:{
    productURL: String
  },
  components:{
    ProductPreview
  },
  name: "Product",
  created() {
    this.$store.dispatch('FIND_PRODUCT', {url: this.productURL})
  },
  computed:{
    error(){
      return this.$store.getters.getError
    },
    product(){
     return this.$store.getters.getProduct
    },
    processing(){
      return this.$store.getters.getProcessing
    },
  }
}
</script>
<style scoped>

</style>