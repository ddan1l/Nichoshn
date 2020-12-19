<template>
    <v-card :loading="processing" color="black" :outlined="$route.path==='/identify'" elevation="1" tile max-width="500" class="mx-auto pa-0">
      <v-tabs fixed-tabs color="black" v-model="tab">
        <v-tab :style="item.style" v-for="(item, index) in items" :key="index">
          {{ item.tab }}
        </v-tab>
      </v-tabs>
      <v-tabs-items :style="{marginTop: (tab===2 || tab===3) ? '-48px': 0}" v-model="tab">
        <v-tab-item  v-for="(item, index) in items" :key="index">
          <v-card flat>
            <component @backRegister="tab=0" @backLogin="tab=1"  @emailRegister="tab=2" @emailLogin="tab=3"  v-bind:is="item.content"></component>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
</template>

<script>
import Login from "@/components/Identify/Login";
import Register from "@/components/Identify/Register";
import EmailRegister from "@/components/Identify/EmailRegister";
import EmailLogin from "@/components/Identify/EmailLogin";
export default {
  name: "Identify",
  data(){
    return{
      tab: null,
      items: [
        { tab: 'Впервые на сайте?', content: Register},
        { tab: 'Уже есть аккаунт?', content: Login},
        { tab: '', content: EmailRegister, style: {display: 'none'}},
        { tab: '', content: EmailLogin, style: {display: 'none'}},
      ],
    }
  },
  computed:{
    processing(){
      return this.$store.getters.getProcessing
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
/deep/ div.v-tab {
  font-weight: 300;
}
</style>