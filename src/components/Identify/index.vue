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
      <v-card :loading="processing" color="black" :outlined="$route.path==='/identify'" elevation="1" tile max-width="500" class="mx-auto pa-0">
        <v-tabs fixed-tabs color="black" v-model="tab">
          <v-tab :style="item.style" v-for="(item, index) in items" :key="index">
            {{ item.tab }}
          </v-tab>
        </v-tabs>
        <v-tabs-items :style="{marginTop: (tab===2 || tab===3 || tab===4) ? '-48px': 0}" v-model="tab">
          <v-tab-item  v-for="(item, index) in items" :key="index">
            <v-card flat>
              <component @backRegister="tab=0"
                         @backLogin="tab=1"
                         @emailRegister="tab=2"
                         @emailLogin="tab=3"
                         @verifyEmail="tab=4"
                         @signout="tab=0; snack = true"
                         v-bind:is="item.content">
              </component>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
</template>

<script>
import Login from "@/components/Identify/Login";
import Register from "@/components/Identify/Register";
import EmailRegister from "@/components/Identify/EmailRegister";
import EmailLogin from "@/components/Identify/EmailLogin";
import VerifyEmail from "@/components/Identify/VerifyEmail";
export default {
  name: "Identify",
  data(){
    return{
      tab: null,
      snack: false,
      snackText: 'Вы вышли из аккаунта',
      items: [
        { tab: 'Впервые на сайте?', content: Register},
        { tab: 'Уже есть аккаунт?', content: Login},
        { tab: '', content: EmailRegister, style: {display: 'none'}},
        { tab: '', content: EmailLogin, style: {display: 'none'}},
        { tab: '', content: VerifyEmail, style: {display: 'none'}},
      ],
    }
  },
  computed:{
    processing(){
      return this.$store.getters.getProcessing
    },
    isEmailVerified(){
      return this.$store.getters.isEmailVerified
    },
    isAuthenticated(){
      return this.$store.getters.isAuthenticated
    }
  },
  created() {
    if(this.isAuthenticated){
      if (!this.isEmailVerified){
        this.tab = 4
      }
    }
  },
  watch:{
    tab(){
      this.$store.commit('CLEAR_ERROR')
    }
  }
}
</script>

<style scoped>
/deep/ div.v-tab {
  font-weight: 300;
}
/deep/.v-snack__wrapper.v-sheet.v-sheet--outlined.theme--light {
  margin-bottom: 40px;
}
</style>