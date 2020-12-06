<template>
<h1> <v-container>
  <v-layout row>
    <div class="col-6">
      <v-layout row>
        <div class="d-none d-lg-block col-3">
          <v-img :class="{activeImage: carouselModel===i}" style="cursor: pointer" @click="carouselModel = i" v-for="(item, i) in product.images" :key="i" :src="item.imageURL">
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </div>
        <div class="col-lg-9 col-md-12">
          <v-carousel show-arrows-on-hover hide-delimiters v-model="carouselModel">
            <v-carousel-item v-for="(item, i) in product.images" :key="i" >
              <v-img :src="item.imageURL">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-carousel-item>
          </v-carousel>
        </div>
      </v-layout>
    </div>
    <div class="col-6">
      <div class="modal product-title d-block text-center pb-0 mt-5" >{{product.title}}</div>
      <div style="font-size: 14px" class="modal product-category d-block text-center pb-0 mt-1 black--text" >{{product.category}}</div>
      <div class="priceBlock mt-4" >
        <div class="product-price"
             :style="{'text-decoration': product.discount ? 'line-through' : 'none',color: product.discount ? '#7f7f7f' : 'black',fontSize: product.discount ? '14px !important' : '16px !important'}">
          {{product.price}} ₴ </div>
        <span class="ml-1" style="text-decoration: none; font-size: 16px" v-if="product.discount">{{getDiscount(product.discount, product.price)}} ₴</span>
      </div>
      <v-divider class="mx-4 mt-4 mb-4">''</v-divider>
      <div style="display: flex; justify-content: center">
        <div class="ml-2 mr-2" v-for="(item, index) in product.colors" :key="index">
          <div style="font-size: 14px">{{item.color}}</div>
          <div class="colorDisplay" :style="{backgroundColor:item.hex }"></div>
        </div>
      </div>
      <v-divider class="mx-4 mt-6 mb-4">''</v-divider>
      <div style="font-size: 14px" class="modal product-category d-block text-center pb-0 mt-1 black--text" >Выберите размер</div>
      <div :class="{sizeError: sizeError }" style="display: flex; justify-content: center">
        <div :class="{selected: selectedSize===item.size}"
              @click="selectedSize = item.size"
              class="pa-2 mt-3 mr-1 ml-1"
              v-for="item in product.sizes"
              :key="item.size"
              style="font-size: 14px; cursor: pointer">
          {{item.size}}
        </div>
      </div>
      <v-btn color="black" @click="toBasket" style="width: 90%; left: 5%" tile outlined class="mt-5 px-20" >Добавить в корзину</v-btn>
      <v-btn @click="toWishlist" dark style="width: 90%; left: 5%" tile  class="mt-5 px-20" >Добавить в избранное</v-btn>
      <div style="font-size: 13px; font-weight: 700; color: black" class="product-category mt-3">Состав: <span style="font-weight: 500; font-size: 12px">{{product.structure.description}}</span>  </div>
    </div>
    <v-btn v-if="isModal" text style="position: absolute; right: 5px; width: min-content" @click="closeModal">
      <v-icon>
        fas fa-times
      </v-icon>
    </v-btn>
  </v-layout>
</v-container></h1>
</template>

<script>
export default {
  name: "ProductPreview",
  props:{
    product: {
      type: Object,
      required: true
    },
    isModal: {
      type: Boolean,
      required: false
    }
  },
  data(){
    return{
      carouselModel: 0,
      sizeError: false,
      selectedSize: null,
      discount: null,
    }
  },
  methods:{
    getDiscount(discount, price){
      return price -  discount * price
    },
    toBasket(){
      if (this.selectedSize === null){
        this.sizeError = true
      }
      else if (this.isModal){
        this.closeModal()
      }
    },
    closeModal(){
      this.$emit('close')
      this.sizeError = false
      this.selectedSize = null
    },
    toWishlist(){
      if (this.wishlist.includes(this.product)){
       this.$store.commit('REMOVE_FROM_WISHLIST', this.product)
      }
      else{
        this.$store.commit('ADD_TO_WISHLIST', this.product)
      }
      if (this.isModal){
        this.closeModal()
      }
    }
  },
  computed: {
    wishlist(){
      return this.$store.getters.getWishList
    }
  }

}
</script>

<style scoped>
.activeImage{
  border: 1px solid #272727;
  transform: scale(0.9);
}
.colorDisplay {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  margin: 5px auto 0;
  position: relative;
  border: 1px solid;
}
.sizeError{
  color: red;
  animation-name: sizeErrorAnim;
  animation-iteration-count: 1;
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
}
@keyframes sizeErrorAnim {
  0% {
    transform: translateX(0px);
  }
  33% {
    transform: translateX(-10px);
  }
  66%{
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0px);
  }
}
.priceBlock{
  display: flex;
  justify-content: center;
  margin: 2px 0;
}
.priceBlock span{
  font-size: 14px ;
  font-weight: 300 !important;
}

.selected{
  border: 1px solid black;
}

</style>