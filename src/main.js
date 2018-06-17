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
} from '@/utils/axiosConf'

// import tool from "@/utils/tool";

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$get = get;
Vue.prototype.$post = post;

import login from '@/components/login';

const routes = [];

routes.push({
  path: "/login",
  name: "login",
  component: login
});
// routes.push({
//   path: "*",
//   component: () =>
//     import ("@/components/notfound")
// });

console.info('length', routes)

console.info('outside')


const token = sessionStorage.userToken


const userRoutes = token && JSON.parse(sessionStorage.userRoutes)
// debugger
// if (token && routes.length < 3)
//   // debugger
//   userRoutes.forEach(item => {
//     // debugger
//     routes.push({
//       name: item.name,
//       path: item.path,
//       component: () =>
//         import (item.component),
//       children: item.chilren.map(val => {
//         return {
//           name: val.name,
//           path: val.path,
//           component: () =>
//             import (val.component)
//         };
//       })
//     });
//   });
// console.info('length', routes)
const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // debugger
  console.info(to, from)
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
    console.info('before')



  },
  mounted() {

  },
  computed: {

  },
  destroyed() {
    console.info('123')
    debugger
  }
})
