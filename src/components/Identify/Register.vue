<template>
  <v-container fluid full-height>
    <v-layout row wrap align-center>
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
            <div class="headline font-weight-light text-center mb-2">Создайте учетную запись</div>
            <div class="subtitle-2 text-center mb-5 px-2">Откройте доступ к своему профилю, чтобы иметь возможность просматривать корзину
              и  понравившееся товары с любых устройств, сохранять созданные в
              <router-link style="color: black" to="/constructor">Конструкторе</router-link>
              шаблоны, отслеживать посылки и многое другое.
            </div>
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
      checked: false,
      snack: false
    }
  },
  computed:{
    error(){
      return this.$store.getters.getError
    },
    isAuthenticated(){
      return this.$store.getters.isAuthenticated
    },
    isEmailVerified(){
      return this.$store.getters.isEmailVerified
    }
  },
  methods:{
    closeSnack(){
      this.snack = false
      setTimeout(()=>{
        this.$store.commit('CLEAR_ERROR')
      }, 1000)
    },
    facebookAuth(){
      this.$store.dispatch('FACEBOOK_AUTHENTICATION')
    },
    googleAuth(){
      this.$store.dispatch('GOOGLE_AUTHENTICATION')
    },
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
<style>
.fa-stack-1x {
  color:white;
}
.dismiss.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
  position: absolute;
  top: -7px;
  right: -7px;
}
.v-icon.notranslate.fas.fa-times-circle.theme--light.error--text {
  width: 20px;
  height: 20px;
}
.v-icon.notranslate.v-alert__icon.fas.fa-exclamation-triangle.theme--light.error--text {
  font-size: 18px;
  align-self: center;
}
div.v-snack__content {
  padding: 0 !important;
  margin-right: -9px;
}
div.v-snack__wrapper{
  border: none !important;
}
.fa-2x {
  font-size: 1.7em;
  width: 25px;
}
i{
  vertical-align: middle;
  height: 25px;
}
</style>