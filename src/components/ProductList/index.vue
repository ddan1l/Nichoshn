<template>
  <v-container>
    <v-layout>
      <div class="col-4">
        <v-expansion-panels v-model="panel" tile>
          <expansion-categories :categories="clothingCategories"></expansion-categories>
          <expansion-sizes v-model="sizeFilter" :sizes="clothingSizes"></expansion-sizes>
          <expansion-colors v-model="colorFilter" :colors="clothingColors"></expansion-colors>
          <expansion-structures v-model="structureFilter" :structures="clothingStructures"></expansion-structures>
          <expansion-prices v-if="showSlider" v-model="values" :config="config" ></expansion-prices>
        </v-expansion-panels>
      </div>
      <div class="col-8 pt-0">
        <list v-if="filteredCount>0" :products="necessaryProducts"></list>
        <v-flex  v-else  style="width: 100%; height: 100%" class="flex align-center">
          <h1 class="text-center">Ничего не найдено, попробуйте изменить ценовой диапазон</h1>
        </v-flex>
      </div>

    </v-layout>
  </v-container>
</template>

<script>
  import ExpansionCategories from "@/components/ProductList/ExpansionCategories";
  import ExpansionSizes from "@/components/ProductList/ExpansionSizes";
  import ExpansionColors from "@/components/ProductList/ExpansionColors";
  import ExpansionStructures from "@/components/ProductList/ExpansionStructures";
  import ExpansionPrices from "@/components/ProductList/ExpansionPrices";
  import List from "@/components/ProductList/List"
  export default {
    components:{
      ExpansionCategories,
      ExpansionSizes,
      ExpansionColors,
      ExpansionStructures,
      ExpansionPrices,
      List
    },
    props: {
      categoryURL: String,
    },
    data: function (){
      return{
        panel: 3,
        config: {
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
    methods:{
      setQueryParams(){
        let queriesCount = 0
        let path = ''
        history.pushState(
        {},
        null,
             this.$route.path
        )
        Object.keys(this.$route.query).forEach(query => {
          if (queriesCount === 0){
            path +=`?${query}=${this.$route.query[query]}`
          }
          else {
            path +=`&${query}=${this.$route.query[query]}`
          }
          if (queriesCount === 0){
            queriesCount++
          }
        });
        history.pushState(
        {},
        null,
             path
        )
      },

      getDiscount(discount, price){
          return price -  discount * price
      },

      clothingPrices(){
        let prices = []
        this.necessaryProducts.forEach(article=>{
          if (article.discount!==null){
            prices.push(this.getDiscount(article.discount, article.price))
          }
          else{
            prices.push(article.price)
          }
        })
        Array.min = function( array ){
          return Math.min.apply( Math, array );
        };
        Array.max = function( array ){
          return Math.max.apply( Math, array );
        };

        let min = Array.min(prices);
        let max = Array.max(prices);

        return [min, max]

      },
      setClothingPrices(){
        let prices = this.clothingPrices()
        if (prices[0]!==prices[1]){
          this.showSlider = true
          if (this.$route.query.price !== undefined){
            let pricesFromQuery = this.$route.query.price.split(',')
            if (pricesFromQuery.length>2 || pricesFromQuery[0]<prices[0] ||  pricesFromQuery[1]>prices[1]){
              this.values = prices
            }
            else{
              this.values = pricesFromQuery
            }
          }
          else{
            this.values = prices
          }

          this.config.range.min = prices[0]
          this.config.range.max = prices[1]
        }
        else{
          this.showSlider = false
          this.values = [0, prices[1]]
          this.config.range.max = prices[1]
          this.config.range.min = 0
        }
      },
      handleFilteringQuery() {
        if (Object.keys(this.$route.query).length > 0) {
          if (this.$route.query.size !== undefined){
            let sizes = []
            for (let obj of this.clothingSizes) {
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
          if (this.$route.query.color !== undefined){
            let colors = []
            for (let obj of this.clothingColors) {
              colors.push(obj.url)
            }
            for (let colorFilter of this.$route.query.color.split(',')) {
              if (colors.includes(colorFilter)) {
                this.colorFilter.push(colorFilter)
              }
            }
          }
          if (this.$route.query.structure !== undefined){
            let structures = []
            for (let obj of this.clothingStructures) {
              structures.push(obj.url)
            }
            for (let structureFilter of this.$route.query.structure.split(',')) {
              if (structures.includes(structureFilter)) {
                this.structureFilter.push(structureFilter)
              }
            }
          }

        }
      }
    },
    computed:{
      necessaryProducts(){
        let current =  this.products
        let filtered = []
        let isFiltered = false
        if (this.colorFilter.length>0){
          isFiltered = true
          for (let product of current){
            for (let colorInfo of product.colors){
              for (let filter of this.colorFilter){
                if (colorInfo.url === filter){
                  if (!filtered.includes(product)){
                    let price = this.getDiscount(product.discount, product.price)
                    if (price >= this.values[0] && price <= this.values[1]){
                      filtered.push(product)
                    }
                  }
                }
              }
            }
          }
        }
        if (this.sizeFilter.length>0){
          isFiltered = true
          for (let product of current){
            for (let sizeInfo of product.sizes){
              for (let filter of this.sizeFilter){
                if (sizeInfo.size === filter){
                  if (!filtered.includes(product)){
                    let price = this.getDiscount(product.discount, product.price)
                    if (price >= this.values[0] && price <= this.values[1]){
                        filtered.push(product)
                    }
                  }
                }
              }
            }
          }
        }
        if (this.structureFilter.length>0){
          isFiltered = true
          for (let product of current){
            for (let structureInfo of product.structure.components){
              for (let filter of this.structureFilter){
                if (structureInfo.url === filter){
                  if (!filtered.includes(product)){
                    let price = this.getDiscount(product.discount, product.price)
                    if (price >= this.values[0] && price <= this.values[1]){
                      filtered.push(product)
                    }
                  }
                }
              }
            }
          }
        }
        if (this.sizeFilter.length === 0 && this.colorFilter.length ===0 && this.structureFilter.length ===0){
          for (let product of current){
            let price = this.getDiscount(product.discount, product.price)
            if (price >= this.values[0] && price <= this.values[1]){
              filtered.push(product)
              isFiltered = true
            }
          }
        }
        if (isFiltered){
          current = filtered
        }
        return current
      },
      filteredCount(){
        return this.necessaryProducts.length
      },
      products(){
        return this.$store.getters.getClothing.filter(product => product.categoryURL === this.$props.categoryURL);
      },
      clothingStructures(){
        let structures = []
        this.products.forEach(article=>{
          article.structure.components.forEach(item=>{
            structures.push({
              component: item.component,
              url: item.url
            })
          })
        })
        structures = structures.filter((structureInfo, index, self) =>
            index === self.findIndex((c) => (
                c.component === structureInfo.component
            ))
        )
        return structures
      },

      clothingColors(){
        let colors = []
        this.products.forEach((element) => {
          element.colors.forEach((colorInfo)=>{
            colors.push({
              color: colorInfo.color,
              hex: colorInfo.hex,
              url: colorInfo.url
            })
          })
        });
        colors = colors.filter((colorInfo, index, self) =>
            index === self.findIndex((c) => (
                c.hex === colorInfo.hex
            ))
        )
        return colors
      },
      clothingSizes(){
        let sizes = []
        this.products.forEach(article=>{
          article.sizes.forEach(size=>{
            sizes.push(size)
          })
        })
        sizes = sizes.filter((sizesInfo, index, self) =>
            index === self.findIndex((c) => (
                c.size === sizesInfo.size
            ))
        )
        return sizes
      },
      clothingCategories(){
        return this.$store.getters.getClothingCategories
      },
    },
    mounted() {
        this.setClothingPrices()
        this.handleFilteringQuery()
    },
    watch:{
      sizeFilter: {
        handler: function (value) {
          if (value.length === 0){
            delete this.$route.query.size
          }
          else{
            let replaced = []
            for (let size of value){
              if (size.includes('×')){
                size = size.replace('×', 'x')
              }
              replaced.push(size)
            }
            this.$route.query.size = replaced.join()
          }
          this.setQueryParams()
        },
        deep: true
      },
      colorFilter:{
        handler: function (value) {
          if (value.length === 0){
            delete this.$route.query.color
          }
          else{
            this.$route.query.color = value.join()
          }
          this.setQueryParams()
        },
        deep: true
      },
      structureFilter:{
        handler: function (value) {
          if (value.length === 0){
            delete this.$route.query.structure
          }
          else{
            this.$route.query.structure = value.join()
          }
          this.setQueryParams()
        },
        deep: true
      },
      values:{
        handler: function () {
          if (parseInt(this.values[0]) === this.config.range.min && parseInt(this.values[1])  === this.config.range.max){
              delete this.$route.query.price
          }
          else{
            this.$route.query.price = [parseInt(this.values[0]), parseInt(this.values[1]) ].join()
          }
          this.setQueryParams()
        },
        deep: true
      },
      $route(){
        this.structureFilter = []
        this.sizeFilter = []
        this.colorFilter = []
        this.values = []
        this.setClothingPrices()
      }
    }
  }
</script>
<style scoped>
  @import "../../css/ProductList.css";
</style>

