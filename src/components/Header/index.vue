<template>
  <div class="header ">
    <div class="topContainer">
      <div>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="text-capitalize"
                color="grey"
                dark
                text
                v-bind="attrs"
                v-on="on"
            >
              Помощь
              <v-icon size="10" class="ml-5 mt-1">fas fa-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="text-capitalize"
               color="grey"
               dark
               text>Контакты</v-btn>
        <v-btn class="text-capitalize"
               color="grey"
               dark
               text>Магазины</v-btn>
      </div>
      <v-btn class="text-capitalize"
             color="grey"
             dark
             text>044 365 94 94</v-btn>
    </div>
    <div class="middleContainer">
      <div>
        <v-btn class="text-capitalize middleBtn px-10 py-6"
               color="white"
               dark
               text>
          Женищнам
        </v-btn>
        <v-btn class="text-capitalize middleBtn px-10 py-6"
               color="white"
               dark
               text>
          Мужчинам
        </v-btn>
        <v-btn class="text-capitalize middleBtn px-10 py-6"
               color="white"
               dark
               text>
          Детям
        </v-btn>
      </div>
      <div class="logo px-10 py-2">
        <span>Н</span>ичошный шоп
      </div>
      <div>
        <v-btn  class="text-capitalize middleBtn px-5 py-6"
               color="grey"
               dark
               text>
          Войти
        </v-btn>
        <v-btn  class="text-capitalize middleBtn px-2 py-6"
                color="white"
                dark
                text>
         <v-icon class="mr-2" size="14">far fa-heart</v-icon>
          1
        </v-btn>
        <v-btn  class="text-capitalize middleBtn px-2 py-6"
                color="white"
                dark
                text>
          <v-icon class="mr-2" size="15">$shoppingBag</v-icon>
          2
        </v-btn>
      </div>

  </div>
    <div class="bottomContainer">
      <div>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="text-capitalize"
                color="grey"
                dark
                text
                v-bind="attrs"
                v-on="on"
            >
              Помощь
              <v-icon size="10" class="ml-5 mt-1">fas fa-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="text-capitalize"
               color="grey"
               dark
               text>Контакты</v-btn>
        <v-btn class="text-capitalize"
               color="grey"
               dark
               text>Магазины</v-btn>
      </div>
      <v-btn class="text-capitalize"
             color="grey"
             dark
             text>044 365 94 94</v-btn>
    </div>
  </div>
<!--  <div v-scroll="handleScroll">
    <div class="gray"></div>
    &lt;!&ndash;      <div class="video">
    <v-img src="../../assets/bacl.jpg"></v-img>&ndash;&gt;
&lt;!&ndash;      <video ref="video"  muted loop>
        <source src="../../assets/homeVideo3.mp4" type="video/mp4">
        Your browser does not support HTML5 video.
      </video>
    </div>&ndash;&gt;
&lt;!&ndash;   <v-btn color="black" outlined @click="animate= !animate" style="position: absolute; top: 20px; right: 20px; z-index: 15">toggle</v-btn>&ndash;&gt;
&lt;!&ndash;  <v-btn color="black" outlined @click="pause= !pause" style="position: absolute; top: 64px; right: 20px; z-index: 5">video: {{pause}}</v-btn>&ndash;&gt;
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
        height="70"
        flat
        >
        <div class="wideContainer">
          <v-row  align="center">
            <div style="display: flex; align-items: center">
              <v-btn width="40" height="40" icon>
                <v-icon size="20" color="black"  @click.stop="drawer = !drawer">
                  fas fa-bars
                </v-icon>
              </v-btn>
              <div class="ml-2 text">Меню</div>
            </div>
            <v-spacer></v-spacer>
              <router-link animateHeader to="/" tag="h1">
                <div class="logo">
                    <span>Н</span>Ч
                </div>
              </router-link>

