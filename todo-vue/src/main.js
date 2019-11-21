import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSession from 'vue-session'
<<<<<<< HEAD
import store from './store' //vuex
=======
>>>>>>> 8a1d5e9c9aff00eec3300988fa55ec4a00918318

Vue.config.productionTip = false
Vue.use(VueSession)

new Vue({
  router,
<<<<<<< HEAD
  store, //vuex
=======
>>>>>>> 8a1d5e9c9aff00eec3300988fa55ec4a00918318
  render: h => h(App)
}).$mount('#app')
