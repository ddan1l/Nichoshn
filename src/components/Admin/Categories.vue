<template>
  <v-row>
    <v-dialog persistent v-model="categoryDialog" max-width="600">
      <v-card class="px-5 pt-4">
        <div class="text-center mb-5 headline">
          {{ modesDescription.get(selectedMode) }}
        </div>
        <validation-observer ref="observer">
          <v-form>
            <validation-provider v-slot="{errors}" name="Название" rules="required">
              <v-text-field
                  v-model="name"
                  :error-messages="errors"
                  color="black"
                  outlined
                  placeholder="Название"
              ></v-text-field>
            </validation-provider>
            <validation-provider v-slot="{errors}" name="Описание" rules="required">
              <v-textarea
                  v-model="description"
                  :error-messages="errors"
                  color="black"
                  outlined
                  rows="3"
                  placeholder="Описание"
              ></v-textarea>
            </validation-provider>
            <v-text-field
                v-model="url"
                color="black"
                outlined
                readonly
                placeholder="URL"
            ></v-text-field>
            <v-file-input
                accept="image/png, image/jpeg, image/bmp"  v-model="file" multiple @change="addFile" :clearable="false"
                prepend-inner-icon="far fa-image" color="black" prepend-icon="" outlined placeholder="Добавить фото"/>
            <v-img v-if="image!== ''" class="mb-3" :src="image">
              <v-btn style="z-index: 2" @click="file = []; image = ''" width="20" height="20" class="dismiss" icon>
                  <span class="fa-stack fa-2x">
                    <i style="color: white" class="fas fa-circle fa-stack-1x"></i>
                    <i style="color: orangered" class="fas fa-times-circle fa-stack-1x fa-inverse"></i>
                  </span>
              </v-btn>
            </v-img>
            <v-btn class="mb-5" @click.prevent="handleCategory" outlined color="black darken-1">
              Применить
            </v-btn>
            <v-btn class="ml-2 mb-5" color="grey darken-1" text @click="categoryDialog = false">
              Отмена
            </v-btn>
          </v-form>
        </validation-observer>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="deleteDialog" max-width="530">
      <v-card>
        <v-toolbar elevation="0" height="130" class="pa-2" color="red darken-2">
          <v-icon color="white">
            fas fa-exclamation-triangle
          </v-icon>
          <div class="title white--text ml-3">
            Удалить категорию?
          </div>
          <div class="mb-2 subtitle-2 white--text">
            Все данные в этой категории, будут удалены без возможности восстановления.
          </div>
        </v-toolbar>
        <v-card-title class="subtitle-2 font-weight-regular pa-6 pb-0 pt-4">
          Чтобы удалить эту категорию, введите ее url: <span class="font-weight-bold ml-1">{{activeURL}}</span>
          <v-text-field
              class="mt-3"
              v-model="categoryInput"
              :placeholder="activeURL"
              clearable
              color="black"
              outlined
              dense
          ></v-text-field>
        </v-card-title>
        <v-card-actions class="pt-0 pr-6 mb-2">
          <v-spacer></v-spacer>
          <v-btn class="mr-3" text @click="deleteDialog = false">
            Отмена
          </v-btn>
          <v-btn  :disabled="categoryInput !== activeURL" color="red darken-2" class="white--text" @click="deleteCategory()">
            Удалить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <SnackBar :message="message" :status="status"/>
    <v-col sm="12">
      <div style="display: flex">
        <div style="width: min-content" class="title font-weight-regular">Категории</div>
        <v-spacer></v-spacer>
        <v-btn  @click="handleAddingButton()" class="mr-10" rounded outlined>
          Добавить
          <v-icon class="ml-2" size="15">
            fas fa-plus
          </v-icon>
        </v-btn>
      </div>
    </v-col>
    <div class="progress" v-if="processing">
      <v-progress-circular
          size="50"
          indeterminate
          color="black"
      ></v-progress-circular>
    </div>
    <v-col v-else style="transition: 1s; min-height: 500px" sm="4" v-for="(item, index) in categories" :key="index">
      <v-hover>
        <template v-slot:default="{hover}">
          <v-card height="100%"  class="rounded-0 transition-swing pa-0">
            <template slot="progress">
              <v-progress-linear color="black" indeterminate></v-progress-linear>
            </template>
            <v-expand-transition>
              <div v-if="hover" class="handles">
                <v-btn style="background-color: white" class="mb-2" @click="handleUpdatingButton(item, index)" rounded
                       outlined>
                  Редактировать
                  <v-icon class="ml-2" size=16>
                    fas fa-pencil-alt
                  </v-icon>
                </v-btn>
                <v-btn style="background-color: white" @click="handleDeletingButton(item, index)" rounded outlined>
                  Удалить
                  <v-icon class="ml-2" size=16>
                    far fa-trash-alt
                  </v-icon>
                </v-btn>
              </div>
            </v-expand-transition>
            <div :style="{filter: hover ? 'blur(2px)' : 'blur(0)'}" style="background: linear-gradient(#00000087, #000000de); z-index: 2; transition: .5s;">
              <div style="font-size: 22px !important;" class="px-5 pt-3 title white--text text-center">{{ item.category }}</div>
              <div class="px-5 py-3 body-1 white--text text-center ">{{ item.description }}</div>
            </div>
            <v-img class="preview" style="transition: .5s" :style="{filter: hover ? 'blur(2px)' : 'blur(0)'}" :src="item.image" >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script>
