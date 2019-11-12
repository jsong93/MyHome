import Vue from 'vue'
import App from './App.vue'
import 'font-awesome/css/font-awesome.min.css'
import router from '@/router/router'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')