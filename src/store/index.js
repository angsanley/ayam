import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'app-data',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    phpsessid: '',
    isAuthenticated: false,
  },
  getters: {
    phpsessid: (state) => {
      return state.phpsessid
    },
    isAuthenticated: (state) => {
      return state.isAuthenticated
    }
  },
  mutations: {
    SET_PHPSESSID: (state, newValue) => {
      state.phpsessid = newValue
    },
    SET_ISAUTHENTICATED: (state, newValue) => {
      state.isAuthenticated = newValue
    },
  },
  actions: {
    setPhpsessid: ({commit, state}, newValue) => {
      commit('SET_PHPSESSID', newValue)
      return state.phpsessid
    },
    isAuthenticated: ({commit, state}, newValue) => {
      commit('SET_ISAUTHENTICATED', newValue)
      return state.isAuthenticated
    },
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})
