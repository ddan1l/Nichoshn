<template>
  <v-container fluid full-height>
    <v-layout row wrap align-center>
      <v-col cols="12" sm="10" offset-sm="1">
        <transition-group name="list">
            <v-alert class="mx-auto" v-if="error!==null" :key="'alert'" max-width="390" text icon="fas fa-exclamation-triangle" dense outlined type="error">
              {{error}}
              <v-btn @click="$store.commit('CLEAR_ERROR')" width="20" height="20" class="dismiss" icon>
                <v-icon style="background-color: white; border-radius: 50%" size="20" color="error">fas fa-times-circle</v-icon>
              </v-btn>
            </v-alert>
          <div :key="'list'">
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
          </div>
        </transition-group>
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
    },
    isEmailVerified(){
      return this.$store.getters.isEmailVerified
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

</style>
<style>
.list-enter-active {
  animation: showAlert .5s;
}
.list-leave-active {
  position: absolute;
  animation: showAlert .5s reverse;
}
.list-move {
  transition: transform .5s;
}

@keyframes showAlert {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.3);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
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
</style>