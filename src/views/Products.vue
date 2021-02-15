<template>
  <div class="wideContainer">
    <div  class="bigLogo">Ничошный</div>
    <div class="productsCount">{{productsCount}} товаров</div>
    <v-container class="pa-0">
      <v-dialog width="1200px" persistent v-model="dialog">
        <v-card tile width="1200px" style="margin: 0 auto" elevation="0" >
          <product-preview @close="dialog=!dialog" :is-modal="true" :product="modalProduct"></product-preview>
        </v-card>
      </v-dialog>
      <v-row style="min-height: calc(100vh - 74px);">
        <v-col ref="productsPanel" class="pb-0" sm="8">
          <v-card color="transparent" elevation="0" min-height="100%" class="rounded-b-0" width="100%">
<!--            <v-row v-if="processing" class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular size="60" indeterminate color="black lighten-5"></v-progress-circular>
            </v-row>-->
            <v-row  data-aos="fade-up"  v-if="products.length <= 0 && !processing" class="fill-height ma-0 notFound" align="center" justify="center">
                  Ничего не найдено ...
            </v-row>
            <v-container  v-scroll="handleScroll" class="px-0">
              <v-row class="pt-4">
                <v-col class="mb-10 ml-2" sm="12">
                    <div v-if="categoryInfo.category" data-aos="fade-up"  class="categoryTitle">{{categoryInfo.category}}</div>
                </v-col>
                <v-col sm="12">
                  <v-row v-if="products.length>0">
                    <v-col v-product-ref  class="px-5" data-aos="fade-up" sm="4" :key="index" v-for="(product, index) in products">
                      <v-card :style="{background: createBackground(index)}" @click="modalProduct = product; dialog = true" style="cursor: pointer" elevation="1" class="px-5 pb-0 pt-6 rounded-0" width="100%" >
                        <v-img min-height="250" @mouseenter="increaseImage"  @mouseleave="decreaseImage" :src="product.images[0].imageURL">
                          <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                              <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
                            </v-row>
                          </template>
                        </v-img>
                      </v-card>
                      <div class="productTitle mt-3">{{product.name}}</div>
                      <div class="productPrice mt-1 mb-3"><span v-if="product.discount" class="discount">{{product.price}}</span> {{product.totalPrice}} ₴</div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col ref="filterPanel" v-scroll="fixFilterPanel" class="pb-0 pl-10" sm="4">
          <v-card color="transparent" elevation="0" class="rounded-b-0 px-10 pt-9" min-height="100%" width="100%">
            <v-expansion-panels v-model="sortPanel" accordion>
            <v-expansion-panel>
              <v-expansion-panel-header class="sorting">
                Сортировать
                <span class="ml-3 sortingChevron">
                  <v-icon ref="sortingChevron" size="11">
                    fas fa-chevron-down
                  </v-icon>
                </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list color="transparent" class="py-0">
                  <v-list-item class="px-0">
                    <v-btn style="overflow: hidden" outlined class="novelties text-uppercase">Новинки
                      <span ref="noveltiesBadge" class="noveltiesBadge">New</span>
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
            </v-expansion-panels>
            <div class="filtering mt-14 pt-3 mb-2">Фильтрация</div>
