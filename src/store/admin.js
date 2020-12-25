import Vue from 'vue'
export default{
    state: {
      categories: [],
      colors: []
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
                    state[item.toString()].push(payload.value)
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
        }
    }

}
