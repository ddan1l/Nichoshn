<template>
  <v-app>
    <app-header></app-header>
      <v-content>
        <router-view></router-view>
      </v-content>
  </v-app>
</template>

<script>
import Header from "@/components/Header/index";
export default {
  name: 'App',
  components: {
    AppHeader: Header
  },
};
</script>
