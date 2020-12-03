import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ShoppingBag from '../components/Header/ShoppingBagIcon'


Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        values: {
            shoppingBag: {
                component: ShoppingBag, // you can use string here if component is registered globally
            },
        },
    }
});
