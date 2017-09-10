import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import 'bulma/css/bulma.css'
import VeeValidate from 'vee-validate';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VeeValidate);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  VeeValidate
  
}).$mount('#app')
