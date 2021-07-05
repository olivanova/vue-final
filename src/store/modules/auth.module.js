import axios from 'axios'
import { errors } from "../../utils/errors";

const TOKEN_KEY = 'jwt-token'

export default {
  namespaced: true,
  state() {
    return {
      token: localStorage.getItem(TOKEN_KEY)
    }
  },

  getters: {
    token(state){
      return state.token
    },
    isAuth(_, getters) {
      return !!getters.token
    }
  },

  actions: {
    async login ({commit, dispatch}, payload) {
      try {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
        const {data} = await axios.post(url, {...payload, returnSecureToken: true})
        commit('setToken', data.idToken)
        commit('clearMessage', null, { root: true})
      } catch (e) {
        const message = errors(e.response.data.error.message)
        console.log(message)
        dispatch('setMessage', {
          value: message,
          type: 'danger'
        }, {root: true})
        throw new Error()
      }
    }
  },

  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem(TOKEN_KEY, token)
    },

    logout(state) {
      state.token = null
      localStorage.removeItem(TOKEN_KEY)
      console.log('state.token', state.token)

    }
  }
}