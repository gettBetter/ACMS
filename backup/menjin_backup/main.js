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
window.addEventListener('storage', function (event) {
  if (event.key == 'getSessionStorage') {
    // 已存在的标签页会收到这个事件
    console.info('bbb')
    localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
    localStorage.removeItem('sessionStorage');

  } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
    // 新开启的标签页会收到这个事件
    console.info('ccc')
    var data = JSON.parse(event.newValue);

    for (let key in data) {
      sessionStorage.setItem(key, data[key]);
    }
  }
});

if (!sessionStorage.length) {
  localStorage.setItem('getSessionStorage', Date.now());
  console.info('aaa')
} else {

}
console.info('end')
router.beforeEach((to, from, next) => {
  console.info('start')

  const token = sessionStorage.userToken
  const userMenus = sessionStorage.userMenus
  console.info('token', token)
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
  template: '<App/>',
  // beforeCreate() {
  //   console.info('beforeCreate')
  // }
})
