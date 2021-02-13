<template>
  <div v-scroll="scroll">
    <transition name="scroll">
      <v-btn v-if="scrollArrowVisibility" @click="scrollToBottom" class="scroll" icon width="55" height="55">
        <v-icon size="35" color="black">fas fa-long-arrow-alt-down</v-icon>
      </v-btn>
    </transition>
    <v-container>
      <v-card ref="basket" :min-height="basketHeight"  class="basket rounded-0 " elevation="2" >
        <div class="basketTitle">
          <h1 class="px-12 py-3 black--text font-weight-medium ma-0">{{currentTitle}}</h1>
        </div>
        <v-window v-model="step">
          <v-window-item  :value="1">
            <v-row class="pt-6 px-10" style="position: relative; z-index: 2;">
              <v-col sm="7">
                <v-row class="pr-8 pl-6">
                  <v-col class="header" sm="3">
                    <div data-aos="fade-right" class="headerContent">
                      Изображение
                    </div>
                  </v-col>
                  <v-col  class="header"  sm="7">
                    <div data-aos="fade-right" class="headerContent">
                      Информация
                    </div>
                  </v-col>
                  <v-col class="header" sm="2">
                    <div data-aos="fade-right"  class="headerContent">
                      Цена
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col sm="5">
                <v-row>
                  <v-col class="header" sm="12">
                    <div data-aos="fade-right" class="headerContent">
                      Оформление
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="px-10 pt-2">
              <v-col sm="7">
                <v-list color="transparent" style="z-index: 2; position:relative;" nav dense>
                  <v-list-item data-aos="zoom-in"  @mouseenter="activeId = index" @mouseleave="activeId = null" class="productListItem mb-8 px-0 " v-for="(item, index) in fetchedBasket" :key="index">
                    <v-card  style="transition: .3s; width: 100%" :elevation="activeId !== null && activeId === index ? 4 : 2" class="px-4 pr-6 rounded-lg">
                      <v-row>
                        <transition name="remove">
                          <v-btn v-if="activeId !== null && activeId === index"  class="removeItem" icon width="35" height="35">
                            <v-icon size="25" color="black">fas fa-times</v-icon>
                          </v-btn>
                        </transition>
                        <v-col data-aos="zoom-in" sm="3" style="display: flex; justify-content: center" >
                          <v-img  data-aos="zoom-in"  :src="item.images[0].imageURL"></v-img>
                        </v-col>
                        <v-col sm="7">
                          <div class="product px-4 py-5 productInfo">
                            <p class="productTitle">Футболка</p>
                            <p class="selectedSize">Материалы: <span>100% саржа</span></p>
                            <p class="selectedSize">Цвет: <span>Черно-белый</span></p>
                            <p class="selectedSize mb-0">Выбранный размер: <span>XXL</span></p>
                          </div>
                        </v-col>
                        <v-col sm="2">
                          <div data-aos="zoom-in" class="product">
                            <div class="productPrice mt-1 mb-3">
                              <span v-if="item.discount" class="discount">{{item.price}}</span>
                              {{item.totalPrice}} ₴
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col class="total  mt-2 mb-10">
                <v-card data-aos="zoom-in" data-aos-delay="800" data-aos-duration="400"  width="380" height="min-content" class="total d-block  rounded-lg checkout pt-5 mb-8">
                  <h1 style="font-size: 20px; text-transform: none" class="px-8 black--text mb-4">
                    Найдено товаров:
                    <span class="productCount white--text">{{fetchedBasket.length}}</span>
                  </h1>
                  <h1 style="font-size: 20px; text-transform: none" class="px-8 black--text mb-4">
                    Общая стоимость:
                    <span class="totalPrice black--text font-weight-bold">{{totalPrice}} ₴</span>
                  </h1>
                  <v-divider></v-divider>
                  <v-expansion-panels v-model="code" class="my-1">
                    <v-expansion-panel>
                      <v-expansion-panel-header class="code pl-8">
                       ПРОМОКОД
                      </v-expansion-panel-header>
                      <v-expansion-panel-content >
                        <p class="mb-5 px-2">Код, предоставляющий доступ к эксклюзивным промоакциям</p>
                        <v-text-field class="pl-2 pr-2 rounded-t-0"  icon="fas fa-chevron-right" hide-details filled color="black" placeholder="Введите код"></v-text-field>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                  <v-btn block class="rounded-0 " @click="step = 2" dark color="red accent-4" height="55">
                    Перейти к оформлению
                    <v-icon  size="15" class="ml-2">fas fa-chevron-right</v-icon>
                  </v-btn>
                </v-card>
                <v-card class="total" data-aos="zoom-in" data-aos-delay="800" data-aos-duration="400" width="380" >
                  <h1 class="px-8 alert black--text py-4">
                   <v-icon size="24" class="mr-2" color="red accent-4">fas fa-exclamation</v-icon>
                    На данный момент перевозка ничошных товаров осуществляется исключительно поставщиком услуг логистики "Новая Почта".
                  </h1>
                </v-card>
              </v-col>
            </v-row>
          </v-window-item>
          <v-window-item style="position: relative; z-index: 4" :value="2">
              <v-btn text class="mb-10 mt-6 px-8 ml-12 back" @click="step = 1">
                <v-icon size="24" class="mr-4">
                  fas fa-long-arrow-alt-left
                </v-icon>
                Назад
              </v-btn>
            <v-row class="px-12">
              <v-col sm="12">
                <v-card class="mb-6 px-8 pt-6 pb-4 ">
                  <h1 class="deliveryHeader mb-4">E-mail</h1>
                  <p class="deliveryText">Вы делаете заказ от лица <span class="font-weight-bold">pospgv14@gmail.com</span></p>
                </v-card>
              </v-col>
              <v-col class="" sm="12">
                <v-card class="mb-10 px-8 pt-6 pb-4 ">
                  <h1 class="deliveryHeader mb-4">Доставка</h1>
                  <p class="deliveryText mb-7">Введите данные доставки</p>
                  <v-row>
                    <v-col class="" sm="6">
                      <v-text-field
                          filled
                          label="Имя"
                          hide-details
                          height="60"
                          color="black"
                      ></v-text-field>
                    </v-col>
                    <v-col class="" sm="6">
                      <v-text-field
                          hide-details
                          filled
                          height="60"
                          label="Фамилия"
                          color="black"
                      ></v-text-field>
                    </v-col>
                    <v-col class="" sm="6">
                      <v-text-field
                          hide-details
                          filled
                          height="60"
                          label="Телефон"
                          color="black"
                      ></v-text-field>
                    </v-col>
                    <v-col class="" sm="12">
                      <v-autocomplete
                          filled
                          color="black"
                          v-model="city"
                          :loading="loading"
                          :items="Presents"
                          :search-input.sync="search"
                          cache-items
                          hide-no-data
                          hide-details
                          single-line
                          label="Ваш город"
                      ></v-autocomplete>
                    </v-col>
                    <v-col class="mb-5" sm="12">
                      <v-select
                          filled

                          hide-details
                          single-line
                          color="black"
                          :items="Warehouses"

                          label="Выберите отделение"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>



            </v-row>
          </v-window-item>
        </v-window>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: "Basket",
  data(){
    return{
      code: 0,
      fetchedBasket: [],
      step: 2,
      scrollArrowVisibility: false,
      activeId: null,
      currentScrollY: 0,
      basketHeight: 0,
      loading: false,
      search: null,
      city: null,
      Addresses: [],
      Presents: [],
      Warehouses: [],
      message: ''
    }
  },

  created() {
    AOS.init()
    this.$store.dispatch('LOAD_BASKET').then(()=>{
      for (const productId of this.basket){
        this.fetchProduct(productId)
      }
    })
  },
  methods:{
    getOffset(el) {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      }
    },
    scroll(){
      this.scrollArrowVisibility = this.currentScrollY <= window.scrollY;
      if ( Math.round(window.scrollY + window.innerHeight ) === document.body.clientHeight){
        this.scrollArrowVisibility = false
      }
      this.currentScrollY = window.scrollY
    },
    scrollToBottom(){
       window.scroll({
        top: document.body.clientHeight,
        left: 0,
        behavior: 'smooth'
      })
    },
     fetchProduct(id){
       let raw = JSON.stringify({
         id: id,
       })
       let url = 'http://localhost/user/getProductById.php'
       let requestOptions = {
         method: 'POST',
         mode: 'cors',
         headers: {
           'Content-Type': 'application/json'
         },
         body: raw,
       }
       fetch(url, requestOptions)
           .then(response => response.json())
           .then(result => {
             if (result.status.toString() === 'OK'){
                 this.fetchedBasket.push(result.data)
             }
             if (result.status.toString() === 'ERROR'){
               this.$store.commit('SET_ERROR', result.message)
             }
           })
           .catch(error =>  this.$store.commit('SET_ERROR', error))
           .finally(() => this.$store.commit('SET_PROCESSING', false))
       },
      getWarehouses(v){
      this.Warehouses = []
      let cityRef = null
      for (const value of this.Addresses){
        if (v === value.Present){
          cityRef = value.Ref
        }
      }
      let data = {
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
          SettlementRef: cityRef
        },
        apiKey: "e5dbce62e3e50d92ec034b5a7c9d6c11"
      }
      if(cityRef !== null){
        fetch('https://api.novaposhta.ua/v2.0/json/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(result => {
              let items = []
              for (const warehouse of result.data ){
                items.push(warehouse.Description)
              }
              this.Warehouses = items
            })
      }

    },
    querySelections (v) {
      this.loading = true
      this.Warehouses = []
      let data = {
        modelName: "Address",
        calledMethod: "searchSettlements",
        methodProperties: {
          CityName: v
        }
      }
      fetch('https://api.novaposhta.ua/v2.0/json/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
        let Addresses = []
        let Presents = []
        if (result.data[0] !== undefined ){
          for (const value of Object.entries(result.data[0].Addresses)) {
            if (value[1].Warehouses>0){
              Addresses.push(value[1])
              Presents.push(value[1].Present)
            }
          }
          this.Addresses = Addresses
          this.Presents = Presents.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }
        else {
          this.loading = false
        }
      });
    },
  },
  mounted() {
    this.basketHeight =  window.innerHeight - this.getOffset(this.$refs.basket.$el).top + 5
  },
  computed:{
    totalPrice(){
      let initialValue = 0;
      return  this.fetchedBasket.reduce((accumulator, currentValue) => {
        return accumulator + parseInt(currentValue.totalPrice);
      }, initialValue)
    },
    currentTitle () {
      switch (this.step) {
        case 1: return 'Моя корзина'
        case 2: return 'Моя корзина'
        default: return 'Account created'
      }
    },
    processing(){
      return this.$store.getters.getProcessing
    },
    basket(){
      return this.$store.getters.basket.map(item =>{
        return item.product
      })
    }
  },
  watch: {
    search (val) {
      val && val !== this.select && this.querySelections(val)
    },
    city(val){
      this.getWarehouses(val)
    }
  },
}
</script>

