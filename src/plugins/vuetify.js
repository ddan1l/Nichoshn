import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ShoppingBag from '../components/Icons/ShoppingBagIcon'
import Arrows from '../components/Icons/ArrowsIcon'
import Download from '../components/Icons/DownloadIcon'
import LayerGroup from '../components/Icons/LayerGroup'
import Ruler from '../components/Icons/Ruler'
import Palette from '../components/Icons/Palette'
import Books from '../components/Icons/Books'
import FilePlus from '../components/Icons/FilePlus'
import Components from '../components/Icons/Components'

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        values: {
            shoppingBag: {
                component: ShoppingBag
            },
            arrows:{
                component: Arrows
            },
            download:{
                component: Download
            },
            layerGroup:{
                component: LayerGroup
            },
            ruler:{
                component: Ruler
            },
            palette:{
                component: Palette
            },
            books:{
                component: Books
            },
            filePlus:{
                component: FilePlus
            },
            components:{
                component: Components
            },
        },
    }
});
