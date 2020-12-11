<template>
    <v-card min-height="650">
      <div ref="drawingArea">
        <v-stage @dragstart="handleDragstart"
                 @dragend="handleDragend"
                 @mousedown="handleStageMouseDown"
                 @touchstart="handleStageMouseDown"
                 ref="stage" :config="configKonva">
          <v-layer ref="layer">
            <v-image ref="backgroundImage" :config="configBackgroundImage"/>
            <v-image @mouseover="grabCursor()"
                     @mouseout="defaultCursor()"
                     @contextmenu="show"
                     v-for="item in layers" :key="item.id"
                     :config="layerConfig(item)"/>
          <v-transformer :config="transformerConfig" ref="transformer" />
          </v-layer>
        </v-stage>
        <v-menu
            v-model="showMenu"
            :position-x="x"
            :position-y="y"
            absolute
            offset-y
        >
          <v-list class="py-0">
            <v-list-item @click="deleteLayer" :ripple="true">
                <v-list-item-title>Удалить</v-list-item-title>
                <v-list-item-icon>
                  <v-icon size="18">far fa-trash-alt</v-icon>
                </v-list-item-icon>
            </v-list-item>
          </v-list>
        </v-menu>
        <ControlPanel :layers="layers" @refreshLayers="layers=$event"/>
      </div>
    </v-card>
</template>

<script>
import ControlPanel from "@/components/Constructor/ControlPanel";
export default {
  name: "Side",
  props:{
    image: String
  },
  components: {
    ControlPanel
  },
  data(){
    return {
      showMenu: false,
      x: 0,
      y: 0,
      selectedShapeName: '',
      configKonva: {
        width: 0,
        height: 0
      },
      backgroundImage: new Image(),
      backgroundPosition: 0,
      center: 0,
      layers: [],
      list: [],
      transformerConfig: {
        anchorStroke: 'black',
        anchorFill: 'white',
        anchorSize: 10,
        borderStroke: 'black',
        borderDash: [4, 4],
      }
    }
  },
  methods: {
    show (e) {
      e.evt.preventDefault()
      this.showMenu = false
      this.x = e.evt.clientX
      this.y = e.evt.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    layerConfig(item){
        let aspectRatio = item.image.width / item.image.height
        return {
          id: item.id,
          x: 300,
          y: 350,
          width: 170 * aspectRatio,
          name: item.name,
          height: 170,
          image: item.image,
          draggable: true,
          visible: item.isVisible,
        }
    },
    grabCursor(){
      document.body.style.cursor = 'grab'
    },
    defaultCursor(){
      document.body.style.cursor = 'default'
    },
    deleteLayer(){
      const item = this.layers.find(i => i.name === this.selectedShapeName);
      if (item){
        const index = this.layers.indexOf(item);
        if (index > -1) {
          this.layers.splice(index, 1);
          this.selectedShapeName =''
          this.updateTransformer()
        }
      }
    },
    getImage(layer){
      const image = new Image();
      image.src = layer.image
      image.onload = () => {
        return image
      };
    },
    handleDragstart(e) {
      document.body.style.cursor = 'grabbing'
      this.selectedShapeName = e.target.name();
      const item = this.layers.find(i => i.name === this.selectedShapeName);
      const index = this.layers.indexOf(item);
      this.layers.splice(index, 1);
      this.layers.push(item);
    },
    handleDragend() {
      document.body.style.cursor = 'grab'
    },
    handleTransformEnd(e) {
      const layer = this.layers.find(
          (r) => r.name === this.selectedShapeName
      );
      layer.x = e.target.x();
      layer.y = e.target.y();
      layer.rotation = e.target.rotation();
      layer.scaleX = e.target.scaleX();
      layer.scaleY = e.target.scaleY();
    },
    handleStageMouseDown(e) {
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = '';
        this.updateTransformer();
        return;
      }
      const clickedOnTransformer =
          e.target.getParent().className === 'Transformer';
      if (clickedOnTransformer) {
        return;
      }
      const name = e.target.name();
      const layer = this.layers.find((l) => l.name === name);
      if (layer) {
        this.selectedShapeName = name;
      }
      else {
        this.selectedShapeName = '';
      }
      this.updateTransformer();
    },
    updateTransformer() {
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();
      const { selectedShapeName } = this;
      const selectedNode = stage.findOne('.' + selectedShapeName);
      if (selectedNode === transformerNode.node()) {
        return;
      }
      if (selectedNode) {
        transformerNode.nodes([selectedNode]);
      }
      else {
        transformerNode.nodes([]);
      }
      transformerNode.getLayer().batchDraw();
    },
  },
  computed:{
    configBackgroundImage(){
      return {
        x: 0,
        shadowColor: 'black',
        shadowBlur: 15,
        shadowOpacity: 0.2,
        image: this.backgroundImage,
      }
    }
  },
  mounted() {
    this.configKonva.width = this.$refs.drawingArea.offsetWidth
    this.configKonva.height = 700
    this.center = this.configKonva.width/2
    const image = new Image();
    image.src = this.image
    image.onload = () => {
      this.backgroundImage = image;
      this.$refs.backgroundImage.getNode().x(this.center - image.width/2)
    };
  },
}
</script>

<style scoped>
/deep/path {
  fill: rgba(0, 0, 0, 0.54) !important;
}
.v-list-item__title {
  font-size: 15px !important;
  font-weight: 400 !important;
}
.purchase{
  font-weight: 500 !important;
}
/deep/.background > .v-image__image.v-image__image--cover {
  filter: drop-shadow(0px 5px 5px #00000024);
}
.v-navigation-drawer.v-navigation-drawer--absolute.v-navigation-drawer--mini-variant.v-navigation-drawer--open.v-navigation-drawer--open-on-hover.theme--light {
  box-shadow: 5px 0 5px 0 rgba(235, 235, 235, 0.75);
}
.v-navigation-drawer.v-navigation-drawer--absolute.v-navigation-drawer--open.theme--light {
  box-shadow: 5px 0 5px 0 rgba(235, 235, 235, 0.75);
}
.v-card.v-sheet.theme--light {
  background: #fbfbfb;
  background-image: linear-gradient(rgba(229, 229, 229, 0.7) .1em, transparent .1em), linear-gradient(90deg, rgba(229, 229, 229, 0.7) .1em, transparent .1em);
  background-size: 2.5em 2.5em;
}

</style>