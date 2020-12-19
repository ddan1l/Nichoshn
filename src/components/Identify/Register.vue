<template>
  <v-container fluid full-height>
    <v-layout row wrap align-center>
      <v-col cols="12" sm="10" offset-sm="1">
        <v-alert :value="error"  type="warning">
          {{error}}
        </v-alert>
        <div class="headline font-weight-light text-center mb-2">Создайте учетную запись</div>
        <div class="subtitle-2 text-center mb-5 px-2">Откройте доступ к своему профилю, чтобы иметь возможность просматривать корзину
          и  понравившееся товары с любых устройств, сохранять созданные в <router-link style="color: black" to="/constructor">Конструкторе</router-link> шаблоны, отслеживать посылки и многое другое.</div>
        <v-btn :disabled="!checked" height="50" @click="googleAuth" class="text-none mb-4" large block outlined>
          <v-icon style="width: 18px" class="mr-4" size="18">
            fab fa-google
          </v-icon>
         с помощью Google
        </v-btn>
        <v-btn :disabled="!checked"  height="50" @click="facebookAuth" class="text-none mb-4" large block outlined>
          <v-icon style="width: 18px" class="mr-4" size="18">
            fab fa-facebook-f
          </v-icon>
           с помощью Facebook
        </v-btn>
        <v-btn :disabled="!checked" height="50" @click="$emit('emailRegister')" class="text-left text-none mb-6" large block outlined>
          <v-icon style="width: 18px" class="mr-4" size="18">
            far fa-envelope
          </v-icon>
           с помощью Почты
        </v-btn>
        <div style="display: flex; justify-content: center">
          <v-checkbox class="ma-0" color="black" v-model="checked">
            <template v-slot:label>
              <div class="body-2">
                Я согласен с
                <router-link  style="color: black" to="/privacy">
                  Политикой Конфиденциальности
                </router-link>
              </div>
            </template>
          </v-checkbox>
        </div>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      checked: false
    }
  },
  computed:{
    error(){
      return this.$store.getters.getError
    },
    isAuthenticated(){
      return this.$store.getters.isAuthenticated
    }
  },
  methods:{
    facebookAuth(){
      this.$store.dispatch('FACEBOOK_AUTHENTICATION')
    },
    googleAuth(){
      this.$store.dispatch('GOOGLE_AUTHENTICATION')
    },
  },
  watch:{
    isAuthenticated(val){
      if (val){
        if (this.$route.path !== '/profile'){
          this.$router.push("/profile")
        }
      }
    }
  }

}
</script>

<style scoped>
/deep/.v-btn__content {
  justify-content: start !important;
  left: 23%;
}
</style>