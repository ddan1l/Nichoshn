import Vue from 'vue'
import firebase from "firebase";
import { uid } from 'uid/secure';
export default{
    state: {
      categories: [],
      colors: [],
      sizes: [],
      components: []
    },
    mutations:{
        SET(state, payload) {
            Object.keys(state).forEach(item => {
                if (item.toString() === payload.key){
                    state[item.toString()] = payload.value
                }
            })
        },
        ADD(state, payload) {
            Object.keys(state).forEach(item => {
                if (item.toString() === payload.key){
                    state[item.toString()].unshift(payload.value)
                }
            })
        },
        UPDATE(state, payload) {
            Object.keys(state).forEach(item => {
                if (item.toString() === payload.key){
                    let index = 0
                    for (const prop of state[item.toString()]){
                        if (payload.value.id === prop.id){
                            break
                        }
                        index++
                    }
                    state[item.toString()][index] = payload.value
                }
            })
        },
        DELETE(state, payload) {
            Object.keys(state).forEach(item => {
                if (item.toString() === payload.key){
                    let index = 0
                    for (const category of state[item.toString()]){
                        if (payload.value === category.id){
                            break
                        }
                        index++
                    }
                    if (index > -1) {
                        state[item.toString()].splice(index, 1);
                    }
                }
            })
        },
    },
    actions: {
        DELETE_IMAGE({commit}, payload) {
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                firebase.storage().refFromURL(payload).delete().then(() => {
                   resolve()
                   commit('SET_PROCESSING', false)
                })
                .catch((error) => {
                   commit('SET_ERROR', error)
                })
                .finally(() => commit('SET_PROCESSING', false))
            })
        },
        SAVE_IMAGES({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                let refs = []
                for (const file of payload){
                    let extension = file.name.split('.').pop()
                    let uName = uid(16) + '.' + extension
                    let renamed = new File([file], uName, {
                        type: file.type,
                        lastModified: file.lastModified,
                    })
                    firebase.storage().ref().child(`images/${uName}`).put(renamed)
                    .then((snapshot) => {
                        snapshot.ref.getDownloadURL().then((downloadURL) => {
                            refs.push({
                                imageURL: downloadURL
                            })
                            if (payload.indexOf(file) === payload.length -1){
                                resolve(refs)
                                commit('SET_PROCESSING', false)
                            }
                        });
                    })
                    .catch(error =>{
                        commit('SET_ERROR', error)
                    })
                }
            })
        },
        SAVE_PRODUCT({commit}, payload){
            commit('SET_PROCESSING', true)
            return new Promise(resolve => {
                Vue.prototype.$db.collection(payload.categoryURL).doc(payload.url).set(payload)
                .then(() => {
                    resolve({
                        message: 'Документ успешно записан'
                    })
                })
                .catch((error) => {
                    commit('SET_ERROR', error)
                })
                .finally(() => commit('SET_PROCESSING', false))
            })
        },

        ADD_FILTER({commit}, payload){
            commit('SET_PROCESSING', true)
            let colors = []
            let components = []
            let sizes = []
            let minPrice = 0
            let maxPrice = 0
            Vue.prototype.$db.collection(payload.category).doc('filter').get()
                .then((doc) => {
                if (doc.exists) {
                    colors = doc.data().colors
                    components = doc.data().components
                    sizes = doc.data().sizes
                    minPrice = doc.data().minPrice
                    maxPrice = doc.data().maxPrice
                    const key = 'id';
                    if (payload.price < minPrice){
                        Vue.prototype.$db.collection(payload.category).doc('filter').set({
                            minPrice: payload.price
                        }, {merge: true}).then()
                    }
                    if (payload.price > maxPrice){
                        Vue.prototype.$db.collection(payload.category).doc('filter').set({
                            maxPrice: payload.price
                        }, {merge: true}).then()
                    }
                    Vue.prototype.$db.collection(payload.category).doc('filter').set({
                        colors: [...new Map(colors.concat(payload.colors).map(item => [item[key], item])).values()]
                    }, {merge: true}).then()
                    Vue.prototype.$db.collection(payload.category).doc('filter').set({
                        components: [...new Map(components.concat(payload.components).map(item => [item[key], item])).values()]
                    }, {merge: true}).then()
                    Vue.prototype.$db.collection(payload.category).doc('filter').set({
                        sizes: [...new Map(sizes.concat(payload.sizes).map(item => [item[key], item])).values()]
                    }, {merge: true}).then()
                }
                else{
                    Vue.prototype.$db.collection(payload.category).doc('filter').set({
                        colors: payload.colors
                    }, {merge: true}).then()
                    Vue.prototype.$db.collection(payload.category).doc('filter').set({
                        components: payload.components
                    }, {merge: true}).then()
                    Vue.prototype.$db.collection(payload.category).doc('filter').set({
                        sizes: payload.sizes
                    }, {merge: true}).then()
                    Vue.prototype.$db.collection(payload.category).doc('filter').set({
                        minPrice: payload.price
                    }, {merge: true}).then()
                    Vue.prototype.$db.collection(payload.category).doc('filter').set({
                        maxPrice: payload.price
                    }, {merge: true}).then()
                }

            })
            .catch((error) => {
             commit('SET_ERROR', error)
            })
            .finally(() =>  commit('SET_PROCESSING', false))
        },
        // eslint-disable-next-line no-unused-vars
        GET_COMPONENTS({commit}){
            commit('SET_PROCESSING', true)
            Vue.prototype.$db.collection("components").get()
            .then((querySnapshot)=>{
                let components = []
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    data.id = doc.id
                    components.push(data)
                })
                commit('SET', {
                    key: 'components',
                    value: components
                })
            })
            .catch(error =>{
                commit('SET_ERROR', error)
            })
            .finally(() =>  commit('SET_PROCESSING', false))
        },
        ADD_COMPONENT({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection("components").add({
                    component: payload.component,
                    url: payload.url,
                })
                    .then((docRef) => {
                        payload.id =  docRef.id
                        commit('ADD', {
                            key: 'components',
                            value: payload
                        })
                        resolve({
                            message: 'Документ записан: ' + docRef.id,
                        })
                    })
                    .catch((error) => {
                        resolve({
                            message: null,
                        })
                        commit('SET_ERROR', error)
                    })
                    .finally(() => {
                        commit('SET_PROCESSING', false)
                    })
            })
        },
        UPDATE_COMPONENT({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection("components").doc(payload.id).set({
                    component: payload.component,
                    url: payload.url,
                })
                    .then(() => {
                        commit('UPDATE', {
                            key: 'components',
                            value: payload
                        })
                        resolve({
                            message: 'Документ обновлен: ' + payload.id
                        })
                    })
                    .catch((error) =>  {
                        resolve({
                            message: null,
                        })
                        commit('SET_ERROR', error)
                    })
                    .finally(() => {
                        commit('SET_PROCESSING', false)
                    })
            })
        },
        DELETE_COMPONENT({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection("components").doc(payload).delete()
                .then(() => {
                    commit('DELETE',  {
                        key: 'components',
                        value: payload
                    })
                    resolve({
                        message: 'Документ успешно удален'
                    })
                })
                .catch((error) => {
                    resolve({
                        message: null,
                    })
                    commit('SET_ERROR', error)
                })
                .finally(() => {
                    commit('SET_PROCESSING', false)
                })
            })

        },

        GET_SIZES({commit}){
            commit('SET_PROCESSING', true)
            Vue.prototype.$db.collection("sizes").get().then((querySnapshot)=>{
                let sizes = []
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    data.id = doc.id
                    sizes.push(data)
                });
                commit('SET', {
                    key: 'sizes',
                    value: sizes
                })
            })
            .catch((error) =>{
                commit('SET_ERROR', error)
            })
            .finally(()=>{
                commit('SET_PROCESSING', false)
            })
        },
        ADD_SIZE({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection("sizes").add({
                    size: payload.size,
                })
                .then((docRef) => {
                    payload.id =  docRef.id
                    commit('ADD', {
                        key: 'sizes',
                        value: payload
                    })
                    resolve({
                        message: 'Документ записан: ' + docRef.id,
                    })
                })
                .catch((error) =>{
                    commit('SET_ERROR', error)
                })
                .finally(()=>{
                    commit('SET_PROCESSING', false)
                })
            })
        },
        UPDATE_SIZE({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection("sizes").doc(payload.id).set({
                    size: payload.size,
                })
                .then(() => {
                    commit('UPDATE', {
                        key: 'sizes',
                        value: payload
                    })
                    resolve({
                        message: 'Документ обновлен: ' + payload.id
                    })
                })
                .catch((error) =>{
                    commit('SET_ERROR', error)
                })
                .finally(()=>{
                    commit('SET_PROCESSING', false)
                })
            })
        },
        DELETE_SIZE({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection("sizes").doc(payload).delete()
                    .then(() => {
                        commit('DELETE',  {
                            key: 'sizes',
                            value: payload
                        })
                        resolve({
                            message: 'Документ успешно удален'
                        })
                    })
                    .catch((error) =>{
                        commit('SET_ERROR', error)
                    })
                    .finally(()=>{
                        commit('SET_PROCESSING', false)
                    })
            })

        },

        GET_COLORS({commit}){
            commit('SET_PROCESSING', true)
            Vue.prototype.$db.collection("colors").get().then((querySnapshot)=>{
                let colors = []
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    data.id = doc.id
                    colors.push(data)
                });
                commit('SET', {
                    key: 'colors',
                    value: colors
                })
            })
            .catch((error) =>{
                commit('SET_ERROR', error)
            })
            .finally(()=>{
                commit('SET_PROCESSING', false)
            })
        },
        ADD_COLOR({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection("colors").add({
                    color: payload.color,
                    url: payload.url,
                    hex: payload.hex,
                })
                .then((docRef) => {
                    payload.id =  docRef.id
                    commit('ADD', {
                        key: 'colors',
                        value: payload
                    })
                    resolve({
                        message: 'Документ записан: ' + docRef.id,
                    })
                })
                .catch((error) =>{
                    commit('SET_ERROR', error)
                })
                .finally(()=>{
                    commit('SET_PROCESSING', false)
                })
            })
        },
        UPDATE_COLOR({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection("colors").doc(payload.id).set({
                    color: payload.color,
                    url: payload.url,
                    hex: payload.hex,
                })
                .then(() => {
                    commit('UPDATE', {
                        key: 'colors',
                        value: payload
                    })
                    resolve({
                        message: 'Документ обновлен: ' + payload.id
                    })
                })
                .catch((error) =>{
                    commit('SET_ERROR', error)
                })
                .finally(()=>{
                    commit('SET_PROCESSING', false)
                })
            })
        },
        DELETE_COLOR({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection("colors").doc(payload).delete()
                .then(() => {
                    commit('DELETE',  {
                        key: 'colors',
                        value: payload
                    })
                    setTimeout(()=>{
                        resolve({
                            message: 'Документ успешно удален'
                        })
                    }, 500)
                })
                .catch((error) =>{
                    commit('SET_ERROR', error)
                })
                .finally(()=>{
                    commit('SET_PROCESSING', false)
                })
            })

        },

        GET_CATEGORIES({commit}){
            commit('SET_PROCESSING', true)
            Vue.prototype.$db.collection("categories").get()
            .then((querySnapshot)=>{
            let categories = []
            querySnapshot.forEach((doc) => {
                let data = doc.data()
                data.id = doc.id
                categories.push(data)
            });
                let payload = {
                    key: 'categories',
                    value: categories
                }
                if (payload){
                    commit('SET', payload)
                }
            })
            .catch((error) =>{
                commit('SET_ERROR', error)
            })
            .finally(()=>{
                commit('SET_PROCESSING', false)
            })
        },
        ADD_CATEGORY({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection(payload.categoryURL).doc('init').set({}).then()
                Vue.prototype.$db.collection("categories").add({
                    category: payload.category,
                    categoryURL: payload.categoryURL,
                    description: payload.description,
                    image: payload.image
                })
                .then((docRef) => {
                    payload.id =  docRef.id
                    commit('ADD', {
                        key: 'categories',
                        value: payload
                    })
                    resolve({
                        message: 'Документ записан: ' + docRef.id,
                    })
                })
                .catch((error) =>{
                    commit('SET_ERROR', error)
                })
                .finally(()=>{
                    commit('SET_PROCESSING', false)
                })
            })
        },
        UPDATE_CATEGORY({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection("categories").doc(payload.id).set({
                    category: payload.category,
                    categoryURL: payload.categoryURL,
                    description: payload.description,
                    image: payload.image
                })
                .then(() => {
                    commit('UPDATE', {
                        key: 'categories',
                        value: payload
                    })
                    resolve({
                        message: 'Документ обновлен: ' + payload.id
                    })
                })
                .catch((error) =>  {
                    resolve({
                        message: null,
                    })
                    commit('SET_ERROR', error)
                })
                .finally(() => {
                    commit('SET_PROCESSING', false)
                })
            })
        },
        DELETE_CATEGORY({commit, dispatch}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection("categories").doc(payload).get()
                    .then(doc => {
                        dispatch('DELETE_IMAGE', doc.data().image).then(()=>{
                            Vue.prototype.$db.collection(doc.data().categoryURL)
                                .get()
                                .then(res => {
                                    if (res!==undefined){
                                        res.forEach(element => {
                                            element.ref.delete().then();
                                        })
                                    }
                                    Vue.prototype.$db.collection("categories").doc(payload).delete()
                                    .then(() => {
                                        commit('DELETE',  {
                                            key: 'categories',
                                            value: payload
                                        })
                                        resolve({
                                            message: 'Категория успешно удалена'
                                        })
                                    })
                                    .catch((error) => {
                                        commit('SET_ERROR', error)
                                    })
                                })
                            .catch((error) =>{
                                commit('SET_ERROR', error)
                            })
                        })
                        .catch((error) =>{
                            commit('SET_ERROR', error)
                        })
                    })
                    .catch((error) =>{
                        commit('SET_ERROR', error)
                    })
                    .finally(()=>{
                        commit('SET_PROCESSING', false)
                    })
                })

        },

        IS_URL_EXISTS({commit}, payload){
          commit('SET_PROCESSING', true)
            return new Promise(resolve => {
                Vue.prototype.$db.collection(payload.category).doc(payload.product).get()
                .then((doc) => {
                    if (doc.exists) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })
                .catch((error) =>{
                    commit('SET_ERROR', error)
                })
                .finally(()=>{
                    commit('SET_PROCESSING', false)
                })
            })

        },
        CHECK_ADMIN({commit}, payload){
            commit('SET_PROCESSING', true)
            return new Promise(resolve => {
                Vue.prototype.$db.collection("users").doc(payload).get()
                .then((doc)=>{
                    if (doc.exists){
                        let data = doc.data();
                        if (data.isAdmin){
                            resolve(true)
                        }
                        else{
                            resolve(false)
                        }
                    }
                })
                .catch((error) =>{
                    commit('SET_ERROR', error)
                })
                .finally(()=>{
                    commit('SET_PROCESSING', false)
                })
            })
        },
    },
    getters:{
        categories: (state) => {
            return state.categories
        },
        colors: (state) => {
            return state.colors
        },
        sizes: (state) => {
            return state.sizes
        },
        components: (state) => {
            return state.components
        }
    }

}
