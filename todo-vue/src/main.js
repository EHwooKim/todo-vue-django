import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'
import store from './store' //vuex

Vue.config.productionTip = false
Vue.use(VueSession)

new Vue({
  router,
  store, //vuex
  render: h => h(App)
}).$mount('#app')
