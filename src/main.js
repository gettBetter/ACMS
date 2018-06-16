// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from './router'
import store from '@/store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import axios from 'axios'
import {
  post,
  get
}
from '@/utils/axiosConf'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$get = get;
Vue.prototype.$post = post;


const routes = [...store.getters.menus];
console.info(store)
routes.push({
  path: "/login",
  name: "login",
  component: () =>
    import ("@/components/login")
});
routes.push({
  path: "*",
  component: () =>
    import ("@/components/notfound")
});
const router = new Router({
  mode: 'history',
  routes
})

const token = sessionStorage.userToken
router.beforeEach((to, from, next) => {
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
    this.$store.dispatch("getMns");
  },
  mounted() {

  },
  computed: {

  }
})
