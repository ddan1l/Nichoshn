import firebase from "firebase";
export default{
    state: {
        user: {
            isAuthenticated: false,
            isEmailVerified: false,
            email: '',
            uid: null,
            isAdmin: false
        },
    },
    mutations: {
        SET_USER(state){
            state.user.isEmailVerified = firebase.auth().currentUser.emailVerified
            state.user.isAuthenticated = true
            state.user.email = firebase.auth().currentUser.email
            state.user.uid =  firebase.auth().currentUser.uid
        },
        UNSET_USER(state){
            state.user = {
                isAuthenticated: false,
                isEmailVerified: false,
                email: '',
                uid: null,
                isAdmin: false
            }
        },
    },
    actions: {
        GET_ID_TOKEN({commit, dispatch}){
            return new Promise(resolve => {
                if (!firebase.auth().currentUser){
                    dispatch('INIT_AUTH').then(()=>{
                        firebase.auth().currentUser.getIdToken(true).then((idToken)=> {
                            resolve(idToken)
                        }).catch((error) => {
                            commit('SET_ERROR', error)
                        });
                    })
                }
                else{
                    dispatch('INIT_AUTH').then(()=>{
                        firebase.auth().currentUser.getIdToken(true).then((idToken)=> {
                            resolve(idToken)
                        }).catch((error) => {
                            commit('SET_ERROR', error)
                        });
                    })
                }

            })
        },
        INIT_AUTH({dispatch}){
            return new Promise((resolve) => {
                firebase.auth().onAuthStateChanged((user) => {
                    dispatch('STATE_CHANGED', user)
                    resolve(user)
                });
            })
        },
        ADD_USER({state, commit}){
            commit('SET_PROCESSING', true)
            let raw = JSON.stringify({
                uid: state.user.uid,
            })
            let url = 'http://localhost/user/addUser.php'
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
                    if (result.status.toString() === 'ERROR'){
                        commit('SET_ERROR', result.message)
                    }
                })
                .catch(error =>  commit('SET_ERROR', error))
                .finally(() => commit('SET_PROCESSING', false))
         },
        GOOGLE_AUTHENTICATION({commit, dispatch}){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function() {
                dispatch('INIT_AUTH').then(()=>{
                    dispatch('ADD_USER')
                })
                commit('SET_PROCESSING', false)
            }).catch(function(error) {
                commit('SET_PROCESSING', false)
                commit('SET_ERROR', error.message)
            });
        },
        FACEBOOK_AUTHENTICATION({commit}){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            let provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(() => {
                firebase.auth().currentUser.sendEmailVerification().then()
                commit('SET_PROCESSING', false)
            }).catch(function(error) {
                commit('SET_PROCESSING', false)
                commit('SET_ERROR', error.message)
            });
        },
        CREATE_USER_WITH_EMAIL_AND_PASSWORD({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(() => {
                     firebase.auth().currentUser.updateProfile({
                         displayName: payload.name,
                     }).then()
                    firebase.auth().currentUser.sendEmailVerification().then()
                     commit('SET_PROCESSING', false)
                })
                .catch(function(error) {
                    commit('SET_PROCESSING', false)
                    commit('SET_ERROR', error.message)
            });
        },
        SIGN_IN_WITH_EMAIL_AND_PASSWORD({commit}, payload){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(() =>{
                    commit('SET_PROCESSING', false)
                })
                .catch(function(error) {
                    commit('SET_PROCESSING', false)
                    commit('SET_ERROR', error.message)
                })
        },
        VERIFY_EMAIL(){
            firebase.auth().currentUser.sendEmailVerification().then()
        },
        SIGNOUT(){
            firebase.auth().signOut().then()
        },
        STATE_CHANGED({commit, dispatch, state}, payload){
            if (payload){
                commit('SET_USER')
                if (state.user.isEmailVerified){
                    dispatch('ADD_USER')
                }
            }
            else {
                commit('UNSET_USER')
            }
        }
    },
    getters:{
        isAdmin: (state) => state.user.isAdmin,
        isEmailVerified: (state) => state.user.isEmailVerified,
        isAuthenticated: (state) => state.user.isAuthenticated,
        userEmail: (state) => state.user.email,
        user: () => firebase.auth().currentUser
    }
}
