// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'
import IView from 'iview';
import 'iview/dist/styles/iview.css';
import './public/css/css.css'
import store from './store'
import Tokens from './router/tokens' // 用户id

import Picker from './components/modules/picker' // 弹窗选择器

import * as custom from './filters/commin' // 存放过滤器

Vue.use(IView);
Vue.use(Tokens);
Vue.use(Picker);
Vue.use(VueAxios,axios,Vuex);

Vue.config.productionTip = false

Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})

// import global from './Global'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