<!--            <v-btn outlined class="mt-5" @click="shuffle">Перемещать</v-btn>-->
            <v-expansion-panels accordion multiple>
              <v-expansion-panel >
                <v-expansion-panel-header >
                  Цвета
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div style="display: flex; flex-wrap: wrap">
                    <div style="position: relative"
                         :style="{backgroundColor: color.hex}" class="color mr-6 my-1" :key="index" v-for="(color, index) in filters.colors"
                         :class="{activeColor: colorFilter.includes(color.url)}"
                         @click="handleFilter(color.url, 'colorFilter')">
                    </div>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Размеры
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div style="display: flex; flex-wrap: wrap">
                    <v-btn :color="sizeFilter.includes(item.size) ? 'white': 'black'" outlined elevation="0" @click="handleFilter(item.size, 'sizeFilter')"
                           :class="{activeFilter: sizeFilter.includes(item.size)}"
                           class="size mr-3 my-1" :key="index" v-for="(item, index) in filters.sizes">
                      {{item.size}}
                    </v-btn >
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  Компоненты
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div style="display: flex; flex-wrap: wrap">
                    <v-btn :color="componentsFilter.includes(item.url)?'white': 'black'" outlined elevation="0" @click="handleFilter(item.url, 'structureFilter')"
                           :class="{activeFilter: componentsFilter.includes(item.url)}"
                           class="component mr-3 my-1" :key="index" v-for="(item, index) in filters.components">
                      {{item.component}}
                    </v-btn>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel v-if="filters.maxPrice !== filters.minPrice">
                <v-expansion-panel-header>
                  Цена
                </v-expansion-panel-header>
                <v-expansion-panel-content class="pl-3 pr-4 ">
                  <v-nus show-thumb :config="config" v-model="values" />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-col>

      </v-row>
    </v-container>
  </div>

