<template>
<stepper v-if="!configurationState"></stepper>

</template>

<script>
import Stepper from "@/components/Constructor/Stepper";
export default {
  name: "Constructor",
  components:{
    Stepper
  },
  computed:{
    configurationState(){
      return this.$store.getters.getConfigurationState
    }
  }
}
</script>

<style scoped>

</style>