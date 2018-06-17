import Vue from "vue";
import Router from "vue-router";
//---
// import menuModule from '@store/menu'
//---
Vue.use(Router);

export default new Router({
  mode: "history",
    scrollBehavior: () => ({
      y: 0
    }),
  routes: [{
      path: "/login",
      name: "login",
      component: () =>
        import ("@/components/login.vue")
    },
    {
      path: "*",
      component: () =>
        import ("@/components/notfound.vue")
    },
    // {
    //   path: "/",
    //   name: "index",
    //   component: () =>
    //     import ("@/components/pages/second/secondchild.vue")
    // }
    // ...generateRoutesFromMenu(menuModule.state.items)
  ]
});


// export default new Router({
//   mode: 'history', // Demo is living in GitHub.io, so required!  
//   // linkActiveClass: 'is-active',
//   scrollBehavior: () => ({
//     y: 0
//   }),
//   routes: [{
//       path: '/login',
//       component: () =>
//         import ("@/components/login.vue"),
//       meta: {
//         expanded: false,
//         show: false
//       },
//       name: 'Login'
//     },
//     {
//       path: '/',
//       component: () =>
//         import ("@/components/notfound.vue"),
//       meta: {
//         expanded: false,
//         show: false
//       }
//     },
//     ...generateRoutesFromMenu(menuModule.state.items)
//   ]
// })


// function generateRoutesFromMenu(menu = [], routes = []) {
//   for (let i = 0, l = menu.length; i < l; i++) {
//     let item = menu[i]
//     if (item.path) {
//       routes.push(item)
//     }
//   }
//   return routes
// }