<style scoped>
.v-label.v-label--active.theme--light {
  font-weight: 400;
}
/deep/.v-label.theme--light{
  font-weight: 400;
  top: 22px;
}
/deep/.v-text-field__slot {
  font-weight: 500;
}
/deep/.v-input.v-input--hide-details.v-input--is-label-active.v-input--is-dirty.theme--light.v-text-field.v-text-field--filled.v-text-field--is-booted.v-text-field--enclosed {
  font-family: "Montserrat";
}
/deep/.v-text-field--filled .v-label--active, .v-text-field--full-width .v-label--active {
  transform: translateY(-12px) scale(0.75);
}
/deep/.v-text-field > .v-input__control > .v-input__slot::before {
  border: none !important;
}
.deliveryHeader{
  font-size: 26px !important;
  font-weight: 500;
  font-family: "Montserrat" !important;
}
.deliveryText{
  font-size: 16px !important;
  font-weight: 400;
  font-family: "Montserrat" !important;
}
.phone {
  width: 100%;
  height: 100%;
  border: 1px solid #909090;
  border-radius: 4px;
  text-indent: 15px;
  font-weight: normal;
}
.phone:focus {
  border: 2px solid black;
  border-radius: 4px;
  outline: none;
}
.phoneLabel {
  position: absolute;
  top: -9px;
  font-size: 12px;
  background-color: white;
  left: 7px;
  padding: 0 3px;
}

