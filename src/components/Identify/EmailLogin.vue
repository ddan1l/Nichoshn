<template>
  <v-container class="pt-0" fluid full-height>
    <v-layout row wrap align-center>
      <v-toolbar  class="mb-4 pa-0" dense elevation="0" >
        <v-btn class="back" block tile color="black" text width="105" height="48" @click="$emit('backLogin')">
          <v-icon class="mr-2">mdi-arrow-left</v-icon>
          Назад
        </v-btn>
      </v-toolbar>
      <v-col cols="12" sm="10" offset-sm="1">
        <v-alert v-if="error" type="warning">
          {{error}}
        </v-alert>
        <validation-observer ref="observer">
          <v-form>
            <validation-provider v-slot="{ errors }" name="Электронная почта" rules="required|email">
              <v-text-field dense height="50" outlined color="black" v-model="email" :error-messages="errors" type="email" placeholder="Электронная почта" required/>
            </validation-provider>
            <validation-provider v-slot="{ errors }" name="Пароль" rules="required|min:6">
              <v-text-field class="mb-3"  dense height="50" color="black" outlined type="password" v-model="password" :error-messages="errors" placeholder="Пароль" required/>
            </validation-provider>
            <v-btn height="44" block @click.prevent="signInWithEmailAndPassword"
                   style="font-size: 18px" :loading="processing" :disabled="processing"
                   class="white--text text-none mb-5 font-weight-regular" color="black">
             Войти в аккаунт
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
  name: "EmailLogin",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data(){
    return {
      email: '',
      password: '',
    }
  },
  methods:{
    signInWithEmailAndPassword() {
      this.$refs.observer.validate().then(result => {
        if (result) {
          this.$store.dispatch('SIGN_IN_WITH_EMAIL_AND_PASSWORD', {email: this.email, password: this.password})
        }
      })
    }
  },
  computed: {
    error() {
      return this.$store.getters.getError
    },
    processing() {
      return this.$store.getters.getProcessing
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    }
  },
  watch:{
    isAuthenticated(val){
      if (val){
        if (this.isEmailVerified){
          if (this.$route.path !== '/profile'){
            this.$router.push("/profile")
          }
        }
        else {
          this.$emit('verifyEmail')
        }
      }
    }
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