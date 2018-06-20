import Vue from "vue";
import Router from "vue-router";

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
      name: "404",
      component: () =>
        import ("@/components/notfound")
    },
    {
      path: "/unauthority",
      name: "unauthority",
      component: () =>
        import ("@/components/Unauthorized")
    },
    {
      path: "/",
      name: "index",
      redirect: '/admin'
    },
    {
      path: "/personal",
      name: "personal",
      redirect: '/personal/setting',
      component: () =>
        import ("@/components/personal"),
      children: [{
        path: "/personal/setting",
        component: () =>
          import ("@/components/pages/personal/setting"),
      }]
    },
    {
      path: "/admin",
      name: "admin",
      redirect: '/admin/user',
      component: () =>
        import ("@/components/admin"),
      children: [{
          path: "/admin/user",
          component: () =>
            import ("@/components/pages/admin/user")
        },
        {
          path: "/admin/dep",
          component: () =>
            import ("@/components/pages/admin/dep")
        },
        {
          path: "/admin/role",
          component: () =>
            import ("@/components/pages/admin/role")
        },
        {
          path: "/admin/menu",
          component: () =>
            import ("@/components/pages/admin/menu")
        },
        {
          path: "/admin/userinfo/:userId",
          name: "userinfo",
          component: () =>
            import ("@/components/panel/userinfo")
        },
        {
          path: "/admin/adduser/",
          name: "adduser",
          component: () =>
            import ("@/components/panel/adduser")
        }
      ]
    }
  ]
});
