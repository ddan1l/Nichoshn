 <template>
   <v-container class="mt-4 pa-0">
    <v-stepper v-model="stepperModel" vertical>
      <v-stepper-step color="black" :complete="stepperModel > 1" step="1">
         О констукторе
        <small class="mt-1" v-if="stepperModel === 1">проясняющая иформация</small>
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
        <v-btn outlined color="black" @click="stepperModel = 2">
          Понятно
        </v-btn>
      </v-stepper-content>
      <v-stepper-step  color="black" :complete="stepperModel > 2" step="2">
        Категория
        <small class="mt-1" v-if="stepperModel === 2"> кликните на ту категорию, кастом которой хотели бы иметь</small>
      </v-stepper-step>
      <v-stepper-content step="2">
          <CategoryTemplates @selected="selectedTemplate = $event"/>
        <v-btn :disabled="!selectedTemplate" outlined color="black" @click="stepperModel = 3">
        Продолжить
        </v-btn>
        <v-btn class="ml-3" text @click="stepperModel = 1">
          Назад
        </v-btn>
      </v-stepper-content>

      <v-stepper-step color="black" :complete="stepperModel > 3" step="3">
        Параметы
        <small class="mt-1" v-if="stepperModel === 3"> выберите модель, цвет и размер</small>
      </v-stepper-step>

      <v-stepper-content step="3">
        <CategoryPatterns @patternSelected="selectedPattern = $event" v-if="selectedTemplate" :selectedIDTemplate="selectedTemplate.categoryId"/>
        <v-btn :disabled="!selectedPattern" outlined color="black" @click="configure()">
          Хорошо
        </v-btn>
        <v-btn class="ml-3" text @click="stepperModel = 2">
          Назад
        </v-btn>
      </v-stepper-content>
    </v-stepper>
   </v-container>
  </template>

<script>
import CategoryPatterns from "@/components/Constructor/СategoryPatterns"
import CategoryTemplates from "@/components/Constructor/CategoryTemplates";
export default {
  name: "Stepper",
  components:{
    CategoryTemplates,
    CategoryPatterns
  },
  data(){
    return{
     // animationClass: 'animate__animated animate__zoomIn',
      stepperModel: 1,
      selectedTemplate: 0,
      selectedPattern: 0
    }
  },
  methods:{
    configure(){
     // this.animationClass = 'animate__animated animate__zoomOut'
      this.$store.dispatch('CONFIGURE', this.selectedPattern)
      this.$emit('configure')
    }
  }
}
</script>

<style scoped>
/deep/.row.fill-height.ma-0.align-center.justify-center {
  transform: translateX(-50%) !important;
}

.v-stepper.v-stepper--vertical.theme--light {
  box-shadow: none;
  border: thin solid rgba(0, 0, 0, 0.12);
}

.v-main__wrap.v-content__wrap{
  margin-top: -40px !important;
}

</style>