</template>
<script>
import ProductPreview from "@/components/ProductPreview";
import Lodash from "lodash"
import Velocity from "velocity-animate";
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  props: {
    categoryURL: String,
  },
  name: 'Products',
  components: {
    ProductPreview
  },
  directives: {
    productRef: {
      inserted(el, binding, vnode) {
        vnode.context.$store.dispatch('ADD_PRODUCTS_REF', el)
      }
    }
  },

  data: function () {
    return {
      sortPanel: [],
      priceInit: false,
      filterInit: false,
      dialog: false,
      modalProduct: {},
      config: {
        filtered: false,
        fixed: true,
        tooltips: true,
        connect: [true, true, true],
        step: 5,
        connectColors: ["gray", "black", "gray"],
        range: {
          min: 0,
          max: 100
        }
      },
      showSlider: true,
      values: [25, 75],
      sizeFilter: [],
      colorFilter: [],
      componentsFilter: [],
    }
  },
  methods: {
   async scrollToTop(){
       await  window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
    },
    createBackground(index){
      index++
      if(Math.floor(index%3) === 0){
        return 'white'
      }
      else {
        return '#f5f5f5'
      }
    },
    getOffset(el) {
      const rect = el.getBoundingClientRect();
      return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
      }
    },
    handleScroll(){
      window.scrollY + window.innerHeight >= document.body.clientHeight - 100 ? this.processing ? undefined: this.getProducts() : undefined
    },
    fixFilterPanel () {
      let height = this.$refs.filterPanel.clientHeight
      let width = this.$refs.filterPanel.clientWidth
      if (window.scrollY > 75) {
        this.$refs.filterPanel.setAttribute(
            'style',
            `position: fixed; top: 0; left: ${this.getOffset(this.$refs.filterPanel).left}px; height: ${height}px; width: ${width}px`
        )
      }
      else{
        this.$refs.filterPanel.setAttribute(
            'style',
            'position: static;'
        )
      }
    },
    increaseImage(evt){
      Velocity(evt.target, { scale: 1.1}, {duration: 300})
    },
    decreaseImage(evt){
      Velocity(evt.target, { scale: 1}, {duration: 300})
    },
    handleFilter(item, filter){
      let index = this[filter].indexOf(item);
      if (index !== -1) {
        this[filter].splice(index, 1);
      }
      else{
        this[filter].push(item)
      }
    },
    shuffle(){
      this.products = Lodash.shuffle(this.products)
    },
    getProducts() {
      this.$store.dispatch('GET_PRODUCTS', {
        categoryURL: this.categoryURL,
        filter: {
          price: Lodash.isEqual(this.values[0], this.values[1]) ? [] : [0, 100],
          components: this.structureFilter,
          colors: this.colorFilter,
          sizes: this.sizeFilter
        },
      })
    },
    handleFilteringQuery() {
      let sizes = []
      let colors = []
      let structures = []
      if (this.$route.query.size !== undefined) {
        for (let obj of this.filters.sizes) {
          sizes.push(obj.size)
        }
        for (let sizeFilter of this.$route.query.size.split(',')) {
          if (sizeFilter.includes('x')) {
            sizeFilter = sizeFilter.replace('x', '×')
          }
          if (sizes.includes(sizeFilter)) {
            this.sizeFilter.push(sizeFilter)
          }
        }
      }
      if (this.$route.query.color !== undefined) {
        for (let obj of this.filters.colors) {
          colors.push(obj.url)
        }
        for (let colorFilter of this.$route.query.color.split(',')) {
          if (colors.includes(colorFilter)) {
            this.colorFilter.push(colorFilter)
          }
        }
      }
      if (this.$route.query.structure !== undefined) {
        for (let obj of this.filters.components) {
          structures.push(obj.url)
        }
        for (let structureFilter of this.$route.query.structure.split(',')) {
          if (structures.includes(structureFilter)) {
            this.structureFilter.push(structureFilter)
          }
        }
      }
    },
    setQueryParams() {
      let queriesCount = 0
      let path = ''
      history.pushState(
          {},
          null,
          this.$route.path
      )
      Object.keys(this.$route.query).forEach(query => {
        if (queriesCount === 0) {
          path += `?${query}=${this.$route.query[query]}`
        } else {
          path += `&${query}=${this.$route.query[query]}`
        }
        if (queriesCount === 0) {
          queriesCount++
        }
      });
      history.pushState(
          {},
          null,
          path
      )
    },
  },
  computed: {
    categoryInfo() {
      let categories = this.$store.getters.categories
      let categoryInfo = {
        description: '',
        category: ''
      }
      categories.forEach(item => {
        if (item.categoryURL === this.categoryURL) {
          categoryInfo = item
        }
      })
      return categoryInfo
    },
    processing(){
      return this.$store.getters.getProcessing
    },
    productsCount(){
      return this.$store.getters.productsCount
    },
    products:{
      get() {
        return this.$store.getters.products
      },
      set(newValue) {
        this.$store.commit('shuffleProducts', newValue)
      }

    },
    filters() {
      return this.$store.getters.filters
    },
  },
  mounted() {
   /* this.$refs.productsPanel.style.transform = `translateY(${this.$refs.productsPanel.clientHeight}px)`
    Velocity(this.$refs.productsPanel, { translateY: [0, this.$refs.filterPanel.clientHeight]}, {duration: 2000, delay: 0})
    this.$refs.filterPanel.style.transform = `translateY(${this.$refs.filterPanel.clientHeight}px)`
    Velocity(this.$refs.filterPanel, { translateY: [0, this.$refs.filterPanel.clientHeight]}, {duration: 2000, delay: 500})*/

  },
  created() {
    AOS.init();
    this.$store.dispatch('GET_FILTERS', {
      categoryURL: this.categoryURL
    }).then(() => {
      this.config.range.max = this.$store.getters.filters.maxPrice
      this.config.range.min = this.$store.getters.filters.minPrice
      if (this.$route.query.price === undefined || (this.$route.query.price.split(',')[0] < this.config.range.min
          && this.$route.query.price.split(',')[1] < this.config.range.min)) {
        this.values = [this.$store.getters.filters.minPrice, this.$store.getters.filters.maxPrice]
      } else {
        this.values = [this.$route.query.price.split(',')[0], this.$route.query.price.split(',')[1]]
      }
      this.priceInit = true
      if (Object.keys(this.$route.query).length === 0) {
        this.getProducts()
      } else {
        this.handleFilteringQuery()
      }
    })
  },
  watch:{
    sortPanel(value){
      if (value === 0){
        Velocity(this.$refs.sortingChevron.$el, {rotateZ: ["-180deg"]}, {duration: 100})
      }
      if (value === undefined){
        Velocity( this.$refs.sortingChevron.$el, {rotateZ: ["0deg"] }, {duration: 100 })
      }
    },
    sizeFilter: {
      handler: function (value) {
        if (value.length === 0) {
          delete this.$route.query.size
        } else {
          let replaced = []
          for (let size of value) {
            if (size.includes('×')) {
              size = size.replace('×', 'x')
            }
            replaced.push(size)
          }
          this.$route.query.size = replaced.join()
        }
        this.setQueryParams()
        this.scrollToTop().then(()=>{
          this.$store.dispatch('CLEAR_LIST').then(()=>{
            this.getProducts()
          })
        })
      },
      deep: true
    },
    colorFilter: {
      handler: function (value) {
        if (value.length === 0) {
          delete this.$route.query.color
        } else {
          this.$route.query.color = value.join()
        }
        this.setQueryParams()
        this.scrollToTop().then(()=>{
          this.$store.dispatch('CLEAR_LIST').then(()=>{
            this.getProducts()
          })
        })
      },
      deep: true
    },
    structureFilter: {
      handler: function (value) {
        if (value.length === 0) {
          delete this.$route.query.structure
        } else {
          this.$route.query.structure = value.join()
        }
        this.setQueryParams()
        this.scrollToTop().then(()=>{
          this.$store.dispatch('CLEAR_LIST').then(()=>{
            this.getProducts()
          })
        })
      },
      deep: true
    },
    values: {
      handler: function () {
        if ((parseInt(this.values[0]) === this.config.range.min && parseInt(this.values[1]) === this.config.range.max)
            || Number.isNaN(parseInt(this.values[1])) || Number.isNaN(parseInt(this.values[0]))) {
          delete this.$route.query.price
        }
        else {
          this.$route.query.price = [parseInt(this.values[0]), parseInt(this.values[1])].join()
        }
        if (!this.priceInit){
          this.scrollToTop().then(()=>{
            this.$store.dispatch('CLEAR_LIST').then(()=>{
              this.getProducts()
            })
          })
        }
        this.setQueryParams()
      },
      deep: true
    },
    $route() {
      this.structureFilter = []
      this.sizeFilter = []
      this.colorFilter = []
      this.values = []
    }
  },

}
</script>

