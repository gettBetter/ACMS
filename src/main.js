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

// 在多个标签页之间共享sessionStorage
const getShareSession = function () {

  if (!sessionStorage.length) {
    // 这个调用能触发目标事件，从而达到共享数据的目的
    localStorage.setItem('getSessionStorage', Date.now());
  };

  // 该事件是核心
  window.addEventListener('storage', function (event) {
    if (event.key == 'getSessionStorage') {
      // 已存在的标签页会收到这个事件
      localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
      localStorage.removeItem('sessionStorage');

    } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
      // 新开启的标签页会收到这个事件
      var data = JSON.parse(event.newValue);

      console.info('data', data, typeof data)
      for (let key in data) {
        sessionStorage.setItem(key, data[key]);
      }
    }
  });
}

router.beforeEach((to, from, next) => {
  debugger
  getShareSession()

  const token = sessionStorage.userToken
  const userMenus = sessionStorage.userMenus
  if (to.path === '/login') {
    sessionStorage.clear()
    store.commit('setMenus', [])
  }

  if (to.path !== '/login' && to.path !== '/unauthority' && token) {

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
