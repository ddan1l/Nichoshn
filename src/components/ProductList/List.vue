<template>
  <div>
  <transition-group class="layout" style="flex-wrap: wrap"  name="product-animation" tag="div">
    <v-flex class="product-animation-item pl-2 mt-5 pr-2"  v-for="product in products" :key="product.url" xs3>
      <v-card class="product-card" elevation="0">
        <router-link :to="{path: $route.path +'/' + product.url, params: {productURL: product.url}}">
          <v-img height="300" style="cursor: pointer" @mouseenter="showSecondImage($event, product.images)" @mouseleave="showFirstImage($event, product.images)" :src="product.images[0].imageURL">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </router-link>
        <div class="iconsContainer">
          <v-icon color="grey darken-2" @click="dialog=!dialog; modalProduct = product" class="ml-4 mr-2 d-none d-lg-inline" size="17">
            far fa-eye
          </v-icon>
          <v-icon :class="{filled: wishlist.includes(product)}" class="no-focus" color="black" @click="toWishlist(product)" size="17">
            {{wishlist.includes(product) ? 'fas fa-heart': 'far fa-heart'}}
          </v-icon>
        </div>
        <v-divider class="mx-4 mt-2 mb-2">''</v-divider>
        <router-link style="cursor: pointer" tag="div" to="/">
          <div class="product-title d-block text-center pb-0" >{{product.title}}</div>
          <div class="product-category d-block text-center pb-0" >{{product.category}}</div>
          <div class="priceBlock" >
            <div class="product-price"
             :style="{'text-decoration': product.discount ? 'line-through' : 'none', color: product.discount ? '#7f7f7f' : 'black',fontSize: product.discount ? '12px !important' : '14px !important'}">
             {{product.price}} ₴ </div>
            <span class="ml-1" style="text-decoration: none;" v-if="product.discount">{{getDiscount(product.discount, product.price)}} ₴</span>
          </div>
          <div class="sizes">
            <div class="size ml-1 mr-1" v-for="item in product.sizes" :key="product.id + item.size">
              {{item.size}}
            </div>
          </div>
        </router-link>
      </v-card>
    </v-flex>
  </transition-group>
  <v-dialog persistent v-model="dialog">
    <v-card tile width="900px" style="margin: 0 auto" elevation="0" >
      <product-preview @close="dialog=!dialog" :is-modal="true" :product="modalProduct"></product-preview>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
import ProductPreview from "@/components/ProductPreview";
export default {
  props:{
    products: Array
  },
  components:{
    ProductPreview
  },
  name:  "list",
  data(){
    return{
      dialog: false,
      discount: null,
      modalProduct: null
    }
  },
  methods:{
    getDiscount(discount, price){
      return Math.floor( price - price * discount / 100)
    },
    toWishlist(product) {
      if (this.wishlist.includes(product)){
        this.$store.commit('REMOVE_FROM_WISHLIST', product)
      }
      else{
        this.$store.commit('ADD_TO_WISHLIST', product)
      }
    },
    showSecondImage(ev, images){
      ev.target.children[1].style.backgroundImage =  `url('${images[1].imageURL}')`
    },
    showFirstImage(ev, images){
      ev.target.children[1].style.backgroundImage =  `url('${images[0].imageURL}')`
    },
  },
  computed:{
    wishlist(){
      return this.$store.getters.getWishList
    }
  }
}
</script>
<style>
.no-focus::after{
  background-color: transparent !important;
}
</style>
