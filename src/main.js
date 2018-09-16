// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
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
  const expireDate = localStorage.expire;
  const isExpire = new Date().getDate() != expireDate
  //  
  if (to.path === '/login') {
    localStorage.clear()
    store.commit('setMenus', [])
  } else {
    if (isExpire) {
      next({
        path: '/login',
        replace: true,
        query: {
          redirect: from.path
        } //从哪个页面跳转
      })
    } else {
      const token = JSON.parse(localStorage.userToken)
      const menus = JSON.parse(localStorage.userMenus)
      const homePage = menus[0].path
      // console.info('/', )
      if (to.path === '/') {
        next({
          path: homePage
        })
      }

      if (to.path !== '/unauthority') {

        store.commit("setMenus", menus);

        let acceptMenus = ["/", "*", "/login", "/unauthority", "/test"];

        if (localStorage.acceptMenus) {
          acceptMenus = JSON.parse(localStorage.acceptMenus)
        } else {
          menus.forEach(item => {
            acceptMenus.push(item.path)
            if (item.chilren) {
              item.chilren.forEach(item =>
                acceptMenus.push(item.path))
            }
          })
          localStorage.setItem('acceptMenus', JSON.stringify(acceptMenus))
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
    }
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
