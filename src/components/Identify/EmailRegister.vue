<template>
  <v-container class="pt-0" fluid full-height>
    <v-layout row wrap align-center>
      <v-toolbar  class="mb-4 pa-0" dense elevation="0" >
        <v-btn class="back" block tile color="black" text width="105" height="48" @click="$emit('backRegister')">
          <v-icon class="mr-2">mdi-arrow-left</v-icon>
          Назад
        </v-btn>
      </v-toolbar>
      <v-col cols="12" sm="10" offset-sm="1">
        <v-snackbar width="150" outlined :timeout="10000" v-model="snack">
          <v-alert class="mx-auto mb-0" :key="'alert'" max-width="390" text icon="fas fa-exclamation-triangle" dense outlined type="error">
            {{error}}
            <v-btn @click="closeSnack()" width="20" height="20" class="dismiss" icon>
                <span class="fa-stack fa-2x">
                  <i style="color: white" class="fas fa-circle fa-stack-1x"></i>
                  <i style="color: #ff5252" class="fas fa-times-circle fa-stack-1x fa-inverse"></i>
                </span>
            </v-btn>
          </v-alert>
        </v-snackbar>
        <div class="title text-center mb-4">Расскажите немного о себе</div>
    <validation-observer ref="observer">
        <v-form>
          <validation-provider v-slot="{ errors }" name="Имя" rules="required">
            <v-text-field dense height="50" color="black" outlined v-model="name" :error-messages="errors" placeholder="Ваше имя" required/>
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="Электронная почта" rules="required|email">
            <v-text-field dense height="50" outlined color="black" v-model="email" :error-messages="errors" type="email" placeholder="Электронная почта" required/>
          </validation-provider>
          <validation-provider v-slot="{ errors }" name="Пароль" rules="required|min:6">
            <v-text-field class="mb-3"  dense height="50" color="black" outlined type="password" v-model="password" :error-messages="errors" placeholder="Пароль" required/>
          </validation-provider>
          <v-btn height="44" block @click.prevent="createUserWithPasswordAndEmail"
                 style="font-size: 18px" :loading="processing" :disabled="processing"
                 class="white--text text-none mb-5 font-weight-regular" color="black">
            Создать аккаунт
          </v-btn>
      </v-form>
    </validation-observer>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
extend('required', {
  ...required,
  message: 'Это поле должно быть заполнено',
})

extend('email', {
  ...email,
  message: 'Неверный формат',
})
extend('min', {
  ...min,
  validate (value) {
    return {
      required: true,
      valid: value.length >= 6
    };
  },
  computesRequired: true,
  message: '{_field_} должен быть менее {length}  символов',
})
export default {
  name: "EmailRegister",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data(){
    return {
      email: '',
      password: '',
      name: '',
      snack: false
    }
  },
  computed:{
    error(){
      return this.$store.getters.getError
    },
    processing(){
      return this.$store.getters.getProcessing
    },
  },
  methods:{
    closeSnack(){
      this.snack = false
      setTimeout(()=>{
        this.$store.commit('CLEAR_ERROR')
      }, 1000)
    },
    createUserWithPasswordAndEmail() {
      this.$refs.observer.validate().then(result => {
        if (result) {
          this.$store.dispatch('CREATE_USER_WITH_EMAIL_AND_PASSWORD', {
            email: this.email,
            password: this.password,
            name: this.name
          })
        }
      })
    }
  },
  watch:{
    error(val){
      this.snack = val !== null;
    },
    snack(val){
      if (!val){
        setTimeout(()=>{
          this.$store.commit('CLEAR_ERROR')
        }, 1000)
      }
    },
  }
}
</script>
<style scoped>
/deep/.mb-4.v-sheet.theme--light.elevation-0.v-toolbar.v-toolbar--dense {
  border-bottom: 1px solid #e6e6e6;
  background-color: #f6f6f6;
}
/deep/.v-toolbar__content {
  padding: 0 !important;
}
/deep/.back > .v-btn__content {
  justify-content: start !important;
  padding-left: 10px;
}

</style>
