export default {
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
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
    },
    // ...generateRoutesFromMenu(menuModule.state.items)
  ]
}

// function generateRoutesFromMenu(menu = [], routes = []) {
//   for (let i = 0, l = menu.length; i < l; i++) {
//     let item = menu[i]
//     if (item.path) {
//       routes.push(item)
//     }
//   }
//   return routes
// }
