// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
import {
  post,
  get
} from '@/utils/axiosConf'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$get = get;
Vue.prototype.$post = post;

router.beforeEach((to, from, next) => {
  const token = sessionStorage.userToken
  const userMenus = sessionStorage.userMenus

  // debugger
  if (to.path === '/login') {
    sessionStorage.clear()
    store.commit('setMenus', [])
  }

  // if (to.path == '/unauthority') {
  //   next()
  // }
  if (to.path !== '/login' && to.path == '/unauthority' && token && userMenus) {
    const menus = JSON.parse(userMenus)
    store.commit("setMenus", menus);

    const acceptMenu = ["/", "*", "/login", "/unauthority"];
    menus.forEach(item => {
      acceptMenu.push(item.path)
      if (item.chilren) {
        item.chilren.forEach(item =>
          acceptMenu.push(item.path))
      }
    })

    if (!acceptMenu.includes(to.path)) {
      next({
        path: 'unauthority',
        replace: true
      })
    }
  }

  if (!token && to.fullPath !== '/login') {
    next({
      path: '/login',
      replace: true
    })
  }

  next()
})
/* eslint-disable no-new */

const app = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
