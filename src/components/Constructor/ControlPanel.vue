<template>
  <v-navigation-drawer permanent absolute >
    <v-list nav dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon style="width: 24px">$download</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Сохранить шаблон</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon size="22">fas fa-reply</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Изменить шаблон</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon size="22">far fa-handshake</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="purchase">Оформить заказ</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <label>
            <span aria-hidden="true">
              <v-list-item link>
              <v-list-item-icon >
                <v-icon style="width: 24px">far fa-file-image</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Добавить картинку</v-list-item-title>
            </v-list-item>
            </span>
        <v-file-input accept="image/png, image/jpeg, image/bmp" v-model="files" multiple @change="addFile()" class="d-none" type="file" style="display:none"></v-file-input>
      </label>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon>$arrows</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Переместить </v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>fa-eraser</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Ластик</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider> </v-divider>
    <v-list nav dense>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>$layerGroup</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <v-treeview :class="files.length === 0 ? 'absolute': undefined" open-on-click :active.sync="active"  color="dark" hoverable activatable :items="getLayers">
            <template v-slot:prepend="{item}">
              <v-icon @click="revertVisibility(item)" size="16" class="mr-3" v-if="!item.children && item.isVisible">
                far fa-eye
              </v-icon>
              <v-icon @click="revertVisibility(item)" size="16" class="mr-3" v-if="!item.children && !item.isVisible">
                far fa-eye-slash
              </v-icon>
              <v-avatar tile class="mr-2" v-if="!item.children"  width="18" height="24">
                <img :src="item.image" alt="">
              </v-avatar>
            </template>
          </v-treeview>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "ControlPanel",
  props:{
    layers: Array
  },
  data(){
    return{
      active: [0],
      files: [],
      imagesCount: 0
    }
  },

  methods:{
    addFile(){
      this.files.forEach(file =>{
        new Promise(resolve => {
          let reader = new FileReader()
          reader.onload = function(e) {
            resolve(e.target.result)
          }
          reader.readAsDataURL(file)
        })
        .then((image)=>{
          this.layers[0].children.push({
            id: this.imagesCount,
            name: file.name,
            image: image,
            isVisible: true
          })
          this.imagesCount++
        })
      })
      this.$emit('refresh', this.layers)
    },

    revertVisibility(item){
      item.isVisible = ! item.isVisible
      this.$emit('refresh', this.layers)
    }
  },
  computed:{
    getLayers(){
      return this.layers
    }
  }
}
</script>

<style scoped>
.absolute{
    width: 150px !important;
    position: absolute;
    top: 0;
}
.v-avatar.mr-2.rounded-0 {
  min-width: 0 !important;
}
</style>