import firebase from "firebase";
export default{
    state: {
        user: {
            isAuthenticated: false,
            isEmailVerified: false,
            uid: null
        }
    },
    mutations: {
        SET_USER(state, payload){
            state.user.isEmailVerified = firebase.auth().currentUser.emailVerified
            state.user.isAuthenticated = true
            state.user.uid = payload
        },
        UNSET_USER(state){
            state.user = {
                isAuthenticated: false,
                uid: null
            }
        }
    },
    actions: {
        GOOGLE_AUTHENTICATION({commit}){
            commit('SET_PROCESSING', true)
            commit('CLEAR_ERROR')
            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function() {
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
            firebase.auth().signInWithPopup(provider).then(function() {
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
        SIGNOUT(){
            firebase.auth().signOut().then()
        },
        STATE_CHANGED({commit}, payload){
            if (payload){
                commit('SET_USER', payload.uid)
            }
            else {
                commit('UNSET_USER')
            }
        }
    },
    getters:{
        isAuthenticated: (state) => state.user.isAuthenticated
    }
}
