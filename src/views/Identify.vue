<template>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
      <v-col class="pb-16">
        <Identify/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Identify from "@/components/Identify";
export default {
  components:{
    Identify: Identify
  },
}
</script>