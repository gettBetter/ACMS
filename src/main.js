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

// import MenuUtils from '@/utils/MenuUtils'

// import tool from "@/utils/tool";

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$get = get;
Vue.prototype.$post = post;


const token = sessionStorage.userToken
const userMenus = sessionStorage.userMenus

// const avilableMenus = [];

// function getMenus(data, getData) {
//   data.forEach(item => {
//     getData.push(item.path)
//     if (!item.chilren) {
//       getMenus(item.chilren, getData)
//     }
//   })
// }


if (token && userMenus) {

  const menus = JSON.parse(userMenus)

  store.commit("setMenus", menus);

  // getMenus(menus, avilableMenus)
  // console.info(avilableMenus)

}
// else {
//   router.push({
//     path: '/login'
//   })
// }


router.beforeEach((to, from, next) => {
  next()
  // if (to.path === '/login') {
  // sessionStorage.clear()
  // store.commit(ADD_MENU, [])
  // }
  // else 

  // if (!token && to.fullPath !== '/login') {
  //   next({
  //     name: 'login',
  //     replace: true
  //   })
  // } else {
  //   next()
  // }
  // else if (avilableMenus.indexOf(to.fullPath) == -1) {
  //   next({
  //     name: 'login',
  //     replace: true
  //   })
  // } 
  // else {
  //   next()
  // }

  // if(to.)

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
