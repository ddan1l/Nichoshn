<template>
  <v-container style="background-color: #fafafa !important;" class="align-start pa-0" fluid fill-height>
    <v-row style="height: 100%">
      <v-col sm="2" class="py-0 pr-0" style="height: 100%; position: fixed">
        <v-card height="100%">
          <v-list>
            <v-list-item class="px-3 py-1">
              <v-list-item-avatar>
                <v-img :src="user.photoURL"></v-img>
              </v-list-item-avatar>
              <v-list-item-title>{{user.displayName}}</v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-item @click="activeComponent = item.content" v-for="item in items" :key="item.title" link>
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-list>
        </v-card>
      </v-col>
      <v-col sm="10" offset-sm="2" class="pa-10 grey lighten-5" >
        <v-container style="position: relative" class="align-start" fluid fill-height>
          <keep-alive>
            <component v-bind:is="activeComponent"/>
          </keep-alive>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Create from "@/components/Admin/Create";
import Categories from "@/components/Admin/Categories";
import Colors from "@/components/Admin/Colors";
export default {
  name: "Admin",
  data(){
    return{
      drawer: true,
      activeComponent: '',
      items: [
        { title: 'Статистика', icon: 'far fa-chart-bar',},
        { title: 'Просмотр', icon: 'far fa-address-book' },
        { title: 'Добавить товар', icon: 'fas fa-plus', content: Create },
        { title: 'Категории', icon: '$layerGroup', content: Categories },
        { title: 'Цвета', icon: 'fas fa-palette', content: Colors },
      ],
      mini: true,
    }
  },
  computed: {
    user(){
      return this.$store.getters.user
    }
  }
}
</script>
<style scoped>
/deep/path {
  fill: #757575 !important;
}
</style>
