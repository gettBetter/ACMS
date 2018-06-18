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
        import ("@/components/login")
    },
    {
      path: "*",
      component: () =>
        import ("@/components/notfound")
    },
    {
      path: "/",
      name: "index",
      redirect: '/second'
    },
    {
      path: "/first",
      name: "first",
      redirect: '/first/firstchild',
      component: () =>
        import ("@/components/first"),
      children: [{
          path: "/first/firstchild",
          component: () =>
            import ("@/components/pages/first/firstchild"),
        },
        {
          path: "/first/secondchild",
          component: () =>
            import ("@/components/pages/first/secondchild"),
        },
        {
          path: "/first/threechild",
          component: () =>
            import ("@/components/pages/first/threechild"),
        }
      ]
    },
    {
      path: "/second",
      name: "second",
      redirect: '/second/firstchild',
      component: () =>
        import ("@/components/second"),
      children: [{
          path: "/second/firstchild",

          component: () =>
            import ("@/components/pages/second/firstchild")
        },
        {
          path: "/second/secondchild",

          component: () =>
            import ("@/components/pages/second/secondchild")
        },
        {
          path: "/second/threechild",

          component: () =>
            import ("@/components/pages/second/threechild")
        }
      ]
    }
  ]
});
