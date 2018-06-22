// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import _ from 'lodash'
import axios from 'axios'
import {
  post,
  get
} from '@/utils/axiosConf'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$_ = _;

router.beforeEach((to, from, next) => {
  const token = sessionStorage.userToken
  const userMenus = sessionStorage.userMenus
  const isLogin = store.getters.isLogin
  
  if (to.path === '/login') {
    sessionStorage.clear()
    store.commit('setMenus', [])
    store.commit("isLogin", false);
  }

  if (to.path !== '/login' && to.path !== '/unauthority' && isLogin) {

    const menus = JSON.parse(userMenus)
    store.commit("setMenus", menus);

    let acceptMenus = ["/", "*", "/login", "/unauthority"];

    if (sessionStorage.acceptMenus) {
      acceptMenus = JSON.parse(sessionStorage.acceptMenus)
    } else {
      menus.forEach(item => {
        acceptMenus.push(item.path)
        if (item.chilren) {
          item.chilren.forEach(item =>
            acceptMenus.push(item.path))
        }
      })
      sessionStorage.setItem('acceptMenus', JSON.stringify(acceptMenus))
    }

    let accept = false;
    if (acceptMenus.some(menu => to.path == menu)) {
      accept = true
    } else {
      let pathChunk = to.path.match(/\/\w+/g);
      let parentPath = `${pathChunk[0]}${pathChunk[1]}`

      console.info('parentPath', parentPath)
      if (acceptMenus.some(menu => parentPath == menu)) {
        accept = true
      }
    }

    if (!accept) {
      next({
        path: '/unauthority',
        replace: true
      })
    }
  }

  if (!isLogin && to.fullPath !== '/login') {
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
