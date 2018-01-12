import Vue from 'vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
// import axios from 'axios'
import VueTimeago from 'vue-timeago'
import App from './App'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(Buefy,{
  defaultIconPack: 'mdi'
})
Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'en-US',
  locales: {
    // you will need json-loader in webpack 1
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  VeeValidate,
  Buefy
}).$mount('#app')
