<template>
  <v-row>
    <SnackBar :message="message" :status="status"/>
    <v-col sm="12" class="progress" v-if="getProcessing">
      <v-progress-circular
          size="50"
          indeterminate
          color="black"
      ></v-progress-circular>
    </v-col>
    <v-col class="pt-0">
      <v-card :style="{filter: getProcessing ? 'blur(3px)' : 'blur(0)'}" class="pt-3 px-10">
        <v-card-title class="font-weight-regular px-0">
          Добавить товар
        </v-card-title>
        <v-btn @click="dump" class="my-5">dump db</v-btn>
        <validation-observer ref="observer">
          <v-form>
            <v-row>
              <v-col sm="6" :class="'pb-0'">
                <validation-provider v-slot="{errors}" name="name" rules="required">
                  <v-text-field
                      v-model="name"
                      :error-messages="errors"
                      color="black"
                      outlined
                      clearable
                      placeholder="Название"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col sm="6" class="pb-0">
                  <v-text-field
                      readonly
                      :value="getURL(name)"
                      color="black"
                      hide-details
                      outlined
                      placeholder="URL"
                  ></v-text-field>
              </v-col>
              <v-col sm="12" class="py-0">
                <validation-provider v-slot="{errors}" name="URL" rules="required">
                  <v-textarea
                      rows="2"
                      :error-messages="errors"
                      v-model="description"
                      color="black"
                      outlined
                      placeholder="Описание"
                  ></v-textarea>
                </validation-provider>
              </v-col>
              <v-col sm="6" class="py-0">
                <validation-provider v-slot="{errors}" name="selectedCategory" rules="required">
                  <v-select
                      :error-messages="errors"
                      color="black"
                      clearable
                      item-color="black"
                      outlined
                      v-model="selectedCategory"
                      :items="categories.map((item)=>{
                        return item.category
                    })"
                      placeholder="Категория"
                  ></v-select>
                </validation-provider>
              </v-col>
              <v-col sm="6" class="py-0">
                  <v-text-field
                      readonly
                      :value="getURL(selectedCategory)"
                      color="black"
                      hide-details
                      outlined
                      placeholder="categoryURL"
                  ></v-text-field>
              </v-col>
              <v-col sm="6" class="py-0">
                <validation-provider v-slot="{errors}" name="selectedCategoryURL" rules="required">
                  <v-select
                      color="black"
                      clearable
                      :error-messages="errors"
                      item-color="black"
                      chips
                      height="56"
                      outlined
                      multiple
                      v-model="selectedColors"
                      :items="colors.map((item)=>{
                        return item.color
                    })"
                      placeholder="Цвета"
                  ></v-select>
                </validation-provider>
              </v-col>
              <v-col sm="6" class="py-0">
                <validation-provider v-slot="{errors}" name="selectedSizes" rules="required">
                  <v-select
                      color="black"
                      outlined
                      item-color="black"
                      multiple
                      chips
                      height="56"
                      clearable
                      v-model="selectedSizes"
                      :error-messages="errors"
                      :items="sizes.map((item)=>{
                        return item.size
                    })"
                      placeholder="Размеры"
                  ></v-select>
                </validation-provider>
              </v-col>
              <v-col sm="12" class="py-0">
                <validation-provider v-slot="{errors}" name="care" rules="required">
                  <v-textarea
                      :error-messages="errors"
                      rows="2"
                      v-model="care"
                      color="black"
                      outlined
                      placeholder="Уход"
                  ></v-textarea>
                </validation-provider>
              </v-col>
              <v-col sm="6" class="py-0">
                <validation-provider v-slot="{errors}" name="selectedComponents" rules="required">
                  <v-select
                      color="black"
                      chips
                      height="56"
                      clearable
                      item-color="black"
                      outlined
                      multiple
                      v-model="selectedComponents"
                      :error-messages="errors"
                      :items="components.map((item)=>{
                        return item.component
                    })"
                      placeholder="Материалы"
                  ></v-select>
                </validation-provider>
              </v-col>
              <v-col sm="6" class="py-0">
                <validation-provider v-slot="{errors}" name="descriptionComponents" rules="required">
                  <v-text-field
                      v-model="descriptionComponents"
                      color="black"
                      outlined
                      :error-messages="errors"
                      clearable
                      placeholder="Описание состава"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col sm="4" class="py-0">
                <validation-provider v-slot="{errors}" name="price" rules="required|integer">
                  <v-text-field
                      v-model="price"
                      color="black"
                      :error-messages="errors"
                      outlined
                      clearable
                      placeholder="Цена"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col sm="4" class="py-0">
                <validation-provider v-slot="{errors}" name="discount" rules="integer|max_value:100|min_value:0">
                  <v-text-field
                      v-model="discount"
                      :error-messages="errors"
                      color="black"
                      clearable
                      outlined
                      placeholder="Скидка, %"
                  ></v-text-field>
                </validation-provider>
              </v-col>
              <v-col sm="4" class="py-0">
                  <v-text-field
                      v-model="totalPrice"
                      readonly
                      color="black"
                      outlined
                      label="Итоговая цена"
                  ></v-text-field>
              </v-col>
              <v-col class="py-0" sm="12">
                <v-file-input
                    outlined prepend-icon="" prepend-inner-icon="far fa-image" placeholder="Добавьте изображения"
                    color="black" accept="image/png, image/jpeg, image/bmp"
                    v-model="tempFiles" multiple @change="addFile" type="file">
                </v-file-input>
              </v-col>
              <v-col v-if="images.length>0" sm="12" class="pt-0">
                <v-sheet
                    class="mx-auto"
                    :outlined="images.length>0">
                  <v-slide-group
                      class="pa-4"
                      center-active
                      show-arrows
                  >
                    <v-slide-item v-for="(image, index) in images" :key="index">
                      <v-card elevation="5" class="ma-4" height="350" width="280">
                        <v-btn style="z-index: 2" @click="removeImage(image)" width="20" height="20" class="dismiss" icon>
                          <span class="fa-stack fa-2x">
                            <i style="color: white" class="fas fa-circle fa-stack-1x"></i>
                            <i style="color: rgb(55, 55, 55)" class="fas fa-times-circle fa-stack-1x fa-inverse"></i>
                          </span>
                        </v-btn>
                        <v-img height="350" width="280" :src="image"></v-img>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>
                </v-sheet>
              </v-col>
              <v-col>
                <v-btn class="mb-3" outlined @click.prevent="createProduct">Готово</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </validation-observer>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import transliterate from "@/Mixins/transiterate";
