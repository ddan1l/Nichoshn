<template>
<div>
  <v-dialog v-if="isAuthenticated" v-model="logoutDialog"  max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn  active-class="activeBtn" v-bind="attrs" v-on="on"  text>
        Выйти
      </v-btn>
    </template>
    <v-card>
      <v-card-title style="word-break: break-word ;" class="headline ">
        Вы действительно хотите выйти?
      </v-card-title>
      <v-card-text>
        В дальнейшем вы можете очень сильно пожалеть об этом.
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="logoutDialog = false">
          Не надо
        </v-btn>
        <v-btn color="red darken-1" text @click="logoutDialog = false; signout()">
          Я согласен
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</div>

</template>

<script>
import firebase from 'firebase'
export default {
  name: "Profile",
  data(){
    return{
      logoutDialog: false
    }
  },
  created() {
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      console.log(idToken)
    }).catch(function(error) {
      console.log(error)
    });
  },
  methods:{
    signout(){
      this.$store.dispatch('SIGNOUT')
      this.$router.push("/")
    }
  },
  computed:{
    isAuthenticated(){
      return this.$store.getters.isAuthenticated
    },
  }
}
</script>

<style scoped>

</style>