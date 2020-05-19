import Vue from 'vue'
import App from './App.vue'
import './assets/css/main.css'
import VueTailwind from 'vue-tailwind'
import router from './router'
import store from './store'

Vue.use(VueTailwind)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
