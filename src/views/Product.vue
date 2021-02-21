<template>
  <v-container>
    <v-row>
      <v-col class="px-10" sm="8">
        <v-layout row >
          <div class="imageContainer col-3 pr-0">
            <v-img width="70" height="90" class="my-3 " :class="{activeImage: carouselModel===i}" style="cursor: pointer" @click="carouselModel = i" v-for="(item, i) in product.images" :key="i" :src="item.imageURL">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </div>
          <div class="col-lg-9 col-md-12 pt-0 pa-10">
            <v-carousel height="min-content" show-arrows-on-hover hide-delimiters v-model="carouselModel">
              <v-carousel-item  v-for="(item, i) in product.images" :key="i" >
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
      </v-col>
      <v-col class="pt-4" sm="4">
        <p class="productName">{{product.name}}</p>
        <div class="priceBlock mb-5">
          <p class="standardPrice withDiscount" v-if="product.discount">
            <span class="oldPrice"> {{getOldPrice(product.totalPrice, product.discount)}}</span>
            {{product.totalPrice}}₴
            <span class="discount">(-{{product.discount}}%)</span></p>
          <p class="standardPrice" v-else>{{product.totalPrice}} ₴</p>
        </div>
        <v-alert class="pt-8 px-7" width="310" color="#d4ebf2">
          <v-icon size="20" class="mr-4 mt-0">fas fa-tag</v-icon>
          <p>ПОЛУЧИТЕ СКИДКУ 15% НА ВСЕ!
            <br/>
            С кодом: <span class="promo">NCHSHN</span></p>
        </v-alert>
        <p class="color mt-5">Цвет: <span>{{product.colors[0].color}}</span></p>
        <p class="color mt-2">Выберите размер</p>
        <div ref="sizeContainer" class="sizeContainer">
          <v-btn :class="{selectedSize: item.size === selectedSize}" @click="selectedSize = item.size" text class="sizeItem mr-2 pa-4" v-for="(item, index) in product.sizes" :key="index">
            {{item.size}}
          </v-btn>
        </div>
        <p class="rightSize mt-5">Как выбрать нужный размер?</p>
        <v-btn ref="basketButton" @click="addToBasket" style="font-size: 17px" large dark class="px-8 py-7 mt-3">{{basketButton}}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Velocity from "velocity-animate";
export default {
  props:{
    productURL: String,
    product: Object
  },
  name: "Product",
  data(){
    return{
      carouselModel: 0,
      sizeError: false,
      selectedSize: null,
      discount: null,
      added: false
    }
  },
  methods:{
    addToBasket(){
      if (this.selectedSize){
        if (!this.added){
          this.$store.dispatch('ADD_TO_BASKET', {
            productId: this.product.id,
            selectedSize: this.selectedSize
          })
          this.added = true
        }
        else {
          Velocity(this.$refs.basketButton.$el, {scale: 1.2}, {duration: 100})
          Velocity(this.$refs.basketButton.$el, {scale: 1}, {duration: 100})
        }

      }
      else {
        Velocity(this.$refs.sizeContainer, { color: "#d20000"}, {duration: 100})
        Velocity(this.$refs.sizeContainer, { translateX: -10}, {duration: 100})
        Velocity(this.$refs.sizeContainer, { translateX: 10}, {duration: 100})
        Velocity(this.$refs.sizeContainer, { translateX: 0}, {duration: 100})
        Velocity(this.$refs.sizeContainer, { color: "red"}, {duration: 100})
      }
    },
    getOldPrice(price, discount){
      return price - discount * price / 100
    }
  },
  created() {
    if (!this.product){
      this.$store.dispatch('GET_PRODUCT_BY_URL', {url: this.productURL}).then(product => this.product = product)
    }
  },
  computed:{
    basketButton(){
      return !this.added ? 'добавить в корзину' : 'добавлено'
    },
    error(){
      return this.$store.getters.getError
    },
    processing(){
      return this.$store.getters.getProcessing
    },
  },
  watch:{
    selectedSize(){
      Velocity(this.$refs.sizeContainer, { color: "#000000"}, {duration: 100})
    }
  }
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,300&display=swap');
*{
  box-sizing: border-box;
}
/deep/.sizeItem.v-btn{
  color: inherit !important;
}
/deep/.v-alert__content {
  display: flex;
}
.rightSize{
  font-size: 16px;
  text-decoration: underline;
  font-weight: 400;
}

/deep/.v-btn.sizeItem{
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  font-weight: 500;
  min-width: 0 !important;
  width: min-content;
}
.selectedSize{
  border: 2px solid #444;
  font-size: 15px;
}
.standardPrice{
  font-size: 24px;
  font-weight: 600;
}
.color, .size{
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 500;
}
.color span{
  text-transform: none;
  font-weight: 400;
  margin-left: 5px;
}
.promo{
  font-weight: 700;
  margin-left: 5px;
}
.standardPrice.withDiscount{
  font-size: 24px;
  font-weight: 600;
  color: #d90000 !important;
}
.oldPrice{
  font-size: 20px;
  text-decoration: line-through;
  font-weight: 400;
  color: #909090;
  margin-right: 2px;
}
.discount{
  font-weight: 500;
  font-size: 18px;
}
p{
  font-family: 'Montserrat', sans-serif;
}
.productName{
  font-size: 24px;
  font-weight: 500;
}
/deep/.v-image.v-responsive{
  flex: unset;
}
.imageContainer{
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
/*.v-image__image--cover {
  background-size: auto;
}*/
/deep/.v-window.v-item-group.theme--dark.v-window--show-arrows-on-hover.v-carousel {
  width: min-content;
}
.wideContainer{
  display: flex; justify-content: space-between; width: 100%; padding: 0 60px
}
</style>