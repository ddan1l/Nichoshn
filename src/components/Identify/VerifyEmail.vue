<template>
  <div>
    <v-snackbar width="150" outlined :timeout="10000" v-model="snack">
     {{snackText}}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snack = false">
         Ок
        </v-btn>
      </template>
    </v-snackbar>
    <v-container fluid full-height>
      <v-layout row wrap align-center>
        <v-col  cols="12" sm="10" offset-sm="1" >
          <div class="text-center mt-3 mb-5">
            <div class="title mb-4">Подтвердите Ваш электронный адрес</div>
            <div class="body-2 mb-5">Чтобы завершить процесс регистрации, нажмите кнопку подтверждения в электронном письме, которое мы отправили на
              <span style="font-weight: bolder">{{email}}</span>. Это помогает защитить вашу учетную запись.</div>
            <div class="body-2 mb-5">В вашем почтовом ящике нет электронной почты или папки для спама? <span @click="verifyEmail" class="action"> Давайте отправим его еще раз</span>.</div>
            <div class="body-2 ">Неправильный адрес?<span @click="signout" class="action"> Выйдите из системы</span> , чтобы войти с другим адресом электронной почты. Если вы неправильно ввели свой адрес электронной почты при регистрации, создайте новую учетную запись.</div>
          </div>
        </v-col>
      </v-layout>
    </v-container>
</div>

</template>

<script>
export default {
  name: "VerifyEmail",
  data(){
    return {
      snackText: '',
      snack: false
    }
  },
  computed: {
    email(){
      return this.$store.getters.userEmail
    }
  },
  methods:{
    verifyEmail(){
      this.snackText = 'Повторное письмо выслано на вашу почту'
      this.snack = true
      this.$store.dispatch('VERIFY_EMAIL')
    },
    signout(){
      this.$store.dispatch('SIGNOUT').then(()=>{
        this.$emit('signout')
      })
      if (this.$route.path!=='/'){
        this.$router.push("/")
      }

    }
  }
}
</script>

<style scoped>
.action{
  cursor: pointer;
  text-decoration: underline;
}
/deep/.v-snack__wrapper.v-sheet.v-sheet--outlined.theme--light {
  margin-bottom: 60px;
}
</style>