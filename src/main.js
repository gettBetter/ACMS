// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import appHeader from "@/components/appHeader";
import leftMenu from "@/components/leftMenu";
import appFooter from "@/components/appFooter";

Vue.use(ElementUI);
// Vue.use(store);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  data: {

  },
  mounted() {
    // console.log('123', this.store)
  }
})
