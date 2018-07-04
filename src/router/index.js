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
          name: "dep",
          component: () =>
            import ("@/components/pages/admin/dep")
        },
        {
          path: "/admin/dep/addDep",
          name: "addDep",
          component: () =>
            import ("@/components/pages/admin/addDep")
        },
        {
          path: "/admin/role",
          component: () =>
            import ("@/components/pages/admin/role")
        },
        {
          path: "/admin/role/editRole/:r_id",
          name: "editRole",
          component: () =>
            import ("@/components/pages/admin/editRole")
        },
        {
          path: "/admin/role/addRole",
          name: "addRole",
          component: () =>
            import ("@/components/pages/admin/addRole")
        },
        {
          path: "/admin/menu",
          component: () =>
            import ("@/components/pages/admin/menu")
        },
        {
          path: "/admin/user/userinfo/:userId",
          name: "userinfo",
          component: () =>
            import ("@/components/panel/userinfo")
        },
        {
          path: "/admin/user/adduser/",
          name: "adduser",
          component: () =>
            import ("@/components/panel/adduser")
        }
      ]
    },
    {
      // /devicmanage
      path: "/devicmanage",
      name: "devicmanage",
      redirect: '/devicmanage/devicearea',
      component: () =>
        import ("@/components/devicmanage"),
      children: [{
          path: "/devicmanage/devicearea",
          name: "devicearea",
          component: () =>
            import ("@/components/pages/devicmanage/devicearea")
        },
        {
          path: "/devicmanage/devicearea/editarea/:id",
          name: "editarea",
          component: () =>
            import ("@/components/pages/devicmanage/editarea")
        },
        {
          path: "/devicmanage/devicearea/addarea/",
          name: "addarea",
          component: () =>
            import ("@/components/pages/devicmanage/addarea")
        },
        {
          path: "/devicmanage/deviceinfo",
          name: "deviceinfo",
          component: () =>
            import ("@/components/pages/devicmanage/deviceinfo")
        },
        {
          path: "/devicmanage/devicearea/editdevice/:id",
          name: "editdevice",
          component: () =>
            import ("@/components/pages/devicmanage/editdevice")
        },
        {
          path: "/devicmanage/devicearea/adddevice/",
          name: "adddevice",
          component: () =>
            import ("@/components/pages/devicmanage/adddevice")
        },
        {
          path: "/devicmanage/timerparam",
          name: "timerparam",
          component: () =>
            import ("@/components/pages/devicmanage/timerparam")
        },
        {
          path: "/devicmanage/timerparam/edittimerparam/:id",
          name: "edittimerparam",
          component: () =>
            import ("@/components/pages/devicmanage/edittimerparam")
        },
        {
          path: "/devicmanage/timerparam/addtimerparam",
          name: "addtimerparam",
          component: () =>
            import ("@/components/pages/devicmanage/addtimerparam")
        }
      ]
    }
  ]
});
