import Vue from 'vue'
import App from './App.vue'
import router from './router/route'
import store from './store/store'
import vuetify from './plugins/vuetify';
import VNus from "vue-nouislider-fork";
import firebaseConfig from './config/firebase'
import firebase from "firebase";
import "firebase/firestore"
import VueKonva from 'vue-konva'
import VueCookies from 'vue-cookies'

Vue.use(VueCookies)
Vue.use(VueKonva)
Vue.use(VNus)
Vue.config.productionTip = false
const firebaseApp =  firebase.initializeApp(firebaseConfig);
Vue.prototype.$db = firebaseApp.firestore()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.$store.dispatch('STATE_CHANGED', user).then()
    });
    this.$store.dispatch('GET_DATA').then()
  }
}).$mount('#app')
