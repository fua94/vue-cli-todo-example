import axios from 'axios'

const state = {
    token: localStorage.getItem('access_token') || null,
    loggedUser: localStorage.getItem('user') || null
}

const getters = {
    token: state => state.token,
    loggedUser: state => state.loggedUser,
    loggedIn(state) {
        return state.token !== null
    }
}

const baseUri = './users'

const actions = {
    retrieveToken({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios.post(`${baseUri}/authenticate`, credentials)
          .then(response => {
            if(response.data.status == "error"){
                reject()
            }
            else{
                const token = response.data.token
                localStorage.setItem('access_token', token)
                localStorage.setItem('user',  response.data.user.name)
                commit('retrieveToken', token)
                commit('setLoggedUser', response.data.user.name)
                resolve(response)
            }
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })
    },
    registerUser({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios.post(`${baseUri}/register`, credentials)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
        })
    },
    destroyToken({ commit }) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        commit('destroyToken')
    }
}

const mutations = {
    retrieveToken: (state, token) => state.token = token,
    destroyToken: () => state.token = null,
    setLoggedUser: (state, user) => state.loggedUser = user
}

export default {
    state,
    getters,
    actions,
    mutations
}