.alert{
  font-size: 16px !important;
  font-weight: 500;
  font-family: "Montserrat" !important;
}
/deep/.back{
  text-align: center;
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 14px;
  text-transform: none;
}
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,300&display=swap');
/deep/.v-expansion-panel:before {
  box-shadow: none !important;
}
.total{
  display: block;
  margin: 0 auto;
}
.checkout{
/*  position: fixed;
  top: 50%;*/
  z-index: 2;
}
.code{
  font-size: 18px;
  font-weight: 500;
  font-family: "Montserrat" !important;
}
/deep/.v-expansion-panel p{
  font-size: 14px !important;
  font-weight: 500;
  font-family: "Montserrat" !important;
}
/deep/.rounded-0.checkout.v-btn.v-btn--block.v-btn--contained.theme--light.v-size--default.tomato {
  background-color: #d00000;
  color: white;
  font-size: 20px;
  font-family: "Montserrat" !important;
  font-weight: 600;
}
/deep/.v-image__image--cover{
  background-size: contain!important;
}
.scroll-enter-active {
  transition: all .3s ease;
}
.scroll-leave-active {
  transition: all .8s ease;
}
.scroll-enter, .scroll-leave-to {
  transform: scale(0);
  opacity: 0;
}
.scroll-enter-active {
  transition: all .3s ease;
}
.remove-leave-active {
  transition: all .8s ease;
}
.remove-enter, .remove-leave-to {
  transform: scale(0);
  opacity: 0;
}
.totalPrice{
  margin-left: 5px;
}
span.productCount {
  position: relative;
  margin-left: 15px;
  font-weight: 600;
  font-size: 17px;
}
span.productCount::after {
  content: '';
  background-color: #e00000;
  width: 25px;
  height: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: -1;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 50%;
  font-weight: 600;
}
.basketTitle{
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  font-size: 24px;
  font-family: "Montserrat";
  background-position: 0% 0%;
  background-repeat: repeat;
  background-attachment: scroll;
  background-image: linear-gradient(-90deg, #fcfcfc 0%, #fff 100%);
  background-size: auto;
  background-origin: padding-box;
  background-clip: border-box;
  border-bottom: 2px solid #ebebeb;
  font-weight: 400;
  text-transform: uppercase;
}
.removeItem{
  position: absolute;
  z-index: 1;
  right: 10px;
  top: 5px;
}
.basket{
  overflow: hidden;
  position: relative;
}
/*.basket:after{
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  background: linear-gradient(-25deg , transparent 45%, rgb(250, 250, 250) 0%);
}*/
.basket::before{
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  background: linear-gradient(75deg ,rgb(255, 255, 255) 45%, rgb(246, 246, 246) 0%);
}
.header{
  text-align: center;
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 14px;
  display: flex;
  justify-content: center;
}
.headerContent{
  position: relative;
}
.headerContent::after{
  content: '';
  border-bottom: 2px solid #444;
  position: absolute;
  top: 8px;
  left: 50%;
  display: block;
  width: 0%;
  height: 100%;
  transform: translateX(-50%);
  animation: expand 1s forwards 2s;
}
@keyframes expand {
  100%{
    width: 125%;
  }
}
.discount{
  text-decoration: line-through;
  margin-right: 2px;
  color: #aaa;
}
.selectedSize{
  font-weight: 400;
}
.selectedSize span {
  margin-left: 5px;
  font-weight: 700;
}
.product {
  font-family: "Montserrat";
  font-weight: 500;
  text-align: center;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.productListItem{
  transition: .3s;
}
.productListItem:hover {
  cursor: pointer;
  transform: scale(1.01);
  transition: .3s;
}
.productTitle {
  font-size: 17px;
  font-weight: 500;
  text-transform: uppercase;
}
.scroll{
  position: fixed;
  bottom: 30px;
  right: 30px;
}
.productDescription {
  font-weight: 400;
  font-size: 16px !important;
}

</style>