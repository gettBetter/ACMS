export default {
  mode: 'history',
  routes: [{
      path: '/',
      component: () =>
        import ('@/pages/admin/user')
    },
    {
      path: '/user',
      component: () =>
        import ('@/pages/admin/user')
    },
    {
      path: '/role',
      component: () =>
        import ('@/pages/admin/role')
    },
    {
      path: '/menu',
      component: () =>
        import ('@/pages/admin/menu')
    },
    {
      path: '/permissionCopy',
      component: () =>
        import ('@/pages/admin/permissionCopy')
    },
    {
      path: '/depart',
      component: () =>
        import ('@/pages/personnel/depart')
    },
    {
      path: '/personal',
      component: () =>
        import ('@/pages/personnel/personal')
    },
    {
      path: '/personalGroup',
      component: () =>
        import ('@/pages/personnel/personalGroup')
    },
    {
      path: '/card',
      component: () =>
        import ('@/pages/card/card')
    },
    {
      path: '/device',
      component: () =>
        import ('@/pages/accesscontrol/device')
    },
    {
      path: '/basicSetting',
      component: () =>
        import ('@/pages/accesscontrol/basicSetting')
    },
    {
      path: '/permissionSetting',
      component: () =>
        import ('@/pages/accesscontrol/permissionSetting')
    },
    {
      path: '/eMap',
      component: () =>
        import ('@/pages/accesscontrol/eMap')
    },
    {
      path: '/specialPermission',
      component: () =>
        import ('@/pages/accesscontrol/specialPermission')
    },
    {
      path: '/alertReport',
      component: () =>
        import ('@/pages/querytrack/alertReport')
    },
    {
      path: '/recordReport',
      component: () =>
        import ('@/pages/querytrack/recordReport')
    }

  ]
}
