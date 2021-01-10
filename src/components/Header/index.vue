<template>
  <div>
    <div class="video">
      <video ref="video"  muted loop>
        <source src="../../assets/homeVideo3.mp4" type="video/mp4">
        Your browser does not support HTML5 video.
      </video>
    </div>
    <v-btn color="black" outlined @click="animate= !animate" style="position: absolute; top: 20px; right: 20px; z-index: 15">toggle</v-btn>
    <v-btn color="black" outlined @click="pause= !pause" style="position: absolute; top: 64px; right: 20px; z-index: 5">video: {{pause}}</v-btn>
    <v-dialog v-model="authDialog" max-width="500">
      <Identify/>
    </v-dialog>
    <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        :css="false">
    <v-app-bar
        ref="header"
        v-show="animate"
        :class="$route.path==='/admin'? 'admin' : undefined"
        :style="{position: $route.path==='/admin'?  'fixed': undefined}"
        color="transparent"
        flat
        app
        >
<!--      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>-->
        <v-container>
          <v-row  align="center"  justify="space-between">
              <router-link animateHeader to="/" tag="h1">
                <div style="cursor: pointer" class="logo">
                  <span>Ничошный</span>
                   шоп
                </div>
              </router-link>
           <div>
             <!--  eslint-disable-next-line vue/no-use-v-if-with-v-for-->
             <v-btn animateHeader :color="item.color" height="40" v-for="(item, index) in navLinks" active-class="activeLink" :key="index" class="sectionLink"  tile text :to="item.route">
               {{item.name}}
             </v-btn>
           </div>
            <div>

              <v-btn animateHeader to="/wishlist" x-small text fab class="pa-5 sectionLink ">
                <v-icon dark>
                  far fa-heart
                </v-icon>
              </v-btn>
              <v-btn animateHeader :style="{border: $route.path === '/profile' ? '1px solid': 'none' }"
                     x-small text fab  class="pa-5 mr-2 ml-2 sectionLink"
                     @click="isAuthenticated && isEmailVerified  ? $router.push('/profile') : authDialog = true">
                <v-icon dark>
                  far fa-user
                </v-icon>
              </v-btn>
              <v-btn animateHeader to="/basket" x-small text fab class="pa-5 sectionLink">
                <v-icon dark>
                  $shoppingBag
                </v-icon>
              </v-btn>

                  <!--              <v-tooltip v-model="show"  bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn @mouseleave="show = false" @mouseover="show = true" :style="{border: $route.path === '/profile' ? '1px solid': 'none' }"
                           x-small text fab v-bind="attrs" class="pa-5 float-right"
                           @click="isAuthenticated && isEmailVerified  ? $router.push('/profile') : authDialog = true">
                      <v-icon dark>
                        far fa-user
                      </v-icon>
                    </v-btn>
                  </template>
                  <span>Профиль</span>
                </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn to="/wishlist" v-bind="attrs" v-on="on" x-small  text fab class="pa-5 mr-2 ml-2 float-right">
                    <v-icon dark>
                      far fa-heart
                    </v-icon>
                  </v-btn>
                </template>
                <span>Избранное</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template  v-slot:activator="{ on, attrs }">
                  <v-btn to="/basket" v-on="on" v-bind="attrs"  x-small text fab class="pa-5 float-right">
                    <v-icon dark>
                      $shoppingBag
                    </v-icon>
                  </v-btn>
                </template>
                <span>Корзина</span>
              </v-tooltip>-->
            </div>

          </v-row>

        </v-container>
          <!--      <template v-if="!isHidden" class="hidden-sm-and-down red&#45;&#45;text" v-slot:extension>
        <v-container class="mt-3" style="display: flex; justify-content: space-between; max-width: min-content">
          <v-btn :color="item.color"  v-for="(item, index) in navLinks" :key="index" class="sectionLink" height="48" tile text :to="item.route">
            {{item.name}}
          </v-btn>
        </v-container>
      </template>-->
    </v-app-bar>
    </transition>
        <!--      <v-navigation-drawer v-model="drawer" absolute temporary >
        <v-list class="hidden-md-and-up" nav dense>
          <v-list-item-group v-model="group" active-class="deep-purple&#45;&#45;text text&#45;&#45;accent-4">
            <v-list-item  text>
            </v-list-item>
            <v-list-item @click="signout" v-if="isAuthenticated" text>
              <v-icon color="primary" left>mdi-logout-variant</v-icon>
              Выйти
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>-->
  </div>
</template>

