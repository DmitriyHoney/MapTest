import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import yamaps from './plugins/yamaps'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  yamaps,
  render: h => h(App)
}).$mount('#app')