import {mapGetters} from 'vuex';
import SnackBar from "@/components/SnackBar";
import {required, integer, max_value, min_value} from 'vee-validate/dist/rules'
import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'
import Vue from 'vue'
setInteractionMode('eager')
extend('required', {
  ...required,
  message: 'Это поле должно быть заполнено',
})
extend('integer', {
  ...integer,
  message: 'Это поле должно быть числом',
})
extend('max_value', {
  ...max_value,
  message: 'Не более 100%',
})
extend('min_value', {
  ...min_value,
  message: 'Не меньше 0',
})

export default {
  name: "Create",
  mixins: [transliterate],
  components: {
    SnackBar,
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      product: {},
      tempFiles: [],
      status: 'error',
      message: '',
      files: [],
      images: [],
      price: '',
      discount: '',
      name: '',
      selectedFiles: '',
      description: '',
      selectedSizes: [],
      selectedColors: [],
      selectedCategory: '',
      selectedComponents: [],
      descriptionComponents: '',
      care: [],
      error: false,
    }
  },
  methods: {
    createProduct() {
      this.$refs.observer.validate()
          .then(result => {
            if (result) {
              this.$store.dispatch('IS_URL_EXISTS', {
                category: this.getURL(this.selectedCategory),
                product: this.getURL(this.name)
              })
              .then((isExists => {
                if (isExists){
                  this.message = 'Невозможно создать товар, данный URL занят'
                  this.status = 'error'
                }
                else {
                  this.$store.dispatch('SAVE_IMAGES', this.files).then((refs) => {
                    let product = {
                      title: this.name,
                      tags: [
                      ...this.colors.map((item) => {
                        if (this.selectedColors.includes(item.color)) {
                          return item.url
                        }
                      })
                      .filter((el) => {
                        return el !== undefined;
                      }),
                      ...this.sizes.map((item) => {
                          if (this.selectedSizes.includes(item.size)) {
                            return item.size
                          }
                      })
                      .filter((el) => {
                        return el !== undefined;
                      }),
                      ...this.components.map((item) => {
                          if (this.selectedComponents.includes(item.component)) {
                            return item.url
                          }
                      })
                      .filter((el) => {
                         return el !== undefined;
                      })],
                      url: this.getURL(this.name),
                      category: this.selectedCategory,
                      categoryURL: this.getURL(this.selectedCategory),
                      description: this.description,
                      images: refs,
                      colors: this.colors.map((item) => {
                        if (this.selectedColors.includes(item.color)) {
                          return item
                        }
                      })
                      .filter((el) => {
                        return el !== undefined;
                      }),
                      totalPrice: Math.round( this.price - this.price * this.discount / 100),
                      care: this.care,
                      sizes: this.sizes.map((item) => {
                        if (this.selectedSizes.includes(item.size)) {
                          return item
                        }
                      })
                      .filter((el) => {
                        return el !== undefined;
                      }),
                      structure: {
                        description: this.descriptionComponents,
                        components: this.components.map((item) => {
                          if (this.selectedComponents.includes(item.component)) {
                            return item
                          }
                        })
                        .filter((el) => {
                          return el !== undefined;
                        }),
                      },
                      price: this.price,
                      discount: this.discount
                    }
                    this.product = JSON.parse(JSON.stringify(product))
                    this.$store.dispatch('ADD_FILTER', {
                      price: this.totalPrice,
                      category: this.getURL(this.selectedCategory),
                      colors:  this.colors.map((item) => {
                        if (this.selectedColors.includes(item.color)) {
                          return item
                        }
                      })
                      .filter((el) => {
                        return el !== undefined;
                      }),
                      sizes: this.sizes.map((item) => {
                        if (this.selectedSizes.includes(item.size)) {
                          return item
                        }
                      })
                      .filter((el) => {
                        return el !== undefined;
                      }),
                      components: this.components.map((item) => {
                        if (this.selectedComponents.includes(item.component)) {
                          return item
                        }
                      })
                      .filter((el) => {
                        return el !== undefined;
                      }),
                    })
                    this.$store.dispatch('SAVE_PRODUCT', product).then(info =>{
                      this.message = info.message
                      this.status = 'success'
                      this.tempFiles = []
                      this.files = []
                      this.images = []
                      this.price = ''
                      this.discount = ''
                      this.name = ''
                      this.selectedFiles = ''
                      this.description = ''
                      this.selectedSizes = []
                      this.selectedColors = []
                      this.selectedCategory = ''
                      this.selectedComponents = []
                      this.descriptionComponents = ''
                      this.care = []
                      if (this.$refs.observer) {
                        this.$refs.observer.reset()
                      }
                    })
                  })
                }
              }))

            }})
    },
    getURL(val) {
      return this.transliterate(val)
    },
    dump(){
      if (this.product) {
        for (let i = 0; i < 100; i++) {
          this.product.url = i
          Vue.prototype.$db.collection('test').doc(i.toString()).set(this.product)

        }
      }

    },
    removeImage(image) {
      let index = this.images.indexOf(image)
      this.images.splice(index, 1)
    },
    addFile() {
      this.files = this.files.concat(this.tempFiles)
      this.tempFiles.forEach(file => {
        new Promise(resolve => {
          let reader = new FileReader()
          reader.onload = function (e) {
            resolve(e.target.result)
          }
          reader.readAsDataURL(file)
        })
        .then((base64) => {
          this.images.push(base64)
        })
      })
      this.tempFiles = []
    }
  },
  created() {
    this.$store.dispatch('GET_CATEGORIES')
    this.$store.dispatch('GET_COLORS')
    this.$store.dispatch('GET_SIZES')
    this.$store.dispatch('GET_COMPONENTS')

  },
  computed: {
    totalPrice(){
      if (this.discount < 0 || this.discount > 100){
        return 'Ошибка ввода'
      }
      else {
        return Math.round( this.price - this.price * this.discount / 100)
      }
    },
    ...mapGetters(['categories', 'colors', 'sizes', 'components', 'getProcessing', 'getError']),
  },
  watch: {
    error() {
      this.message = this.error
      this.status = 'error'
    }
  }
}
</script>

<style scoped>
/deep/ .v-input__prepend-inner {
  padding-right: 13px !important;
}

/deep/ .v-image.v-responsive.theme--light {
  background-color: #f7f7f7;
}

/deep/ .v-input__slot {
  cursor: pointer !important;
}

.progress {
  position: fixed;
  width: 84%;
  height: 100vh;
  bottom: 0;
  left: 16%;
  background-color: #ffffff3b;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

/deep/ .dismiss.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
  position: absolute;
  top: 10px;
  right: 10px;
}


</style>