import SnackBar from "@/components/SnackBar";
import transliterate from "@/Mixins/transiterate";
import {required} from 'vee-validate/dist/rules'
import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'

setInteractionMode('eager')
extend('required', {
  ...required,
  message: 'Это поле должно быть заполнено',
})
export default {
  name: "Categories",
  components: {
    ValidationProvider,
    ValidationObserver,
    SnackBar
  },
  mixins: [transliterate],
  data() {
    return {
      file: [],
      categoryInput: '',
      selectedMode: '',
      message: '',
      status: 'error',
      modesDescription: new Map(),
      categoryDialog: false,
      deleteDialog: false,
      activeId: '',
      activeIndex: '',
      activeURL: '',
      name: '',
      description: '',
      image: '',
      deleteURL: ''
    }
  },
  methods: {
    addFile() {
        new Promise(resolve => {
          let reader = new FileReader()
          reader.onload = (e) => {
            resolve(e.target.result)
          }
          reader.readAsDataURL(this.file[0])
        })
        .then((base64) => {
          this.image = base64
        })
       this.tempFile = []
    },
    handleAddingButton() {
      this.categoryDialog = true
      this.selectedMode = 'Adding'
      this.name = ''
      this.description = ''
      this.image = ''
      this.file = []
      if (this.$refs.observer) {
        this.$refs.observer.reset()
      }
    },
    handleUpdatingButton(item, index) {
      this.categoryDialog = true;
      this.activeIndex = index
      this.selectedMode = 'Updating';
      this.image = item.image
      this.deleteURL = item.image
      this.activeId = item.id;
      this.name = item.category;
      this.description = item.description;
    },
    handleDeletingButton(item, index) {
      this.deleteDialog = true
      this.activeId = item.id
      this.activeIndex = index
      this.name = item.category
      this.activeURL = this.url
    },
    deleteCategory() {
      this.deleteDialog = false
      this.$store.dispatch('DELETE_CATEGORY', this.activeId).then((info) => {
        if (info.message) {
          this.message = info.message
          this.status = 'success'
        }
      })
    },
    handleCategory() {
      this.$refs.observer.validate().then(result => {
        if (result) {
          this.categoryDialog = false
            if (this.selectedMode === 'Adding') {
              this.$store.dispatch('SAVE_IMAGES', this.file).then((ref) => {
                let category = {
                  category: this.name,
                  categoryURL: this.url,
                  description: this.description,
                  id: '',
                  image: ref[0].imageURL
                }
                this.$store.dispatch('ADD_CATEGORY', category).then((info) => {
                  if (info.message) {
                    this.message = info.message
                    this.status = 'success'
                  }
                })
              })
            }
            if (this.selectedMode === 'Updating') {
              this.$store.dispatch('DELETE_IMAGE', this.deleteURL).then(() => {
                this.$store.dispatch('SAVE_IMAGES', this.file).then((ref) => {
                  let category = {
                    category: this.name,
                    categoryURL: this.url,
                    description: this.description,
                    id: '',
                    image: ref[0].imageURL
                  }
                  category.id = this.activeId
                  this.$store.dispatch('UPDATE_CATEGORY', category).then((info) => {
                    if (info.message) {
                      this.message = info.message
                      this.status = 'success'
                    }
                  })
                })
              })
            }
        }
      })
    },
  },
  computed: {
    error(){
      return this.$store.getters.getError
    },
    categories() {
      return this.$store.getters.categories
    },
    processing() {
      return this.$store.getters.getProcessing
    },
    url() {
      return this.transliterate(this.name)
    },
  },
  created() {
    this.$store.dispatch('GET_CATEGORIES')
    this.modesDescription.set("Adding", "Добавить категорию")
    this.modesDescription.set("Updating", "Изменить категорию");
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
.v-card__progress {
  top: 0 !important;
  position: absolute !important;
  height: 5px !important;
}

.handles {
  top: 0;
  position: absolute;
  border-radius: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 3;
  align-items: center;
  width: 100%;
  left: 0;
}
.v-card {
  display: flex;
  flex-direction: column;
  justify-content: end;
}
.progress{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
}
/deep/.v-toolbar__content, .v-toolbar__extension {
  flex-wrap: wrap;
}
.blur {
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}
/deep/ .v-input__prepend-inner {
  padding-right: 13px !important;
}
/deep/ .v-input__slot {
  cursor: pointer !important;
}
/deep/ .dismiss.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
  position: absolute;
  top: 10px;
  right: 10px;
}
/deep/.v-image.v-responsive.preview.theme--light {
  position: absolute;
  height: 100%;
  width: 100%;
}

</style>