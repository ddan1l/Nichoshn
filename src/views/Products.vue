<template>
<v-container style="max-width: 1100px">
  <h1 class="text-center mt-5 category mx-4 ">{{categoryInfo.category}}</h1>
  <p class="text-center mt-4 font-weight-light">{{categoryInfo.description }}</p>
  <products-list :categoryURL="categoryURL" ></products-list>
  <div style="height: 1000px"></div>
</v-container>
</template>
<script>

import ProductsList from "@/components/ProductList";
export default {
  props: {
    categoryURL: String,
  },
  name: 'Products',
  created() {
    this.$store.dispatch('GET_CATEGORIES')
  },
  computed:{
    categoryInfo(){
      let categories = this.$store.getters.categories
      let categoryInfo = {
        description: '',
        category: ''
      }
      categories.forEach(item=>{
        if (item.categoryURL === this.categoryURL){
          categoryInfo = item
        }
      })
      return categoryInfo
    }
  },
  components:{
    ProductsList
  },
}
</script>

<style scoped>
.text-center.category {
  font-size: 24px;
  text-transform: uppercase;
}
/deep/.theme--light.v-divider {
  border-color: rgb(0, 0, 0);
}
/deep/.v-breadcrumbs__item {
  text-transform: uppercase;
  font-size: 14px;
  color: #191919 !important;
  cursor: pointer !important;
  font-weight: 300;
}
/deep/.v-breadcrumbs__item:hover {
 text-decoration: underline;
}
</style>