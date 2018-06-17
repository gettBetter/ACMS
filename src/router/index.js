import Vue from 'vue'
import Router from 'vue-router'

// import menuModule from '@/store/menu'
// import indexPage from '@/comments/first'

Vue.use(Router)


// console.info(this)

export default new Router({
  mode: 'history',
  //   scrollBehavior: () => ({
  //     y: 0
  //   }),
  routes: [{
      path: '/login',
      name: "login",
      component: () =>
        import ('@/components/login')
    },
    {
      path: '*',
      component: () =>
        import ('@/components/notfound'),
    }, {
      path: '/',
      name: "index",
      component: () =>
        import ('@/components/pages/second/secondchild')
    }
    // ...generateRoutesFromMenu(menuModule.state.items)
  ]
})

// function generateRoutesFromMenu(menu = [], routes = []) {
//   for (let i = 0, l = menu.length; i < l; i++) {
//     let item = menu[i]
//     if (item.path) {
//       routes.push(item)
//     }
//   }
//   return routes
// }
