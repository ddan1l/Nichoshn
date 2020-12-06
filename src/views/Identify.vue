<template>
  <v-container>
    <v-card elevation="0" tile outlined max-width="600" class="mx-auto pa-0">
      <v-tabs
          fixed-tabs
          color="black"
          v-model="tab"
      >
        <v-tab
            v-for="item in items"
            :key="item.tab"
        >
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
            v-for="item in items"
            :key="item.tab"
        >
          <v-card flat>
            <component v-bind:is="item.content"></component>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>

</template>

<script>
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
export default {
  name: "Identify",

  data(){
    return{
        tab: null,
      items: [
        { tab: 'Впервые на сайте?', content: SignUp},
        { tab: 'Войти в аккаунт', content: SignIn},
      ],
    }
  }
}
</script>

<style scoped>
/deep/ div.v-tab {
  font-weight: 300;
}
</style>