import Vue from 'vue'
import App from './App.vue'
import router from './router/route'
import store from './store/store'
import vuetify from './plugins/vuetify';
import VNus from "vue-nouislider-fork";
import firebaseConfig from './config/firebase'
import firebase from "firebase";
import VueKonva from 'vue-konva'

Vue.use(VueKonva)
Vue.use(VNus)
Vue.config.productionTip = false
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    let vm = this
    firebase.auth().onAuthStateChanged(function(user) {
     vm.$store.dispatch('STATE_CHANGED', user).then()
    });
  }
}).$mount('#app')
