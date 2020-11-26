<template>
  <transition-group class="layout" style="flex-wrap: wrap"  name="product-animation" tag="div">
    <v-flex class="product-animation-item pl-2 mt-5 pr-2"  v-for="product in products" :key="product.id" xs4>
      <v-card elevation="0">
        <router-link :to="{
           path: $route.path +'/' + product.url,
           params: {
              productURL: product.url
           }
        }">
          <v-img
              style="cursor: pointer"
              @mouseenter="showSecondImage($event, product.images)"
              @mouseleave="showFirstImage($event, product.images)"
              :src="product.images[0].imageURL"
          ></v-img>
        </router-link>
        <div class="iconsContainer">
          <v-icon color="grey darken-2"  class="ml-4 mr-2 d-none d-lg-inline plugIcon" size="17">
            far fa-eye
          </v-icon>
          <v-dialog  persistent :retain-focus="false" v-model="dialog">
            <template v-slot:activator="{ on, attrs }">
              <v-icon color="grey darken-2"  @click="modalImages=product.images; modalProduct = product; selectedSize = ''" v-bind="attrs" v-on="on" class="ml-4 mr-2 d-none d-lg-inline" size="17">
                far fa-eye
              </v-icon>
            </template>

            <v-card tile width="900px" style="margin: 0 auto" elevation="0" >
              <v-container>
                <v-layout row>
                  <div class="col-6">
                    <v-layout row>
                      <div class="d-none d-lg-block col-3">
                        <v-img :class="{activeImage: carouselModel===i}" style="cursor: pointer" @click="carouselModel = i" v-for="(item, i) in modalProduct.images" :key="product.id + 'additionally'+ i" :src="item.imageURL">
                        </v-img>
                      </div>
                      <div class="col-lg-9 col-md-12">
                        <v-carousel show-arrows-on-hover hide-delimiters v-model="carouselModel">
                          <v-carousel-item
                              v-for="(item, index) in modalProduct.images"
                              :key="product.id +'main' + index"
                              :src="item.imageURL"
                          ></v-carousel-item>
                        </v-carousel>
                      </div>
                    </v-layout>
                  </div>
                  <div class="col-6">
                    <div class="modal product-title d-block text-center pb-0 mt-5" >{{modalProduct.title}}</div>
                    <div style="font-size: 14px" class="modal product-category d-block text-center pb-0 mt-1 black--text" >{{modalProduct.category}}</div>
                    <div class="priceBlock mt-2" >
                      <div class="product-price "
                           :style="{
                              'text-decoration': modalProduct.discount ? 'line-through' : 'none',
                              color: modalProduct.discount ? '#7f7f7f' : 'black',
                              fontSize: modalProduct.discount ? '14px !important' : '16px !important'
                           }">
                        {{modalProduct.price}} ₴ </div>
                      <span class="ml-1" style="text-decoration: none; font-size: 16px" v-if="modalProduct.discount">{{ getDiscount(modalProduct.discount, modalProduct.price)}} ₴</span>
                    </div>
                    <v-divider class="mx-4 mt-6 mb-4">''</v-divider>
                    <div style="display: flex; justify-content: center">
                      <div class="ml-2 mr-2" v-for="(item, index) in modalProduct.colors" :key="index">
                        <div style="font-size: 14px">{{item.color}}</div>
                        <div class="colorDisplay" :style="{backgroundColor:item.hex }"></div>
                      </div>
                    </div>
                    <v-divider class="mx-4 mt-6 mb-4">''</v-divider>
                    <div style="font-size: 14px" class="modal product-category d-block text-center pb-0 mt-1 black--text" >Выберите размер</div>
                    <div :class="{sizeError: sizeError }" style="display: flex; justify-content: center">
                      <div  :class="{selected: selectedSize===item.size}"
                            @click="selectedSize = item.size"
                            class="pa-2 mt-3 mr-1 ml-1"
                            v-for="item in modalProduct.sizes"
                            :key="item.size"
                            style="font-size: 14px; cursor: pointer">
                        {{item.size}}
                      </div>
                    </div>
                    <v-btn @click="toBasket" style="width: 90%; left: 5%" tile outlined class="mt-5 px-20" >Добавить в корзину</v-btn>
                    <v-btn  @click="toWishlist" color="black" dark style="width: 90%; left: 5%" tile  class="mt-5 px-20" >Добавить в избранное</v-btn>
                    <div style="font-size: 13px; font-weight: 700; color: black" class="product-category mt-3">Состав: <span style="font-weight: 500; font-size: 12px">{{modalProduct.structure.description}}</span>  </div>
                  </div>
                  <v-btn text style=" position:  absolute; right: 5px; width: min-content" @click="dialog = !dialog; sizeError= false">
                    <v-icon>
                      fas fa-times
                    </v-icon>
                  </v-btn>

                </v-layout>
              </v-container>
            </v-card>
          </v-dialog>
          <v-icon color="grey darken-2" class="toWish" :class="{filled: wishlist.includes(product)}" @click="toWishlist(product)" size="17">
            {{ wishlist.includes(product) ? 'fas fa-heart': 'far fa-heart'}}
          </v-icon>
        </div>

        <v-divider class="mx-4 mt-2 mb-2">''</v-divider>
        <router-link style="cursor: pointer" tag="div" to="/">
          <div class="product-title d-block text-center pb-0" >{{product.title}}</div>
          <div class="product-category d-block text-center pb-0" >{{product.category}}</div>
          <div class="priceBlock" >
            <div class="product-price "
                 :style="{
                        'text-decoration': product.discount ? 'line-through' : 'none',
                        color: product.discount ? '#7f7f7f' : 'black',
                        fontSize: product.discount ? '12px !important' : '14px !important'
                      }">
              {{product.price}} ₴ </div>
            <span class="ml-1" style="text-decoration: none;" v-if="product.discount">{{ getDiscount(product.discount, product.price)}} ₴</span>
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
</template>

<script>
export default {
  props:{
    products: Array
  },
  name:  "list",
  data(){
    return{
      carouselModel: 0,
      sizeError: false,
      selectedSize: '',
      modalProduct: {
        color:{},
        structure:{}
      },
      dialog: false,
      discount: null,
      wishlist: [],
    }
  },
  methods:{
    getDiscount(discount, price){
      return price -  discount * price
    },
    toBasket(){
      if (this.selectedSize === ''){
        this.sizeError = true
      }
      else{
        this.dialog = false
      }
    },
    toWishlist(){
      this.dialog = false
      this.sizeError = false
      /*
      if (this.wishlist.includes(product)){
        let index = this.wishlist.indexOf(product);
        if (index !== -1) {
          this.wishlist.splice(index, 1);
        }
      }
      else{
        this.wishlist.push(product)
      }
       */
    },
    showSecondImage(ev, images){
      ev.target.children[1].style.backgroundImage =  `url('${images[1].imageURL}')`
    },
    showFirstImage(ev, images){
      ev.target.children[1].style.backgroundImage =  `url('${images[0].imageURL}')`
    },
  }
}
</script>
