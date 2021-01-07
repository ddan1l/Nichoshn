<template>
  <div>
    <v-divider class="mt-7 mb-3">''</v-divider>
    <v-row justify="space-between" class="px-3">
      <v-menu :close-on-content-click='false' offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn outlined color="black" :ripple="false" class="font-weight-regular rounded-0 " v-bind="attrs" v-on="on">
            Размеры
          </v-btn>
        </template>
        <v-list class="pa-0" dense>
          <v-list-item-group color="grey" multiple>
            <v-list-item class="pa-0 pr-5" v-for="(item, index) in filters.sizes" :key="index">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-subtitle class="black--text font-weight-light pl-6">
                    {{ item.size }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-checkbox v-model="sizeFilter" color="black" :value="item.size" :input-value="active"></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-menu :close-on-content-click='false' offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn outlined color="black" :ripple="false" class="font-weight-regular rounded-0" v-bind="attrs" v-on="on">
            Компоненты
          </v-btn>
        </template>
        <v-list class="pa-0" dense>
          <v-list-item-group color="grey" multiple>
            <v-list-item class="pa-0 pr-5" v-for="(item, index) in filters.components" :key="index">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-subtitle class="black--text font-weight-light pl-6">
                    {{ item.component }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-checkbox v-model="structureFilter" color="black" :value="item.url"
                              :input-value="active"></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-menu :close-on-content-click='false' offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn outlined color="black" :ripple="false" class="font-weight-regular rounded-0 " v-bind="attrs" v-on="on">
            Цвета
          </v-btn>
        </template>
        <v-list class="pa-0" dense>
          <v-list-item-group color="grey" multiple>
            <v-list-item class="pa-0 pr-5" v-for="(item, index) in filters.colors" :key="index">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-subtitle class="black--text font-weight-light pl-6">
                    <span style="width: 12px; height: 12px; display: inline-block; border: 1px solid" class="mr-1"
                          :style="{backgroundColor: item.hex}"></span>
                    {{ item.color }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-checkbox color="black" v-model="colorFilter" :value="item.url" :input-value="active"></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
      <v-menu :close-on-content-click='false' offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn width="220" outlined color="black" :ripple="false" class="font-weight-regular rounded-0 "
                 v-bind="attrs" v-on="on">
            Цена
          </v-btn>
        </template>
        <div class="mt-6">
          <v-nus :config="config" v-model="values"/>
        </div>
        <div class="d-flex justify-space-between mb-4">
          <div class="ml-4 font-weight-light">Мин: {{ parseInt(values[0]) }}</div>
          <div class="mr-4 font-weight-light">Макс: {{ parseInt(values[1]) }}</div>
        </div>
      </v-menu>
      <v-menu :close-on-content-click='false' offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn outlined color="black" :ripple="false" class="font-weight-regular rounded-0 " v-bind="attrs" v-on="on">
            Сортировка
          </v-btn>
        </template>
        <v-list class="pa-0" dense>
          <v-list-item-group color="grey" multiple>
            <v-list-item class="pa-0 pr-5" v-for="(item, index) in filters.colors" :key="index">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-subtitle class="black--text font-weight-light pl-6">
                    <span style="width: 12px; height: 12px; display: inline-block; border: 1px solid" class="mr-1"
                          :style="{backgroundColor: item.hex}"></span>
                    {{ item.color }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-checkbox color="black" v-model="colorFilter" :value="item.url" :input-value="active"></v-checkbox>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-row>
    <v-divider class="mx-0 mt-3">''</v-divider>
    <list :products="products"></list>
  </div>
</template>

<script>
import List from "@/components/ProductList/List"

export default {
  components: {
    List
  },
  props: {
    categoryURL: String,
  },
  data: function () {
    return {
      config: {
        filtered: false,
        fixed: true,
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
    getProducts(){
      if (Object.keys(this.$route.query).length === 0) {
        this.$store.dispatch('GET_PRODUCTS', {
          category:  this.categoryURL,
        })
      }
      else{
        if ([...this.sizeFilter, ...this.colorFilter,  ...this.structureFilter ] !== undefined){
          this.$store.dispatch('GET_PRODUCTS', {
            category:  this.categoryURL,
            tags: [...this.sizeFilter, ...this.colorFilter,  ...this.structureFilter ],
            price: this.values
          })
        }
        else {
          this.$store.dispatch('GET_PRODUCTS', {
            category:  this.categoryURL,
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
    products() {
      return this.$store.getters.products
    },
    filters() {
      return this.$store.getters.filters
    },
  },
  created() {
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
      }
      else{
        this.handleFilteringQuery()
      }
    })
  },
  watch: {
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
  }
}
</script>
<style>
.v-menu__content {
  box-shadow: none !important;
  border-top: 0;
  border-bottom: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
}

.v-menu__content.theme--light.menuable__content__active {
  border-radius: 0;
}

</style>
<style scoped>
/deep/ .v-menu__content.theme--light.menuable__content__active {
  background-color: white;
}

/deep/ .theme--light.v-btn:focus::before {
  opacity: 0;
}

/deep/ .theme--light.v-divider {
  border-color: rgb(0, 0, 0);
}

/deep/ .font-weight-regular.v-btn.v-btn--depressed.v-btn--flat.v-btn--outlined.theme--light {
  border-top: 0;
  border-bottom: 0;
  border: none;
}

/deep/ .v-btn.v-btn--depressed.v-btn--flat.v-btn--outlined.theme--light.v-size--default.black--text {
  padding: 25px 50px 25px 50px !important;
}

.sizeError {
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
  66% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0px);
  }
}

.selected {
  border: 1px solid black;
}

.colorDisplay {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  margin: 5px auto 0;
  position: relative;
  border: 1px solid;
}

/deep/ .filled {
  color: black;
  animation-name: fill;
  animation-iteration-count: 1;
  animation-duration: 0.5s;
}

/deep/ .activeImage {
  border: 1px solid #272727;
  transform: scale(0.9);

}

@keyframes fill {
  0% {
    color: black;
    transform: scale(1, 1);
  }
  50% {
    color: #353535;
    transform: scale(1.1, 1.1);
  }
  100% {
    color: black;
    transform: scale(1, 1);
  }
}

/deep/ .v-image__image.v-image__image--cover {
  background-size: contain;
}

/deep/ .product-title, .product-price, .product-category, .priceBlock span, .size {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  line-height: 24px;
}

/deep/ .modal {
  font-size: 16px;
}

/deep/ .noUi-touch-area {
  background-color: #626262;
  border-radius: 50%;
}

/deep/ .v-expansion-panel-content__wrap {
  padding: 0;
}

/deep/ .product-category, .size {
  font-weight: 500;
  text-transform: none;
  line-height: 14px;
  color: #676767;
}

/deep/ .product-price {
  font-size: 14px !important;
  font-weight: 300 !important;
}

/deep/ .priceBlock {
  display: flex;
  justify-content: center;
  margin: 2px 0;
}

.priceBlock span {
  font-size: 14px;
  font-weight: 300 !important;
}

/deep/ .sizes {
  display: flex;
  justify-content: center;
}

/*.v-icon.v-icon::after {
    background-color: transparent;
}*/
/deep/ .v-dialog {
  box-shadow: none !important;
}

/deep/ .v-overlay__scrim {
  opacity: 0.1;
}

/deep/ .v-window-item .v-image__image, .v-image__placeholder {
  z-index: -1;
  position: absolute;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
}

/deep/ .v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--dark.v-size--default:focus {
  border: none;
  outline: none;
}

/deep/ .v-expansion-panel::before {
  box-shadow: none;
}

/deep/ .v-expansion-panel {
  border: 1px solid;
}

/deep/ .v-expansion-panel-header.v-expansion-panel-header--active {
  border-bottom: 1px solid;
}

/deep/ .v-list-item__title.font-weight-light, .v-list-item__subtitle.black--text.font-weight-light {
  font-size: 15px !important;
}

/deep/ .noUi-target {
  margin: 15px 17px 20px 17px !important;
}

/deep/ .noUi-handle {
  background-color: white !important;
  border: 1px solid !important;
  cursor: pointer;
}

/deep/ .v-icon.notranslate.toWish.v-icon--link.far.fa-heart.theme--light {
  position: absolute;
  left: 40px;
  top: 5px;
}

/deep/ .iconsContainer {
  height: 20px;
  position: relative;
}

/deep/ .v-icon.notranslate.ml-4.mr-2.d-none.d-lg-inline.plugIcon.far.fa-eye.theme--light {
  position: absolute;
  top: 4px;
}

/deep/ .product-animation-item {
  transition: all 1s;
  display: inline-block;
}

/deep/ .product-animation-enter, .product-animation-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/deep/ .product-animation-leave-active {
  position: absolute;
  width: 200px;
}


</style>

