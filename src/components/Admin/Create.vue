<template>
<v-row>
  <v-col class="pt-0">
    <v-card class="pt-3 px-10" height="600">
      <v-card-title class="font-weight-regular px-0">
        Добавить товар
      </v-card-title>
      <v-row>
        <v-col sm="6" :class="'pb-0'">
          <v-text-field
              v-model="name"
              color="black"
              :rules="nameRules"
              outlined
              placeholder="Название"
          ></v-text-field>
        </v-col>
        <v-col sm="6" class="pb-0">
          <v-text-field
              readonly
              v-model="url"
              color="black"
              hide-details
              outlined
              placeholder="URL"
          ></v-text-field>
        </v-col>
        <v-col class="py-0">
          <v-textarea
              rows="4"
              v-model="description"
              :rules="descriptionRules"
              color="black"
              outlined
              placeholder="Описание"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
export default {
  name: "Create",
  data(){
    return{
      name: '',
      description: '',
      error: false,
      descriptionRules: [
        value => (value && value.length <= 500) || 'Максимум 500 символов',
      ],
      nameRules: [
        value => !!value || 'Обязательно',
        value => (value && value.length >= 3) || 'Минимум 3 символа',
        value => (value && value.length <= 50) || 'Максимум 50 символов',
      ],
    }
  },
  methods:{
    show(){
      console.log("SS")
    }
  },
  computed:{
    url(){
      let str = this.name
      let space = '-';
      let link = '';
      let transl = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
        'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': space,
        'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya'
      }
      if (str !== '')
        str = str.toLowerCase();
      for (let i = 0; i < str.length; i++){
        if (/[а-яё]/.test(str.charAt(i))){
          link += transl[str.charAt(i)];
        } else if (/[a-z0-9]/.test(str.charAt(i))){
          link += str.charAt(i);
        } else {
          if (link.slice(-1) !== space) link += space;
        }
      }
      return link
    }
  }
}
</script>

<style scoped>

</style>