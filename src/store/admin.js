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
                        });
                    })
                    .catch(error =>{
                        commit('SET_ERROR', error)
                    })
                }
                setTimeout(()=>{
                    resolve(refs)
                    commit('SET_PROCESSING', false)
                }, 1000)
            })
        },

        GET_COMPONENTS({commit}){
            commit('SET_PROCESSING', true)
            Vue.prototype.$db.collection("components").get().then((querySnapshot)=>{
                let components = []
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    data.id = doc.id
                    components.push(data)
                });
                setTimeout(()=>{
                    commit('SET', {
                        key: 'components',
                        value: components
                    })
                    commit('SET_PROCESSING', false)
                }, 1000)
            })
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
                        setTimeout(()=>{
                            resolve({
                                message: 'Документ записан: ' + docRef.id,
                            })
                        }, 500)
                    })
                    .catch((error) => {
                        setTimeout(()=>{
                            resolve({
                                message: null,
                            })
                        }, 500)
                        commit('SET_ERROR', error)
                    })
                    .finally(() => {
                        setTimeout(()=>{
                            commit('SET_PROCESSING', false)
                        }, 500)
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
                        setTimeout(()=>{
                            commit('UPDATE', {
                                key: 'components',
                                value: payload
                            })
                            resolve({
                                message: 'Документ обновлен: ' + payload.id
                            })
                        }, 500)

                    })
                    .catch((error) =>  {
                        setTimeout(()=>{
                            resolve({
                                message: null,
                            })
                        }, 500)
                        commit('SET_ERROR', error)
                    })
                    .finally(() => {
                        setTimeout(()=>{
                            commit('SET_PROCESSING', false)
                        }, 500)
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
                        setTimeout(()=>{
                            resolve({
                                message: 'Документ успешно удален'
                            })
                        }, 500)
                    })
                    .catch((error) => {
                        setTimeout(()=>{
                            resolve({
                                message: null,
                            })
                        }, 500)
                        commit('SET_ERROR', error)
                    })
                    .finally(() => {
                        setTimeout(()=>{
                            commit('SET_PROCESSING', false)
                        }, 500)
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
                setTimeout(()=>{
                    commit('SET', {
                        key: 'sizes',
                        value: sizes
                    })
                    commit('SET_PROCESSING', false)
                }, 1000)
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
                        setTimeout(()=>{
                            resolve({
                                message: 'Документ записан: ' + docRef.id,
                            })
                        }, 500)
                    })
                    .catch((error) => {
                        setTimeout(()=>{
                            resolve({
                                message: null,
                            })
                        }, 500)
                        commit('SET_ERROR', error)
                    })
                    .finally(() => {
                        setTimeout(()=>{
                            commit('SET_PROCESSING', false)
                        }, 500)
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
                        setTimeout(()=>{
                            commit('UPDATE', {
                                key: 'sizes',
                                value: payload
                            })
                            resolve({
                                message: 'Документ обновлен: ' + payload.id
                            })
                        }, 500)

                    })
                    .catch((error) =>  {
                        setTimeout(()=>{
                            resolve({
                                message: null,
                            })
                        }, 500)
                        commit('SET_ERROR', error)
                    })
                    .finally(() => {
                        setTimeout(()=>{
                            commit('SET_PROCESSING', false)
                        }, 500)
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
                        setTimeout(()=>{
                            resolve({
                                message: 'Документ успешно удален'
                            })
                        }, 500)
                    })
                    .catch((error) => {
                        setTimeout(()=>{
                            resolve({
                                message: null,
                            })
                        }, 500)
                        commit('SET_ERROR', error)
                    })
                    .finally(() => {
                        setTimeout(()=>{
                            commit('SET_PROCESSING', false)
                        }, 500)
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
                setTimeout(()=>{
                    commit('SET', {
                        key: 'colors',
                        value: colors
                    })
                    commit('SET_PROCESSING', false)
                }, 1000)
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
                        setTimeout(()=>{
                            resolve({
                                message: 'Документ записан: ' + docRef.id,
                            })
                        }, 500)
                    })
                    .catch((error) => {
                        setTimeout(()=>{
                            resolve({
                                message: null,
                            })
                        }, 500)
                        commit('SET_ERROR', error)
                    })
                    .finally(() => {
                        setTimeout(()=>{
                            commit('SET_PROCESSING', false)
                        }, 500)
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
                        setTimeout(()=>{
                            commit('UPDATE', {
                                key: 'colors',
                                value: payload
                            })
                            resolve({
                                message: 'Документ обновлен: ' + payload.id
                            })
                        }, 500)

                    })
                    .catch((error) =>  {
                        setTimeout(()=>{
                            resolve({
                                message: null,
                            })
                        }, 500)
                        commit('SET_ERROR', error)
                    })
                    .finally(() => {
                        setTimeout(()=>{
                            commit('SET_PROCESSING', false)
                        }, 500)
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
                    .catch((error) => {
                        setTimeout(()=>{
                            resolve({
                                message: null,
                            })
                        }, 500)
                        commit('SET_ERROR', error)
                    })
                    .finally(() => {
                        setTimeout(()=>{
                            commit('SET_PROCESSING', false)
                        }, 500)
                    })
            })

        },

        GET_CATEGORIES({commit}){
            commit('SET_PROCESSING', true)
            Vue.prototype.$db.collection("categories").get().then((querySnapshot)=>{
                let categories = []
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    data.id = doc.id
                    categories.push(data)
                });
                setTimeout(()=>{
                    let payload = {
                        key: 'categories',
                        value: categories
                    }
                    commit('SET', payload)
                    commit('SET_PROCESSING', false)
                }, 1000)
            })
        },
        ADD_CATEGORY({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection("categories").add({
                    category: payload.category,
                    categoryURL: payload.categoryURL,
                    description: payload.description,
                })
                .then((docRef) => {
                    payload.id =  docRef.id
                    commit('ADD', {
                        key: 'categories',
                        value: payload
                    })
                    setTimeout(()=>{
                        resolve({
                            message: 'Документ записан: ' + docRef.id,
                        })
                    }, 500)
                })
                .catch((error) => {
                    setTimeout(()=>{
                        resolve({
                            message: null,
                        })
                    }, 500)
                    commit('SET_ERROR', error)
                })
                .finally(() => {
                    setTimeout(()=>{
                        commit('SET_PROCESSING', false)
                    }, 500)
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
                })
                .then(() => {
                    setTimeout(()=>{
                        commit('UPDATE', {
                            key: 'categories',
                            value: payload
                        })
                        resolve({
                            message: 'Документ обновлен: ' + payload.id
                        })
                    }, 500)

                })
                .catch((error) =>  {
                    setTimeout(()=>{
                        resolve({
                            message: null,
                        })
                    }, 500)
                    commit('SET_ERROR', error)
                })
                .finally(() => {
                    setTimeout(()=>{
                        commit('SET_PROCESSING', false)
                    }, 500)
                })
            })
        },
        DELETE_CATEGORY({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            return new Promise(resolve => {
                Vue.prototype.$db.collection("categories").doc(payload).delete()
                .then(() => {
                    commit('DELETE',  {
                        key: 'categories',
                        value: payload
                    })
                    setTimeout(()=>{
                        resolve({
                            message: 'Документ успешно удален'
                        })
                    }, 500)
                })
                .catch((error) => {
                    setTimeout(()=>{
                        resolve({
                            message: null,
                        })
                    }, 500)
                    commit('SET_ERROR', error)
                })
                .finally(() => {
                    setTimeout(()=>{
                        commit('SET_PROCESSING', false)
                    }, 500)
                })
            })

        },

        CHECK_ADMIN({commit}, payload){
            commit('SET_PROCESSING', true)
            return new Promise(resolve => {
                Vue.prototype.$db.collection("users").doc(payload).get().then((doc)=>{
                    if (doc.exists){
                        let data = doc.data();
                        if (data.isAdmin){
                            resolve(true)
                        }
                        else{
                            resolve(false)
                        }
                    }
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