<style scoped>
span.discount {
  text-decoration: line-through;
  color: #a2a2a2;
  font-weight: 400;
}
/deep/.row.fill-height.ma-0.notFound.align-center.justify-center {
  position: absolute;
  left: 30%;
  font-family: "Montserrat";
  font-size: 20px;
}
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,300&display=swap');
*{
  scroll-behavior: smooth;
}
/deep/.v-progress-circular{
  position: absolute;
  top: 50%;
}
.bigLogo {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 76px;
  position: absolute;
  color: #fff;
  transform: rotate(-90deg);
  right: -250px;
  top: 250px;
  text-transform: uppercase;
}
.noveltiesBadge {
  background-color: red;
  font-size: 9px;
  padding: 2px 10px;
  text-transform: none;
  color: white;
  font-weight: 600;
  position: absolute;
  right: -30px;
  bottom: -5px;
  transform: rotate(-45deg) ;
}
/deep/.v-list.v-sheet.theme--light {
  background-color: white;
}
/deep/.v-icon.notranslate.fas.fa-tag.theme--light.red--text {
  background: -moz-linear-gradient(top, #e72c83 0%, #a742c6 100%);
  background: -webkit-linear-gradient(top, #e72c83 0%,#a742c6 100%);
  background: linear-gradient(to bottom, #e72c83 0%,#a742c6 100%);
  background-clip: border-box;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  height: 30px;
}
.salesContainer {
  position: absolute;
  top: 22px;
  right: -41px;
  z-index: 1;
  transform-origin: left top;
  transform: rotate(230deg);
}
.salesIconRope {
  width: 1px;
  height: 25px;
  display: block;
  background-color: #000;
  transform-origin: left top;
  border: 1px solid;
}
.salesIcon::after {
  content: '10%';
  position: absolute;
  color: white;
  font-size: 8px;
  left: 10px;
  transform: rotate(45deg);
  font-weight: 900;
  top: 10px;
  letter-spacing: -1px;
}
.salesIcon{
  position: relative;
  margin-left: -2px;
  rotate: 0deg;
/*  transform: scaleX(0.7);
  rotate: -10deg;
  translate: -1px -2px;*/
}
.sales::after{
  content: '';
  position: absolute;
  bottom: 2px;
  display: block;
  right: 2px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: black;
}
/deep/.v-icon.notranslate.fas.fa-chevron-down.theme--light {
  margin-top: 1px !important;
}
/deep/.px-5.pb-0.pt-6.rounded-0.v-card.v-card--link.v-sheet.theme--light.elevation-0 {
  border: 1px solid #f5f5f5;
}

/deep/.px-5.pb-0.pt-6.v-card.v-card--link.v-sheet.theme--light.elevation-0{
  overflow: hidden;
}
/deep/.px-5.pb-0.pt-6.v-card.v-card--link.v-sheet.theme--light.elevation-0::after {
  content: '';
 /* background: #fefefebd;*/
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
/deep/.v-expansion-panel {
  background-color: transparent !important;
}
/deep/.mr-5.my-1.v-btn.v-btn--fab.v-btn--round.theme--light.elevation-0.v-size--default.activeColor{
  border-radius:  60% 40% 30% 70% / 60% 30% 70% 40%;
}
/deep/.activeColor{
  --colorRadius: 60% 40% 30% 70% / 60% 30% 60% 40%;
  --backgroundRadius:  30% 60% 70% 40% / 50% 60% 30% 60%;
  animation: morphColor 2s ease-in-out forwards;
}
.activeColor:after {
  content: '';
  display: block;
  position: absolute;
  z-index: -1;
  scale: 0;
  background-color: #ececec;
  width: 40px;
  height: 40px;
  left: -40%;
  top: -40%;
  animation: morphBackground 2s ease-in-out forwards;
}

@keyframes morphBackground {
  0% {
    scale: 0;
  }
  33%{
    border-radius:  var(--backgroundRadius);
  }
  66% {
    border-radius: var(--colorRadius);
  }
  100%{
    scale: 1;
    border-radius: var(--backgroundRadius);
  }
}
@keyframes morphColor {
  0% {
    border-radius:  50%
  }
  33%{
    border-radius:  var(--colorRadius);
  }
  66% {
    border-radius: var(--backgroundRadius);
  }
  100%{
    border-radius: var(--colorRadius);
  }
}

.activeFilter{
  background-color: #1e1e1e;
  transition: .2s;
  color: white;
}
/deep/.noUi-tooltip {
  color: black;
  font-size: 13px;
  background-color: white !important;
  border: none !important;
  height: 15px;
}
/deep/.noUi-handle {
  background-color: white !important;
  border: 1px solid !important;
  cursor: pointer !important;
}
/deep/.noUi-target {
  margin: 40px 0;
}

.component, .size, .sales, .novelties{
  text-transform: uppercase;
  border: 2px solid #242424;
  padding: 5px 15px;
  color: #242424;
  border-radius: 3px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
}
/deep/.color.mr-5.my-1.v-btn.v-btn--fab.v-btn--round.theme--light.elevation-0.v-size--default:before{
  background-color: transparent;
}
/deep/.v-icon.notranslate.mdi.mdi-chevron-down.theme--light {
  visibility: hidden;
}
/deep/.v-expansion-panel-header {
  font-weight: 400;
  font-size: 18px;
}
/deep/.v-expansion-panel-header, /deep/.v-expansion-panel-content__wrap {
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}
/deep/.theme--light.v-expansion-panels .v-expansion-panel:not(:first-child)::after {
  border: none !important;
}
/deep/.v-expansion-panel::before{
  box-shadow: none !important;
}
.color {
  border: 1px solid !important;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}
.productsCount, .sorting{
  color: #767676;
}
.sorting{
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}
.filtering{
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 28px;
}
/deep/.v-expansion-panel-header{
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
}
.productsCount{
  position: absolute;
  transform: rotate(-90deg);
  top: 60px;
  left: 30px;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
}
.productPrice{
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 15px;
}
.productTitle{
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 14px;
}
.categoryTitle{
  font-size: 50px !important;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
}
</style>