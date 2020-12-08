import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ShoppingBag from '../components/Icons/ShoppingBagIcon'
import Arrows from '../components/Icons/ArrowsIcon'
import Download from '../components/Icons/DownloadIcon'
import LayerGroup from '../components/Icons/LayerGroup'

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
            }
        },
    }
});