<script>
import Identify from "@/components/Identify";
import Velocity from 'velocity-animate'
export default {
  name: "Header",
  components:{
    Identify
  },
  data(){
    return {
      pause: false,
      delay: 0,
      animate: false,
      animatedList: [],
      show: false,
      authDialog: false,
      drawer: false,
      group: null,
      navLinks: [
        {
          name: 'Главная',
          route: '/'
        },
        {
          name: 'Новинки',
          route: '/novelties',
          color: 'red'
        },
        {
          name: 'Категории',
          route: '/categories'
        },
        {
          name: 'Конструктор',
          route: '/constructor'
        },
        {
          name: 'Контакты',
          route: '/contacts'
        },
      ]
    }
  },
  computed:{
      isAuthenticated(){
        return this.$store.getters.isAuthenticated
      },
      isEmailVerified(){
        return this.$store.getters.isEmailVerified
      },
  },
  mounted() {
    this.animatedList =  Array.from(document.querySelectorAll('[animateHeader]'))
    setTimeout( () =>this.animate = true, 1000)

  },
  methods:{
    beforeEnter() {
      for (let child of this.animatedList){
         child.style.opacity = 0
      }
    },
    enter(el, done) {
      let arr = this.animatedList
      for (let child of arr){
        this.delay+=100
        if (arr.indexOf(child) === arr.length -1){
          Velocity(child, { opacity: 1, translateY: '10px'}, {duration: 200, delay: this.delay }, { complete: done })
        }
        else {
          Velocity(child, { opacity: 1, translateY: '10px'}, {duration: 200, delay: this.delay })
        }
      }
    },
    leave(el, done) {
      this.delay = 0
      let arr = this.animatedList
      for (let child of this.animatedList){
        this.delay+=50
        if (arr.indexOf(child) === arr.length -1){
          Velocity(child, { opacity: 0, translateY: '-10px'}, {duration: 100, delay: this.delay },{ complete: done })
        }
        else {
          Velocity(child, { opacity: 0, translateY: '-10px'}, {duration: 100, delay: this.delay })
        }
      }
      setTimeout(() => {
        this.$refs.header.$el.style.display ='none'
      }, this.delay + 500)
    },
   signout(){
      this.$store.dispatch('SIGNOUT')
      this.$router.push("/")
   }
  },
  watch: {
    pause(val){
      if (val){
        this.$refs.video.play()
      }
      else {
        this.$refs.video.pause()
      }

    },
    group () {
      this.drawer = false
    },
    isAuthenticated(val){
      if (val){
        if (this.isEmailVerified){
          this.authDialog = false
        }
      }
    }
  },
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400&display=swap');
.video {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
  filter: blur(3px) grayscale(0%) ;

}
.video::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff73;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.92) 100%);
}

/deep/.v-btn__content{
  font-weight: 400 !important ;
  /*font-family: 'Roboto Condensed', sans-serif !important;*/
  font-size: 14px;
}
.logo {
  font-size: 28px;
  font-family: 'Roboto Condensed', sans-serif !important;
  text-transform: uppercase;
  font-weight: 300;
}
/*.logo span{
  font-weight: 300;
  background-color: black;
  color: white;
  padding: 5px;
  font-size: 26px;
}

 */

.v-list-item__title {
  font-weight: 300;
}

/deep/.theme--light.v-btn--active:hover::before, .theme--light.v-btn--active::before {
  opacity: 0;
}
/deep/.theme--light.v-btn:hover::before {
  opacity: .1 !important;
}

i{
  font-size: 16px;
}

.admin{
  border-bottom: 1px solid #dadada;
  box-shadow: 0 1px 5px #0000002e;
  position: fixed;
}
/deep/.v-toolbar__content {
  padding: 0 !important;
}
.v-menu__content {
  border: 1px solid;
  box-shadow: none;
  z-index: 1 !important;
  min-width: 162px !important;
  top: 134px !important;
}
header{
  z-index: 2;
}
/deep/.v-toolbar__content {

}
.v-btn.v-btn--flat.v-btn--router.v-btn--text.v-btn--tile.theme--light.v-size--default, .v-btn.v-btn--flat.v-btn--text.v-btn--tile.theme--light.v-size--default {
  margin: 0 10px;
}
/deep/.v-dialog {
  overflow: hidden !important;
}
.v-navigation-drawer.v-navigation-drawer--absolute.v-navigation-drawer--close.v-navigation-drawer--is-mobile.v-navigation-drawer--temporary.theme--light {
  z-index: 1 !important;
}


</style>