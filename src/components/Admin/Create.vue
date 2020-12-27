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
        <v-row>
          <v-col sm="6" :class="'pb-0'">
            <v-text-field
                v-model="name"
                color="black"
                outlined
                placeholder="Название"
            ></v-text-field>
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
            <v-textarea
                rows="2"
                v-model="description"
                color="black"
                outlined
                placeholder="Описание"
            ></v-textarea>
          </v-col>
          <v-col sm="6" class="py-0">
            <v-select
                color="black"
                outlined
                v-model="selectedCategory"
                :items="categories.map((item)=>{
                  return item.category
              })"
                placeholder="Категория"
            ></v-select>
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
            <v-select
                color="black"
                outlined
                multiple
                v-model="selectedColors"
                :items="colors.map((item)=>{
                  return item.color
              })"
                placeholder="Цвета"
            ></v-select>
          </v-col>
          <v-col sm="6" class="py-0">
            <v-select
                color="black"
                outlined
                multiple
                v-model="selectedSizes"
                :items="sizes.map((item)=>{
                  return item.size
              })"
                placeholder="Размеры"
            ></v-select>
          </v-col>
          <v-col sm="12" class="py-0">
            <v-textarea
                rows="2"
                v-model="care"
                color="black"
                outlined
                placeholder="Уход"
            ></v-textarea>
          </v-col>
          <v-col sm="6" class="py-0">
            <v-select
                color="black"
                outlined
                multiple
                v-model="selectedComponents"
                :items="components.map((item)=>{
                  return item.component
              })"
                placeholder="Материалы"
            ></v-select>
          </v-col>
          <v-col sm="6" class="py-0">
            <v-text-field
                v-model="descriptionComponents"
                color="black"
                outlined
                placeholder="Описание состава"
            ></v-text-field>
          </v-col>
          <v-col sm="4" class="py-0">
            <v-text-field
                v-model="price"
                color="black"
                outlined
                placeholder="Цена"
            ></v-text-field>
          </v-col>
          <v-col sm="4" class="py-0">
            <v-text-field
                v-model="discount"
                color="black"
                outlined
                placeholder="Скидка"
            ></v-text-field>
          </v-col>
          <v-col sm="4" class="py-0">
            <v-text-field
                v-model="totalPrice"
                readonly
                color="black"
                outlined
                placeholder="Итоговая цена"
            ></v-text-field>
          </v-col>
          <v-col class="py-0 " sm="12">
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
            <v-btn @click.prevent="createProduct">Добавить</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import transliterate from "@/Mixins/transiterate";
import {mapGetters} from 'vuex';
import SnackBar from "@/components/SnackBar";
import {required} from 'vee-validate/dist/rules'
import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'

setInteractionMode('eager')
extend('required', {
  ...required,
  message: 'Это поле должно быть заполнено',
})


export default {
  name: "Create",
  mixins: [transliterate],
  components:{
    SnackBar,
    // eslint-disable-next-line vue/no-unused-components
    ValidationObserver,
    // eslint-disable-next-line vue/no-unused-components
    ValidationProvider
  },
  data() {
    return {
      tempFiles: [],
      status: 'error',
      message: '',
      files: [],
      images: [],
      price: '',
      totalPrice: '',
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
      this.$store.dispatch('SAVE_IMAGES', this.files).then((refs)=>{
        let product = {
          title: this.name,
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
        console.log(product)
      })
    },
    getURL(val) {
      return this.transliterate(val)
    },
    removeImage(image) {
      let index = this.images.indexOf(image)
      console.log(index)
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
    ...mapGetters(['categories', 'colors', 'sizes', 'components',  'getProcessing', 'getError' ]),
  },
  watch:{
    error(){
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