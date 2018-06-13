export default {
  mode: 'history',
  routes: [{
      path: '/',
      components: {
        default: () =>
          import ('@/pages/admin/user'),
        sideBar: () =>
          import ('@/pages/sideBar/admin')
      }
    },
    {
      path: '/admin',
      components: {
        default: () =>
          import ('@/pages/admin/user'),
        sideBar: () =>
          import ('@/pages/sideBar/admin')
      }
    },
    {
      path: '/admin/user',
      components: {
        default: () =>
          import ('@/pages/admin/user'),
        sideBar: () =>
          import ('@/pages/sideBar/admin')
      }
    },
    {
      path: '/admin/role',
      components: {
        default: () =>
          import ('@/pages/admin/role'),
        sideBar: () =>
          import ('@/pages/sideBar/admin')
      }
    },
    {
      path: '/admin/menu',
      component: () =>
        import ('@/pages/admin/menu')
    },
    {
      path: '/admin/areaaccess',
      component: () =>
        import ('@/pages/admin/areaaccess')
    },
    {
      path: '/admin/permissionCopy',
      component: () =>
        import ('@/pages/admin/permissionCopy')
    },
    {
      path: '/personnel',
      component: () =>
        import ('@/pages/personnel/depart')
    },
    {
      path: '/personnel/depart',
      component: () =>
        import ('@/pages/personnel/depart')
    },
    {
      path: '/personnel/personal',
      component: () =>
        import ('@/pages/personnel/personal')
    },
    {
      path: '/personnel/personalGroup',
      components: {
        default: () =>
          import ('@/pages/personnel/personalGroup'),
        // sideBar: () =>
        //   import ('@/pages/sideBar/personnel')
      }
    },
    {
      path: '/card',
      component: () =>
        import ('@/pages/card/card')
    },
    {
      path: '/accesscontrol',
      component: () =>
        import ('@/pages/accesscontrol/device')
    },
    {
      path: '/accesscontrol/device',
      component: () =>
        import ('@/pages/accesscontrol/device')
    },
    {
      path: '/accesscontrol/basicSetting',
      component: () =>
        import ('@/pages/accesscontrol/basicSetting')
    },
    {
      path: '/accesscontrol/permissionSetting',
      component: () =>
        import ('@/pages/accesscontrol/permissionSetting')
    },
    {
      path: '/accesscontrol/eMap',
      component: () =>
        import ('@/pages/accesscontrol/eMap')
    },
    {
      path: '/accesscontrol/specialPermission',
      component: () =>
        import ('@/pages/accesscontrol/specialPermission')
    },
    {
      path: '/querytrack',
      component: () =>
        import ('@/pages/querytrack/alertReport')
    },
    {
      path: '/querytrack/alertReport',
      component: () =>
        import ('@/pages/querytrack/alertReport')
    },
    {
      path: '/querytrack/recordReport',
      component: () =>
        import ('@/pages/querytrack/recordReport')
    }

  ]
}
