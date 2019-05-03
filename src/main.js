import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import store from './store'
import publicFun from './public.js'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(axios)
Vue.use(Antd)
Vue.use(publicFun)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
