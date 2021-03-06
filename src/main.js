import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import fastclick from 'fastclick'
fastclick.attach(document.body)

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

import 'common/stylus/index.styl'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
