import Velocity from "velocity-animate";
export default {
    state:{
        products: [],
        filters: [],
        wishlist: [],
        basket: [],
        productsCount: 0,
        viewedCount: 0,
        productRefs: []
    },
    mutations:{
        shuffleProducts(state, payload) {
            state.products = payload
        },
        INCREMENT_VIEWED_COUNT(state){
            state.viewedCount++
        },
        SET_PRODUCTS_COUNT(state, payload){
            state.productsCount = payload
        },
        ADD_PRODUCT(state, payload){
            state.products.push(payload)
        },
        SET_FILTER(state, payload){
            state.filters = payload
        },
        async CLEAR_LIST(state){
            state.products = []
            state.productRefs = []
            state.viewedCount = 0
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
        ADD_PRODUCTS_REF(state, payload){
            state.productRefs.push(payload)
        },
        SET_BASKET(state, payload){
            state.basket = payload
        }
    },
    actions: {
        async LOAD_BASKET({commit, dispatch}){
            commit('SET_PROCESSING', true)
            await dispatch('GET_ID_TOKEN').then(async token => {
                let raw = JSON.stringify({
                    jwt: token,
                })
                let url = 'http://localhost/user/getBasket.php'
                let requestOptions = {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: raw,
                }
                await fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result.status.toString() === 'OK'){
                            commit('SET_BASKET', result.data)
                        }
                        if (result.status.toString() === 'ERROR'){
                            commit('SET_ERROR', result.message)
                        }
                    })
                    .catch(error =>  commit('SET_ERROR', error))
                    .finally(() => commit('SET_PROCESSING', false))
            })
        },
        ADD_TO_BASKET({commit, getters}, payload) {
            commit('SET_PROCESSING', true)
            let raw = JSON.stringify({
                productId: payload,
                uid: getters.user.uid,
            })
            let url = 'http://localhost/user/fillBasket.php'
            let requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: raw,
            }
             fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status.toString() === 'ok'){
                       console.log("успех")
                    }
                    if (result.status.toString() === 'error'){
                        commit('SET_ERROR', result.message)
                    }
                })
                .catch(error =>  commit('SET_ERROR', error))
                .finally(() => commit('SET_PROCESSING', false))
        },
        ADD_PRODUCTS_REF({commit}, payload){
            commit('ADD_PRODUCTS_REF', payload)
        },
        async HIDE_PRODUCTS({getters}){
            let promise = new Promise((resolve) => {
                for (const product of getters.productRefs){
                    Velocity(product, {translateY: ['120px', '0px'], opacity: [0, 1] }, {duration: 300})
                }
                setTimeout(()=>{
                    resolve()
                }, 700)
            });
            await promise;
        },
       async GET_FILTERS({commit}, payload){
           commit('SET_PROCESSING', true)
           let raw = JSON.stringify({
               categoryURL: payload.categoryURL,
           })
           let url = 'http://localhost/product/getFilters.php'
           let requestOptions = {
               method: 'POST',
               mode: 'cors',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: raw,
           }
           await fetch(url, requestOptions)
               .then(response => response.json())
               .then(result => {
                   if (result.status.toString() === 'ok'){
                     commit('SET_FILTER', result.data.filters)
                   }
                   if (result.status.toString() === 'error'){
                       commit('SET_ERROR', result.message)
                   }
               })
               .catch(error =>  commit('SET_ERROR', error))
               .finally(() => commit('SET_PROCESSING', false))
        },
        CLEAR_LIST({commit, dispatch}) {
             return new Promise(resolve => {
                 dispatch('HIDE_PRODUCTS')
                     .then(()=> commit('CLEAR_LIST'))
                     .then(()=> resolve()
                 )
             })

        },
        async GET_PRODUCTS({commit, getters}, payload){
            commit('SET_PROCESSING', true)
            let raw = JSON.stringify({
                categoryURL: payload.categoryURL,
                filter: payload.filter,
                startAfter: getters.viewedCount,
                count: getters.viewedCount === 0 ? 6 : 3
            })
            let url = 'http://localhost/product/getProducts.php'
            let requestOptions = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: raw,
            }
            await fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result.status.toString() === 'ok'){
                        commit('SET_PRODUCTS_COUNT', result.data.count)
                        result.data.products.forEach((product) => {
                            commit('ADD_PRODUCT', product)
                            commit('INCREMENT_VIEWED_COUNT')
                        })
                    }
                    if (result.status.toString() === 'error'){
                        commit('SET_ERROR', result.message)
                    }
                })
                .catch(error =>  commit('SET_ERROR', error))
                .finally(() => commit('SET_PROCESSING', false))
            // FIREBASE
            /*  commit('SET_PROCESSING', true)
                let params = []
                let priceRequest = false
                payload.tags !== undefined && payload.tags.length !== 0 ?  params = ["tags", "array-contains-any", payload.tags] :
                payload.price !== undefined && payload.price.length !== 0  ?  (params = ["totalPrice", ">=", parseInt(payload.price[0])],  priceRequest = true):
                params = ['url', '!=', null]
                console.log(params)
                let query =  Vue.prototype.$db
                .collection(payload.category)
                .where(...params)
                .orderBy("url", "asc")
                .startAfter(state.lastProduct | 0)
                .limit(state.lastProduct ? 3 : 6)
                 priceRequest ? query.where("totalPrice", "<=", parseInt(payload.price[1])) : undefined
                query.get()
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
                })*/
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
        basket: state =>{
            return state.basket
        },
        productRefs: state => {
            return state.productRefs
        },
        viewedCount: state => {
            return state.viewedCount
        },
        productsCount: state => {
            return state.productsCount
        },
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