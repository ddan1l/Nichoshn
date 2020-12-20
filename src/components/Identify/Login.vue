<template >
  <v-container fluid full-height>
    <v-layout row wrap align-center>
      <v-col cols="12" sm="10" offset-sm="1">
        <div class="headline font-weight-light text-center mb-4">Войдите в учетную запись</div>
        <transition name="fade">
        <v-alert dismissible icon="fas fa-exclamation-triangle" dense outlined  :value="error!==null" type="error">
          {{error}}
        </v-alert>
        </transition>
        <v-btn height="50" @click="googleAuth" class="text-none mb-4" large block outlined>
          <v-icon style="width: 18px" class="mr-4" size="18">
            fab fa-google
          </v-icon>
          с помощью Google
        </v-btn>
        <v-btn  height="50" @click="facebookAuth" class="text-none mb-4" large block outlined>
          <v-icon style="width: 18px" class="mr-4" size="18">
            fab fa-facebook-f
          </v-icon>
          с помощью Facebook
        </v-btn>
        <v-btn  height="50" @click="$emit('emailLogin')" class="text-left text-none mb-6" large block outlined>
          <v-icon style="width: 18px" class="mr-4" size="18">
            far fa-envelope
          </v-icon>
          с помощью Почты
        </v-btn>
      </v-col>
    </v-layout>
  </v-container>

</template>

<script>
export default {
  name: "SignIn",
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
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>