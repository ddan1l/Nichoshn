<template>
  <v-card class="ordering">
    <v-toolbar dark color="black">
      <v-btn icon dark @click="$emit('close') ; $store.commit('REMOVE_DATA_URL_SIDES')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-light">Оформление заказа</v-toolbar-title>
    </v-toolbar>
    <v-container class="px-11 mt-2">
      <v-row>
        <v-col sm="12">
          <v-carousel class="orderingCarousel"  hide-delimiters>
            <v-carousel-item v-for="(item,i) in dataUrlSides" :key="i" :src="item">
            </v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col class="pt-7" sm="12">
          <div class="headline font-weight-light">Оплата и доставка</div>

        </v-col>
        <v-col class="" sm="12">
          <div class="subtitle-1 font-weight-light">Информация о покупателе</div>
        </v-col>
        <v-col class="" sm="6">
          <v-text-field
              outlined
              label="Ваше имя"
              hide-details
              color="black"
          ></v-text-field>
        </v-col>
        <v-col class="" sm="6">
          <v-text-field
              hide-details
              outlined
              label="Ваша фамилия"
              color="black"
          ></v-text-field>
        </v-col>
        <v-col class="" sm="6">
          <v-text-field
              hide-details
              outlined
              label="Отчество"
              color="black"
          ></v-text-field>
        </v-col>
        <v-col sm="6">
          <div class="s" style="position: relative; height: 100%">
            <label for="phone" class="phoneLabel">
              Номер телефона
            </label>
            <input id="phone" class="phone" v-mask="mask" />
          </div>


        </v-col>
        <v-col sm="12">
          <v-text-field
              hide-details
              outlined
              label="Электронная почта"
              color="black"
          ></v-text-field>

        </v-col>
        <v-col class="" sm="12">
          <div class="subtitle-1 font-weight-light">Место доставки</div>
        </v-col>

        <v-col class="" sm="12">
          <v-autocomplete
              outlined
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
        <v-col class="" sm="12">
          <v-select
              outlined
              menu-props="auto"
              hide-details
              single-line
              cache-items
              color="black"
              :items="Warehouses"
              hide-no-data
              label="Выберите отделение"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <div style="height: 1000px"></div>
  </v-card>
</template>

<script>
import mask from 'vue-r-mask'
export default {
  name: "Ordering",
  directives: {
    mask: mask,
  },
  data () {
    return {
      loading: false,
      search: null,
      city: null,
      Addresses: [],
      Presents: [],
      Warehouses: [],
      mask: "/\\+380 \\(\\d{2}\\) \\d{4}-\\d{3}/",
      message: ''
    }
  },
  computed:{
    dataUrlSides(){
      return this.$store.getters.getDataUrlSides
    },
  },
  methods: {
    getWarehouses(v){
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
    },
    querySelections (v) {
      this.loading = true
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

.orderingCarousel{
  border: 1px solid #d6d6d6;
  background-color: white;
 /* background: #fbfbfb;/*
 /* background-image: linear-gradient(rgba(229, 229, 229, 0.7) .1em, transparent .1em), linear-gradient(90deg, rgba(229, 229, 229, 0.7) .1em, transparent .1em); */
  background-size: 2.4em 2.4em;
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
.orderingCarousel:after{
  content: 'Превью';
  position: absolute;
  top: 15px;
  left: 25px;
  font-size: 25px;
  font-weight: 300;
}

/deep/.v-window__prev, /deep/.v-window__next  {
  margin: 0 40px !important;
  background-color: transparent;
}
/deep/.v-window__prev > .v-btn, /deep/.v-window__next> .v-btn{
  color: #353535;
  width: 60px;
  height: 60px;
}
</style>