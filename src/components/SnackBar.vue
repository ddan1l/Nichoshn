<template>
  <v-snackbar outlined :timeout="10000" v-model="snack">
    <v-alert class="mx-auto mb-0" max-width="390" text :icon="status === 'error'? 'fas fa-exclamation-triangle' : 'far fa-check-circle'" dense outlined :type="status">
      {{message}}
      <v-btn @click="closeSnack()" width="20" height="20" class="dismiss" icon>
            <span class="fa-stack fa-2x">
              <i style="color: white" class="fas fa-circle fa-stack-1x"></i>
              <i style="color: #ff5252" class="fas fa-times-circle fa-stack-1x fa-inverse"></i>
            </span>
      </v-btn>
    </v-alert>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  props: {
    message: String,
    status: String
  },
  data(){
    return{
      snack: false
    }
  },
  methods: {
    closeSnack() {
      this.snack = false
      setTimeout(() => {
        this.$store.commit('CLEAR_ERROR')
      }, 1000)
    },
  },
  watch:{
    message(){
      this.snack = true
    }
  }
}
</script>

<style scoped>
.fa-stack-1x {
  color:white;
}
.dismiss.v-btn.v-btn--flat.v-btn--icon.v-btn--round.theme--light.v-size--default {
  position: absolute;
  top: -7px;
  right: -7px;
}
.v-icon.notranslate.fas.fa-times-circle.theme--light.error--text {
  width: 20px;
  height: 20px;
}
.v-icon.notranslate.v-alert__icon.fas.fa-exclamation-triangle.theme--light.error--text {
  font-size: 18px;
  align-self: center;
}
div.v-snack__content {
  padding: 0 !important;
  margin-right: -9px;
}
div.v-snack__wrapper{
  border: none !important;
}
.fa-2x {
  font-size: 1.7em;
  width: 25px;
}
i{
  vertical-align: middle;
  height: 25px;
}
/deep/.v-snack__wrapper.v-sheet.v-sheet--outlined.theme--light {
  margin-bottom: 40px!important;
}
/deep/.v-snack__wrapper.v-sheet.v-sheet--outlined.theme--light {
  min-height: 0 !important;
}
</style>