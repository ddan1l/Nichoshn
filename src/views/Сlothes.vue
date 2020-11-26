<template>
<v-container style="width: 978px">
  <v-breadcrumbs
      class="pa-0 mt-3 justify-center"
      :items="breadcrumbs"
      large
  ></v-breadcrumbs>
  <h1 class="text-center mt-5 category mx-4 ">{{categoryInfo.category}}</h1>
  <p class="text-center mt-2 px-16 font-weight-light">{{categoryInfo.title }}</p>
  <v-divider class="mx-4 mt-6">''</v-divider>
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
  data(){
    return {
      categoryInfo: {}
    }
  },
  computed:{
    breadcrumbs(){
      let categoryBreadcrumb
      this.$store.getters.getCategoriesInfo.forEach(item=>{
        if (item.categoryURL === this.categoryURL){
          this.categoryInfo = item
          categoryBreadcrumb = {
            text: item.category,
            disabled: true,
            href: `/clothing/${item.categoryURL}`
          }
        }
      })

      return [
        {
          text: 'Главная',
          disabled: false,
          to: '/',
        },
        {
          text: 'Одежда',
          disabled: false,
          to: '/clothes',
        },
        {
          text: categoryBreadcrumb.text,
          disabled: categoryBreadcrumb.disabled,
          to: categoryBreadcrumb.href,
        }
      ]
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