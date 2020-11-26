<template >
  <v-container fluid full-height>
    <v-layout row wrap align-center>
      <v-col  cols="12" sm="8" offset-sm="2" >
        <div class="text-md-h5 font-weight-light text-center mb-5">С помощью почты</div>
      <v-alert :value="error"  type="warning">
        {{error}}
      </v-alert>
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"
        >
            <v-form @submit.prevent="signin" >
              <validation-provider
                  v-slot="{ errors }"
                  name="Почта"
                  rules="required|email"
              >
                  <v-text-field
                      outlined
                      color="black"
                      v-model="email"
                      :error-messages="errors"
                      type="email"
                      label="Почта"
                      required
                  ></v-text-field>
              </validation-provider>
              <validation-provider
                  v-slot="{ errors }"
                  name="Пароль"
                  rules="required|min:6"
              >
              <v-text-field
                  color="black"
                  outlined
                  type="password"
                  v-model="password"
                  :error-messages="errors"
                  label="Пароль"
                  required
              ></v-text-field>
              </validation-provider>

              <v-flex class="col-md-10 offset-md-1" >
              <v-btn tile width="100%"  @click.prevent="signin" :disabled="processing || invalid" class="white--text" color="black">Войти</v-btn>
              </v-flex>
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
  name: "SignIn",
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
  computed:{
    error(){
      return this.$store.getters.getError
    },
    processing(){
      return this.$store.getters.getProcessing
    },
    isAuthenticated(){
      return this.$store.getters.isAuthenticated
    }
  },
  methods:{
    signin() {
      this.$refs.observer.validate().then(result => {
        console.log(result)
        if (result) {
          this.$store.dispatch('SIGNIN', {email: this.email, password: this.password})
        }
      })
    }
  },
  watch:{
    isAuthenticated(val){
      if (val){
        this.$router.push("/")
      }
    }
  }
}
</script>

<style scoped>

</style>