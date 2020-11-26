<template>
  <div>
    <v-app-bar
        style="z-index: 2"
        absolute
        color="transparent"
        :extended = "!isIdentify"
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
        <v-tooltip v-if="!isIdentify" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn x-small text fab v-bind="attrs" v-on="on" to="/profile" class="pa-5 float-right">
              <v-icon dark>
                far fa-user
              </v-icon>
            </v-btn>
          </template>
          <span>Профиль</span>
        </v-tooltip>
        <v-tooltip v-if="!isIdentify" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn to="/wishlist" v-bind="attrs" v-on="on"  x-small  text fab class="pa-5 mr-2 ml-2 float-right">
              <v-icon dark>
                far fa-heart
              </v-icon>
            </v-btn>
          </template>
          <span>Избранное</span>
        </v-tooltip>

        <v-tooltip v-if="!isIdentify"  bottom>
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


      <template v-if="!isIdentify" class="hidden-sm-and-down red--text" v-slot:extension>
        <v-container style="display: flex; justify-content: space-between; max-width: 750px">
          <v-btn height="48" tile text to="/">
            Главная
          </v-btn>
          <v-btn color="red" height="48" tile text to="/novelties">
            Новинки
          </v-btn>
          <v-menu  elevation="0" rounded="0" offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn height="48"
                       link
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

          <v-btn height="48" tile text>
            Аксессуары
          </v-btn>
          <v-btn height="48" tile text to="/picture">
            Картины
          </v-btn>

          <v-btn height="48" tile text to="/constructor">
            Конструктор
          </v-btn>

          <v-dialog v-if="isAuthenticated" v-model="logoutDialog"  max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-btn   active-class="activeBtn" v-bind="attrs" v-on="on"  text>
                <v-icon color="white" left>mdi-logout-variant</v-icon>
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

export default {
  name: "AppHeader",
  data(){
    return {
      drawer: false,
      group: null,
      logoutDialog: false
    }
  },
  computed:{
      clothingCategories(){
        return this.$store.getters.getClothingCategories
      },
      isIdentify(){
        if (this.$route.name === 'Identify'){
          return true
        }
        else {
          return false
        }
      },
      isAuthenticated(){
        return this.$store.getters.isAuthenticated
      },
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
/deep/ div.v-toolbar__extension {
  background-color: 0 0;
}

/deep/ span.v-btn__content {
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
/deep/.v-btn:focus {
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
.v-navigation-drawer.v-navigation-drawer--absolute.v-navigation-drawer--close.v-navigation-drawer--is-mobile.v-navigation-drawer--temporary.theme--light {
  z-index: 1 !important;
}

</style>