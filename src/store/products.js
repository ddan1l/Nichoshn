import Vue from 'vue'
export default {
    state:{
        products: [],
        filters: [],
        wishlist: [],
        lastProduct: null
    },
    mutations:{
        shuffleProducts(state, payload) {
            state.products = payload
        },
        ADD_PRODUCT(state, payload){
            state.products.push(payload)
/*            if (state.products.filter(e => e.url === payload.url).length <= 0) {
                state.products.push(payload)
            }*/
        },
        SET_FILTER(state, payload){
            state.filters = payload
        },
        CLEAR_LIST(state){
            state.products = []
        },
        ADD_TO_WISHLIST(state, payload){
            state.wishlist.push(payload)
        },
        REMOVE_FROM_WISHLIST(state, payload){
            for(let i = 0; i < state.wishlist.length; i++){
                if (state.wishlist[i] === payload) {
                    state.wishlist.splice(i, 1);
                }
            }
        },
        SET_LAST(state, payload){
            state.lastProduct = payload
        }
    },
    actions: {
        GET_FILTERS({commit}, payload){
            return new Promise(resolve => {
                Vue.prototype.$db
                    .collection(payload.category)
                    .doc('filter')
                    .get().then((doc) => {
                    commit('SET_FILTER', doc.data())
                    resolve()
                })
                    .catch(error => commit('SET_ERROR', error))
                    .finally(() => commit('SET_PROCESSING', false))
            })
        },
        CLEAR_LIST({commit}) {
            commit('CLEAR_LIST')
        },
        GET_PRODUCTS({commit, state}, payload){
            commit('SET_PROCESSING', true)
            if (payload.tags!==undefined && payload.tags.length!==0){
                Vue.prototype.$db
                    .collection(payload.category)
                    .limit(10)
                    .where("tags", "array-contains-any", payload.tags)
                    //same indexes
                    //.where("totalPrice", ">=", parseInt(payload.price[0]))
                    //.where("totalPrice", "<=", parseInt(payload.price[1]))
                    .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (doc.data().totalPrice >= parseInt(payload.price[0]) && doc.data().totalPrice <= parseInt(payload.price[1])) {
                            if (doc.data().url) {
                                commit('ADD_PRODUCT', doc.data())
                            }
                        }
                    })
                    })
                    .catch(error => commit('SET_ERROR', error))
                    .finally(() => commit('SET_PROCESSING', false))
            }
            else if (payload.price!==undefined && payload.price.length!==0){
                Vue.prototype.$db
                    .collection(payload.category)
                    .where("totalPrice", ">=", parseInt(payload.price[0]))
                    .where("totalPrice", "<=", parseInt(payload.price[1]))
                    .get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        if (doc.data().url){
                            commit('ADD_PRODUCT', doc.data())
                        }
                    })
                   })
                    .catch(error => commit('SET_ERROR', error))
                    .finally(() => commit('SET_PROCESSING', false))
            }
            else{
                if (!state.lastProduct){
                    Vue.prototype.$db
                        .collection(payload.category)
                        .orderBy("url", "asc")
                        .limit(13)
                        .get()
                        .then((querySnapshot) => {
                            commit('SET_LAST', querySnapshot.docs[querySnapshot.docs.length-1])
                            querySnapshot.forEach((doc) => {
                                let data = doc.data()
                                if (data.url){
                                    commit('ADD_PRODUCT', data)
                                }
                            })
                        })
                        .catch(error => commit('SET_ERROR', error))
                        .finally(() => {
                            commit('SET_PROCESSING', false)
                        })
                }
                else {
                    Vue.prototype.$db
                        .collection(payload.category)
                        .orderBy("url", "asc")
                        .startAfter(state.lastProduct)
                        .limit(3)
                        .get()
                        .then((querySnapshot) => {
                            commit('SET_LAST', querySnapshot.docs[querySnapshot.docs.length-1])
                            querySnapshot.forEach((doc) => {
                                let data = doc.data()
                                if (data.url){
                                    commit('ADD_PRODUCT', data)
                                }
                            })
                        })
                        .catch(error => commit('SET_ERROR', error))
                        .finally(() => {
                            commit('SET_PROCESSING', false)
                        })
                }

            }

        },
        FIND_PRODUCT({commit, getters}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            setTimeout(()=>{
                let isExists = false
                for (let product of getters.getClothing){
                    if (product.url === payload.url){
                        isExists = true
                        commit('SET_PRODUCT', product)
                        commit('SET_PROCESSING', false)
                        break
                    }
                }
                if (!isExists){
                    commit('SET_PROCESSING', false)
                    commit('SET_ERROR', 'Продукт не найден')
                }
            }, 100)
        }
    },
    getters:{
        products: state => {
            return state.products
        },
        filters: state => {
            return state.filters
        },

        getWishList: (state)=>{
          return state.wishlist
        },
        getProduct: (state) =>{
            return state.product
        },
        getClothing: (state) =>{
            return state.clothing
        },
        getCategoriesInfo: (state) => {
            return state.categoriesInfo
        },
        getClothingCategories: (state) => {
          let clothingCategories = []
           state.clothing.forEach(article=>{
               clothingCategories.push({
                   category: article.category,
                   categoryURL: article.categoryURL
               })
           })
            clothingCategories = clothingCategories.filter((categoryInfo, index, self) =>
                index === self.findIndex((c) => (
                     c.categoryURL === categoryInfo.categoryURL
                ))
            )
          return clothingCategories
        },
    }
}