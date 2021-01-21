<template>
  <div class="wideContainer">
    <div class="productsCount">70 товаров</div>
    <v-container class="pa-0">
      <v-dialog width="900px" persistent v-model="dialog">
        <v-card tile width="900px" style="margin: 0 auto" elevation="0" >
          <product-preview @close="dialog=!dialog" :is-modal="true" :product="modalProduct"></product-preview>
        </v-card>
      </v-dialog>
      <v-row style="min-height: calc(100vh - 74px);">
        <v-col ref="productsPanel" class="pb-0" sm="8">
          <v-card color="transparent" elevation="0" min-height="100%" class="rounded-b-0" width="100%">
            <v-container v-scroll="handleScroll" class="px-0">
              <v-row class="pt-4">
                <v-col class="mb-10 ml-2" sm="12">
                    <div class="categoryTitle">{{categoryInfo.category}}</div>
                </v-col>
                <v-col class="px-5" data-aos="fade-up" sm="4" :key="index" v-for="(product, index) in products">
                  <v-card :style="{background: createBackground(index)}" @click="modalProduct = product; dialog = true" style="cursor: pointer" elevation="0" class="px-5 pb-0 pt-6 rounded-0" width="100%" >
                    <v-img @mouseenter="increaseImage"  @mouseleave="decreaseImage" :src="product.images[0].imageURL"></v-img>
                  </v-card>
                  <div class="productTitle mt-3">{{product.title}}</div>
                  <div class="productPrice mt-1 mb-3">{{product.price}} ₴</div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col ref="filterPanel" v-scroll="fixFilterPanel" class="pb-0 pl-5" sm="4">
          <v-card color="transparent" elevation="0" class="rounded-b-0 px-10 pt-9" min-height="100%" width="100%">
            <div class="sorting mt-6">Сортировать по</div>
            <div class="filtering mt-16 pt-3 mb-2">Фильтрация</div>
<!--            <v-btn outlined class="mt-5" @click="shuffle">Перемещать</v-btn>-->
            <v-expansion-panels v-model="filterPanels"  accordion multiple>
              <v-expansion-panel readonly >
                <v-expansion-panel-header style="cursor: default" >
                  Цвета
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <div style="display: flex; flex-wrap: wrap">
                    <div    style="position: relative"
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
                    <v-btn :color="structureFilter.includes(item.url)?'white': 'black'" outlined elevation="0" @click="handleFilter(item.url, 'structureFilter')"
                           :class="{activeFilter: structureFilter.includes(item.url)}"
                           class="component mr-3 my-1" :key="index" v-for="(item, index) in filters.components">
                      {{item.component}}
                    </v-btn>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
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
import lodash from "lodash"
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

  data: function () {
    return {
      filterPanels: [0],
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
      structureFilter: [],
    }
  },
  methods: {
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
      this.products = lodash.shuffle(this.products)
    },
    getProducts() {

     // this.$store.dispatch('CLEAR_LIST')
      if (Object.keys(this.$route.query).length === 0) {
        this.$store.dispatch('GET_PRODUCTS', {
          category: this.categoryURL,
        })
      }
      else {
        if ([...this.sizeFilter, ...this.colorFilter, ...this.structureFilter] !== undefined) {
          this.$store.dispatch('GET_PRODUCTS', {
            category: this.categoryURL,
            tags: [...this.sizeFilter, ...this.colorFilter, ...this.structureFilter],
            price: this.values
          })
        }
        else {
          this.$store.dispatch('GET_PRODUCTS', {
            category: this.categoryURL,
            price: this.values
          })
        }
      }
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
      category: this.categoryURL
    }).then(() => {
      this.config.range.max = this.$store.getters.filters.maxPrice
      this.config.range.min = this.$store.getters.filters.minPrice
      if (this.$route.query.price === undefined || (this.$route.query.price.split(',')[0] < this.config.range.min
          && this.$route.query.price.split(',')[1] < this.config.range.min)) {
        this.values = [this.$store.getters.filters.minPrice, this.$store.getters.filters.maxPrice]
      } else {
        this.values = [this.$route.query.price.split(',')[0], this.$route.query.price.split(',')[1]]
      }
      if (Object.keys(this.$route.query).length === 0) {
        this.getProducts()
      } else {
        this.handleFilteringQuery()
      }
    })
  },
 /* watch: {
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
        this.getProducts()
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
        this.getProducts()
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
        this.getProducts()
      },
      deep: true
    },
    values: {
      handler: function () {
        if ((parseInt(this.values[0]) === this.config.range.min && parseInt(this.values[1]) === this.config.range.max)
            || Number.isNaN(parseInt(this.values[1])) || Number.isNaN(parseInt(this.values[0]))) {
          delete this.$route.query.price
        } else {
          this.$route.query.price = [parseInt(this.values[0]), parseInt(this.values[1])].join()
        }
        this.getProducts()
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
  },*/

}
</script>

<style scoped>

/deep/.px-5.pb-0.pt-6.rounded-0.v-card.v-card--link.v-sheet.theme--light.elevation-0 {
  border: 1px solid #f5f5f5;
}
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,300&display=swap');
/deep/.v-image {
  z-index: 5;
  filter: drop-shadow(1px 1px 0 #0003);
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

.component, .size{
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
  margin-left: -60px;
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