import Vue from 'vue'
import App from './App.vue'
import { router } from './components/router'
import { store } from './store'
import VueResource from 'vue-resource'

Vue.config.productionTip = false

Vue.use(VueResource)

new Vue({
  router: router,
  store,
  render: h => h(App),
}).$mount('#app')
