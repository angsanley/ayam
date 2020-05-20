import Vue from 'vue'
import App from './App.vue'
import './assets/css/main.css'
import VueTailwind from 'vue-tailwind'
import router from './router'
import store from './store'
import VueProgressBar from 'vue-progressbar'
import moment from 'moment-timezone';
import VCalendar from 'v-calendar';

moment.tz.setDefault("Asia/Jakarta");

Vue.use(VueTailwind)

Vue.use(VueProgressBar, {
  color: '#0090D1',
  failedColor: 'red',
  height: '2px'
})

Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
