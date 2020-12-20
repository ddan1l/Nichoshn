<template>
  <div>
    <v-app-bar
        style="z-index: 2"
        absolute
        color="transparent"
        :extended = "!isHidden"
        flat
        height="80"
        app>
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="container">
        <router-link to="/" tag="h1">
        <h1 style="cursor: pointer" class="logo">
          Ничошный шоп
        </h1>
        </router-link>
        <v-btn style="cursor: default; opacity: 0;"></v-btn>
        <v-dialog v-model="authDialog" max-width="500">
          <Identify/>
        </v-dialog>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn :style="{border: $route.path === '/profile' ? '1px solid': 'none' }"
                   x-small text fab v-bind="attrs" v-on="on" class="pa-5 float-right"
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
            <v-btn to="/wishlist" v-bind="attrs" v-on="on"  x-small  text fab class="pa-5 mr-2 ml-2 float-right">
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
        </v-tooltip>
        </div>
      <template v-if="!isHidden" class="hidden-sm-and-down red--text" v-slot:extension>
        <v-container style="display: flex; justify-content: space-between; max-width: min-content">
          <v-btn height="48" tile class="sectionLink" text to="/">
            Главная
          </v-btn>
          <v-btn color="red" class="sectionLink" height="48" tile text to="/novelties">
            Новинки
          </v-btn>
          <v-menu elevation="0" rounded="0" offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn height="48"
                       link
                       class="sectionLink"
                       :class="{activeLink: $route.path.includes('clothes')}"
                       v-bind="attrs"
                       v-on="on"
                       tile text>
                  Одежда
                </v-btn>
            </template>
            <v-list class="pa-0 pt-2">
              <div class="pl-4">Категории</div>
              <v-divider class="mx-4 mt-2 ">''</v-divider>
              <v-list-item
                  :to= "'/clothes/'+item.categoryURL"
                  v-for="(item, index) in clothingCategories"
                  :key="index"
              >
                <v-list-item-title >{{ item.category }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn class="sectionLink" height="48" tile text>
            Аксессуары
          </v-btn>
          <v-btn class="sectionLink" height="48" tile text to="/picture">
            Картины
          </v-btn>
          <v-btn class="sectionLink" height="48" tile text to="/constructor">
            Конструктор
          </v-btn>
        </v-container>
      </template>

    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute  temporary >
      <v-list class="hidden-md-and-up" nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
          <v-list-item  text>
          </v-list-item>
          <v-list-item @click="signout" v-if="isAuthenticated" text>
            <v-icon color="primary" left>mdi-logout-variant</v-icon>
            Выйти
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import Identify from "@/components/Identify";
export default {
  name: "AppHeader",
  components:{
    Identify: Identify
  },
  data(){
    return {
      authDialog: false,
      drawer: false,
      group: null,
    }
  },
  computed:{
      clothingCategories(){
        return this.$store.getters.getClothingCategories
      },
      isHidden(){
        let name = this.$route.name
        return name === 'Identify' || name === 'Constructor' || name === 'Profile';
      },
      isAuthenticated(){
        return this.$store.getters.isAuthenticated
      },
      isEmailVerified(){
        return this.$store.getters.isEmailVerified
      }
  },
  methods:{
   signout(){
      this.$store.dispatch('SIGNOUT')
      this.$router.push("/")
   }
  },
  watch: {
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

.logo {
  font-size: 28px;
  text-transform: uppercase;
  font-weight: 300;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
/*
/deep/ div.v-toolbar__extension {
  background-color: 0 0;
}*/

/deep/ .sectionLink > .v-btn__content {
  font-weight: 300;
}
.v-list-item__title {
  font-weight: 300;
}
.activeLink{
  border: 1px solid;
  background-color: transparent;
}
/deep/ a.v-btn--active::before{
  border: 1px solid;
  background-color: transparent;
}
/deep/ a.v-btn--active{
  border: 1px solid;
  background-color: transparent;
}
/deep/ div.v-toolbar__content {
  background-color: white;
}
i{
  font-size: 16px;
}
/deep/.activeLink:focus {
  border: none;
  outline: none;
  border: 1px solid;
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