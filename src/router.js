import Vue from 'vue'
import Router from 'vue-router'
import routerEntry from './routerEntry.js'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes:routerEntry
})
