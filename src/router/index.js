import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    // {
    //   path: "/apitest",
    //   name: "apitest",
    //   component: () =>
    //     import ("@/components/apitest")
    // }, 
    {
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
          path: "/admin/useradmin",
          name: "useradmin",
          component: () =>
            import ("@/components/pages/admin/useradmin")
        },
        {
          path: "/admin/useradmin/edituseradmin/:emp",
          name: "edituseradmin",
          props: true,
          component: () =>
            import ("@/components/pages/admin/edituseradmin")
        },
        {
          path: "/admin/useradmin/adduseradmin",
          name: "adduseradmin",
          props: true,
          component: () =>
            import ("@/components/pages/admin/adduseradmin")
        },
        // assignpermission
        {
          path: "/admin/useradmin/assignpermission/:emp",
          name: "assignpermission",
          props: true,
          component: () =>
            import ("@/components/pages/admin/assignpermission")
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
      children: [
        // 区域管理
        {
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
        },
        //门禁通道
        {
          path: "/devicmanage/devchannel",
          name: "devchannel",
          component: () =>
            import ("@/components/pages/devicmanage/devchannel")
        },
        {
          path: "/devicmanage/timerparam/editdevchannel/:dev/:chn",
          name: "editdevchannel",
          component: () =>
            import ("@/components/pages/devicmanage/editdevchannel")
        },
        {
          path: "/devicmanage/timerparam/adddevchannel/:id",
          name: "adddevchannel",
          component: () =>
            import ("@/components/pages/devicmanage/adddevchannel")
        },
        // 门禁终端参数设置
        {
          path: "/devicmanage/devtermina",
          name: "devtermina",
          component: () =>
            import ("@/components/pages/devicmanage/devtermina")
        },
        {
          path: "/devicmanage/devtermina/editdevtermina/:dev/:trm",
          name: "editdevtermina",
          component: () =>
            import ("@/components/pages/devicmanage/editdevtermina")
        },
        {
          path: "/devicmanage/devtermina/adddevtermina/:id",
          name: "adddevtermina",
          component: () =>
            import ("@/components/pages/devicmanage/adddevtermina")
        },
        // 门禁权限
        {
          path: "/devicmanage/authorlist",
          name: "authorlist",
          props: true,
          component: () =>
            import ("@/components/pages/devicmanage/authorlist")
        },
        {
          path: "/devicmanage/authorlist/addauthorlist",
          name: "addauthorlist",
          props: true,
          component: () =>
            import ("@/components/pages/devicmanage/addauthorlist")
        },
        {
          path: "/devicmanage/authorlist/editauthorlist/:emp/:dev",
          name: "editauthorlist",
          props: true,
          component: () =>
            import ("@/components/pages/devicmanage/editauthorlist")
        },
        // jobauthorlist
        {
          path: "/devicmanage/authorlist/jobauthorlist",
          name: "jobauthorlist",
          props: true,
          component: () =>
            import ("@/components/pages/devicmanage/jobauthorlist")
        },
        // copyauthorlist
        {
          path: "/devicmanage/authorlist/copyauthorlist",
          name: "copyauthorlist",
          props: true,
          component: () =>
            import ("@/components/pages/devicmanage/copyauthorlist")
        }
      ]
    },
    //卡证管理
    {
      path: "/card",
      name: "card",
      redirect: '/card/cardmanage',
      component: () =>
        import ("@/components/card"),
      children: [
        // 卡证日常管理
        {
          path: "/card/cardmanage",
          name: "cardmanage",
          component: () =>
            import ("@/components/pages/card/cardmanage")
        },
        {
          path: "/card/cardmanage/addcard",
          name: "addcard",
          component: () =>
            import ("@/components/pages/card/addcard")
        },
        {
          path: "/card/cardlog",
          name: "cardlog",
          component: () =>
            import ("@/components/pages/card/cardlogs")
        },
        // 操作日志
        // {
        //   path: "/card/cardlog",
        //   name: "cardlog",
        //   component: () =>
        //     import ("@/components/pages/card/cardlog")
        // }
      ]
    }

  ]
});
