import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import store from './store'
import publicFun from './public.js'
import $http from './http.js'
import G2 from '@antv/g2'

Vue.config.productionTip = false

Vue.prototype.$http = $http

Vue.use(Antd)
Vue.use(publicFun)
Vue.use(G2)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
