import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import './assets/css/bootstrap-reboot.min.css'
import './assets/css/all.css'

Vue.use(VModal)

new Vue({
  el: '#app',
  render: h => h(App)
})
