import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'my-app',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    phpsessid: '',
  },
  getters: {
    phpsessid: (state) => {
      return state.phpsessid
    },
  },
  mutations: {
    SET_PHPSESSID: (state, newValue) => {
      state.phpsessid = newValue
    },
  },
  actions: {
    setPhpsessid: ({commit, state}, newValue) => {
      commit('SET_PHPSESSID', newValue)
      return state.phpsessid
    },
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})
