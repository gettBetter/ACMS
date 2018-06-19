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


const token = sessionStorage.userToken
const userMenus = sessionStorage.userMenus


if (token && userMenus) {
  const menus = JSON.parse(userMenus)
  store.commit("setMenus", menus);
}
// const accessMenu = [];

// if (token) {
//   const userMenus = JSON.parse(userMenus);
//   userMenus.forEach(item => {
//     accessMenu.push(item.path)
//     if (item.chilren) {
//       item.chilren.forEach(child => {
//         accessMenu.push(child.path)
//       })
//     }
//   })

//   console.info(accessMenu)
// }



router.beforeEach((to, from, next) => {

  const token = sessionStorage.userToken
  const userMenus = sessionStorage.userMenus
  // debugger
  if (to.path === '/login') {
    sessionStorage.clear()
    store.commit('setMenus', [])
  }

  if (to.path !== '/login' && token && userMenus) {
    const menus = JSON.parse(userMenus)
    store.commit("setMenus", menus);
    // if (!accessMenu.includes(to.path)) {
    //   next({
    //     path: '*',
    //     replace: true
    //   })
    // }
  }
  // debugger
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
  data: {

  },
  beforeMount() {},
  mounted() {},
  computed: {},
  destroyed() {}
})
