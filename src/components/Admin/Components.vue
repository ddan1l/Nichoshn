<template>
  <v-row>
    <v-dialog persistent v-model="componentDialog" max-width="600">
      <v-card class="px-5 pt-4">
        <v-col sm="12" >
          <div class="text-center headline mb-2">
            {{modesDescription.get(selectedMode)}}
          </div>
        </v-col>
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
                <v-text-field
                    v-model="url"
                    color="black"
                    outlined
                    readonly
                    placeholder="URL"
                ></v-text-field>
            <v-btn class="mb-5" @click.prevent="handleComponent" outlined color="black darken-1">
              Применить
            </v-btn>
            <v-btn class="mr-2 ml-3 mb-5" color="grey darken-1" text @click="componentDialog = false">
              Отмена
            </v-btn>
          </v-form>
        </validation-observer>
      </v-card>
    </v-dialog>
    <v-dialog persistent v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="headline mb-3">
          Удалить данный компонент?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">
            Нет
          </v-btn>
          <v-btn outlined @click="deleteComponent">
            Да
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <SnackBar :message="message" :status="status"/>
    <v-col sm="12">
      <div style="display: flex">
        <div style="width: min-content" class="title font-weight-regular">Материалы</div>
        <v-spacer></v-spacer>
        <v-btn @click="handleAddingButton()" class="mr-10" rounded outlined>
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
    <v-col v-else style="transition: 1s" sm="3" v-for="(item, index) in components" :key="index">
      <v-hover>
        <template v-slot:default="{hover}">
          <v-card height="100%" :class="`elevation-${hover ? 24 : 6}`" class="px-9 transition-swing pt-4 pb-3">
            <template slot="progress">
              <v-progress-linear color="black" indeterminate></v-progress-linear>
            </template>
            <v-expand-transition>
              <div v-if="hover" class="handles">
                <v-btn style="background-color: white" class="mb-2" @click="handleUpdatingButton(item, index)" rounded outlined>
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
            <div style="font-size: 22px !important" class="title text-center mb-1">{{ item.component }}</div>
            <div class="subtitle-1 grey--text text--darken-3 text-center">URL: {{ item.url }}</div>
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
  name: "Components",
  components:{
    SnackBar,
    ValidationObserver,
    ValidationProvider
  },
  mixins: [transliterate],
  data(){
    return{
      selectedMode: '',
      message: '',
      status: 'error',
      modesDescription: new Map(),
      componentDialog: false,
      deleteDialog: false,
      activeId: '',
      activeIndex: '',
      name: '',
    }
  },
  methods: {
    handleAddingButton() {
      this.componentDialog = true
      this.selectedMode = 'Adding';
      this.name = '';
      if (this.$refs.observer) {
        this.$refs.observer.reset()
      }
    },
    handleUpdatingButton(item, index) {
      this.componentDialog = true;
      this.activeIndex = index
      this.selectedMode = 'Updating';
      this.activeId = item.id;
      this.name = item.component;
    },
    handleDeletingButton(item, index) {
      this.deleteDialog = true
      this.activeId = item.id
      this.activeIndex = index
    },
    deleteComponent() {
      this.deleteDialog = false
      this.$store.dispatch('DELETE_COMPONENT', this.activeId).then((info) => {
        if (info.message) {
          this.message = info.message
          this.status = 'success'
        }
      })
    },
    handleComponent() {
      this.$refs.observer.validate().then(result => {
        if (result) {
          let component = {
            component: this.name,
            url: this.url,
            id: ''
          }
          if (this.selectedMode === 'Adding') {
            this.$store.dispatch('ADD_COMPONENT', component).then((info) => {
              if (info.message) {
                this.message = info.message
                this.status = 'success'
              }
            })
          }
          if (this.selectedMode === 'Updating') {
            component.id = this.activeId
            this.$store.dispatch('UPDATE_COMPONENT', component).then((info) => {
              if (info.message) {
                this.message = info.message
                this.status = 'success'
              }
            })
          }
          this.componentDialog = false
        }
      })
    },
  },
  computed:{
    error(){
      return this.$store.getters.getError
    },
    processing() {
      return this.$store.getters.getProcessing
    },
    url() {
      return this.transliterate(this.name)
    },
    components(){
      return this.$store.getters.components
    }
  },
  created() {
    this.$store.dispatch('GET_COMPONENTS')
    this.modesDescription.set("Adding", "Добавить материал")
    this.modesDescription.set("Updating", "Изменить материал");
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 3;
  align-items: center;
  width: 100%;
  left: 0;
  background-color: #ffffffde;
}

.v-card {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.progress{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
}
.color {
  width: 30px;
  height: 30px;
  margin: 0 auto;
  border: 1px solid;
  border-radius: 50%;
}

.blur {
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}
.col-sm-3.col {
  min-height: 140px;
}
</style>