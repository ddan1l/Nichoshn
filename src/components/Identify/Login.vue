<template >
  <v-container fluid full-height>
    <v-layout row wrap align-center>
      <v-col cols="12" sm="10" offset-sm="1">
        <div class="headline font-weight-light text-center mb-4">Войдите в учетную запись</div>
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
    isAuthenticated(){
      return this.$store.getters.isAuthenticated
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

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>