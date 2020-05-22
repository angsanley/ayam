import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import Repositories from "../repositories/RepositoryFactory";

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'app-data',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    phpsessid: '',
    isAuthenticated: false,
    notifications: [],
    dashboardData: ''
  },
  getters: {
    phpsessid: (state) => {
      return state.phpsessid
    },
    isAuthenticated: (state) => {
      return state.isAuthenticated
    },
    getNotifications: (state) => {
      return state.notifications
    },
    getDashboardData: (state) => {
      return state.dashboardData
    }
  },
  mutations: {
    SET_PHPSESSID: (state, newValue) => {
      state.phpsessid = newValue
    },
    SET_ISAUTHENTICATED: (state, newValue) => {
      state.isAuthenticated = newValue
    },
    ADD_NOTIFICATIONS: (state, newValue) => {
      state.notifications.push(newValue)
    },
    SET_DASHBOARD_DATA: (state, newValue) => {
      state.dashboardData = newValue
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
    addNotifications: ({commit, state}, newValue) => {
      commit('ADD_NOTIFICATIONS', newValue)

      // show notification
      Vue.notify({
        group: 'main',
        duration: 20000,
        type: newValue.type,
        title: newValue.title,
        text: newValue.text
      })

      return state.notifications
    },
    fetchDashboardData: async ({commit}) => {
      const StudentRepository = Repositories.get("student");
      const response = await StudentRepository.getProfile();
      commit('SET_DASHBOARD_DATA', response.data);
    },
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})