&lt;!&ndash;           <div>
             &lt;!&ndash;  eslint-disable-next-line vue/no-use-v-if-with-v-for&ndash;&gt;
             <v-btn animateHeader :color="item.color" height="40" v-for="(item, index) in navLinks" active-class="activeLink" :key="index" class="sectionLink"  tile text :to="item.route">
               {{item.name}}
             </v-btn>
           </div>&ndash;&gt;

              <div style="display: flex; align-items: center">
                  <v-btn animateHeader :style="{border: $route.path === '/profile' ? '1px solid': 'none' }"
                         x-small text fab  class="pa-5 mr-2 ml-2 sectionLink"
                         @click="isAuthenticated && isEmailVerified  ? $router.push('/profile') : authDialog = true">
                    <v-icon dark>
                    $alien
                    </v-icon>
                  </v-btn>
                  <div class="text">Аккаунт</div>

                <v-btn ref="basket" animateHeader to="/basket" x-small text fab class=" ml-5 pa-5 sectionLink">
                  <v-badge dot :color="badge ? 'red' : 'transparent'">
                      <v-icon dark>
                        $shoppingBag
                      </v-icon>
                  </v-badge>
                </v-btn>

              </div>
          </v-row>
        </div>
    </v-app-bar>
    </transition>
      <v-navigation-drawer v-model="drawer" absolute temporary >
        <v-list nav dense>
          <v-list-item-group v-model="group" >
            <v-list-item :to="link.route" v-for="(link, index) in navLinks" :key="index" >
              {{link.name}}
            </v-list-item>
            <v-list-item @click="signout" v-if="isAuthenticated" text>
              <v-icon color="primary" left>mdi-logout-variant</v-icon>
              Выйти
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
  </div>-->
</template>

<script>
import Identify from "@/components/Identify";
import Velocity from 'velocity-animate'
export default {
  name: "Header",
  components:{
    // eslint-disable-next-line vue/no-unused-components
    Identify
  },
  data(){
    return {
      pause: false,
      delay: 0,
      animate: true,
      animatedList: [],
      show: false,
      authDialog: false,
      drawer: false,
      group: null,
      badge: false,
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
/*        {
          name: 'Конструктор',
          route: '/constructor'
        },*/
        {
          name: 'Контакты',
          route: '/contacts'
        },
      ],
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }
  },
  computed:{
    productAdded(){
        return this.$store.getters.productAdded
    },
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
    handleScroll(){
     // this.animate = window.scrollY <= 0;
    },
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
    $route(to){
      if ( to.name === 'Basket'){
        this.badge = false
      }
    },
    productAdded(){
      //console.log(this.$refs.basket.$el)
      this.badge = true
    },
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
<style>
.wideContainer{
  display: flex; justify-content: space-between; width: 100%; padding: 0 60px
}
</style>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,300&display=swap');
.topContainer{
  display: flex;
  width: 97%;
  margin: 0 auto;
  justify-content: space-between;
}
.middleContainer {
  background-color: #232323;
  display: flex;
  justify-content: space-between;
}
.logo span{
  color: #232323;
  position: relative;
}
.logo span::after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: -1;
}
.logo{
  color: white;
  font-family: 'Montserrat', sans-serif;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  font-weight: 500;
}
.v-btn  {
  font-family: 'Montserrat', sans-serif;
  font-size: 12px ;
}
/deep/.v-icon__component.theme--dark {
  fill: white;
}

/*
.gray {
  width: 46%;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: #f5f5f5;
  right: 0;
}
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,300&display=swap');
.v-icon.notranslate.mdi.mdi-menu.theme--light {
  color: black;
  font-size: 28px;
}
.logo{
  position: absolute;
  left: 50%;
  top: 17px;
  font-size: 24px;
  transform: translateX(-50%);
  font-family: 'Montserrat', sans-serif;
  font-weight: 900;
  letter-spacing: 3px;
}


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

.text{
  font-weight: 700 !important ;
  font-family: 'Montserrat', sans-serif !important;
  font-size: 14px;
}

!*.logo span{
  font-weight: 300;
  background-color: black;
  color: white;
  padding: 5px;
  font-size: 26px;
}

 *!

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
*/


</style>