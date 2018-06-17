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

// import tool from "@/utils/tool";

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$get = get;
Vue.prototype.$post = post;


const token = sessionStorage.userToken
const userMenus = sessionStorage.userMenus

if (token && userMenus) {
  const menus = JSON.parse(userMenus)
  console.info(router, userMenus)
  router.addRoutes(menus);
  store.commit("setMenus", menus);
}


router.beforeEach((to, from, next) => {
  // debugger

  if (!token && to.fullPath !== '/login') {
    next({
      name: 'login',
      replace: true
    })
  } else {
    next()
  }
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
  beforeMount() {
    // 



  },
  mounted() {

  },
  computed: {

  },
  destroyed() {
    // 
    debugger
  }
})
