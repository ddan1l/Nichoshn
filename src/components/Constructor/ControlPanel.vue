<template>
  <v-navigation-drawer expand-on-hover permanent absolute >
    <v-list nav dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon style="width: 24px">$download</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Сохранить</v-list-item-title>
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
      <!-- <v-list-item link>
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
      </v-list-item>-->
    </v-list>
    <v-divider> </v-divider>
    <v-list nav dense>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>$layerGroup</v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                Слои
              </v-list-item-title>
            </v-list-item>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <h2 v-if="layers.length===0" class="addPicture">Добавьте изображения!</h2>
            <v-list flat v-else>
                <draggable
                    class="list-group"
                    tag="div"
                    :list="layers"
                    v-bind="dragOptions"
                    @start="drag = true"
                    @end="drag = false"
                >
                <transition-group type="transition" :name="!drag ? 'flip-list' : null">
                <v-list-item :class="layer.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
                             @click="layer.fixed = !layer.fixed"
                             :ripple="false"
                             aria-hidden="true" class="list-group-item"
                             v-for="(layer, index) in layers" :key="index">
                  <v-list-item-icon>
                    <v-icon style="margin-left: 2px" @click="revertVisibility(layer)" size="18">{{layer.isVisible? 'far fa-eye' : 'far fa-eye-slash'}}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{layer.fileName}}</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-icon>
                    <v-avatar style="margin-top: 2px" size="20" color="transparent">
                      <v-img :src="layer.image.src"/>
                    </v-avatar>
                  </v-list-item-icon>
                </v-list-item>
                </transition-group>
                </draggable>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: "ControlPanel",
  props:{
    layers: Array,
  },
  components: {
    draggable
  },
  data(){
    return{
      files: [],
      imagesCount: 0,
      drag: false
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
        .then((base64)=>{
          const image = new Image();
          image.src = base64.toString()
          image.onload = () => {
            this.layers.push({
              scale: 1,
              id: this.imagesCount,
              name: 'layer' + this.imagesCount,
              fileName: file.name,
              image: image,
              isVisible: true
            })
            this.imagesCount++
          }

        })
      })
    },
    revertVisibility(item){
      item.isVisible = ! item.isVisible
    }
  },
  computed:{
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
  },
  watch:{
    activeItem(){
      this.$emit('refreshActive', this.activeItem)
    },
    layers:{
      deep: true,
      handler(){
        this.$emit('refreshLayers', this.layers)
      }
    }
  }
}
</script>

<style scoped>
.ghost {
  background: #eeeeee;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}

.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.v-list.v-sheet.theme--light.v-list--dense.v-list--nav {
  padding: 0;
}
.v-expansion-panel {
  border-right: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
}
.v-expansion-panel-header.v-expansion-panel-header--active, .v-expansion-panel-header {
  padding: 0 10px 0 0;
}
.v-list--nav .v-list-item, .v-list--nav .v-list-item::before {
  border-radius: 0px;
}
.v-navigation-drawer.v-navigation-drawer--absolute.v-navigation-drawer--mini-variant.v-navigation-drawer--open.v-navigation-drawer--open-on-hover.theme--light {
  width: 45px !important;
}
.v-expansion-panel::before {
  box-shadow: none;
}
/deep/.v-expansion-panel-content__wrap {
  padding: 0 ;
}
.v-list-item__title {
  font-family: 'Roboto',sans-serif;
}
.v-list.v-sheet.theme--light {
  padding: 0;
}
.v-expansion-panel-header.v-expansion-panel-header--active {
  border-bottom: 1px solid #eee;
}
.addPicture {
  text-align: center;
  margin: 10px 0;
  font-size: 16px;
}

</style>