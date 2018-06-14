export default {
  mode: 'history',
  routes: [{
      path: '/',
      component: () =>
        import ('@/components/admin'),
    },
    {
      path: '/admin',
      redirect: '/admin/user',
      component: () =>
        import ('@/components/admin'),
      children: [{
          path: '/admin/user',
          component: () =>
            import ('@/pages/admin/user')
        },
        {
          path: '/admin/role',
          component: () =>
            import ('@/pages/admin/role')
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
      ]
    },
    {
      path: '/personnel',
      redirect: '/personnel/depart',
      component: () =>
        import ('@/components/personnel'),
      children: [{
          path: '/personnel/depart',
          component: () =>
            import ('@/pages/personnel/depart'),
        },
        {
          path: '/personnel/personal',
          component: () =>
            import ('@/pages/personnel/personal'),
        },
        {
          path: '/personnel/personalGroup',
          component: () =>
            import ('@/pages/personnel/personalGroup'),
        }
      ]
    },
    {
      path: '/card',
      component: () =>
        import ('@/components/card'),
      // children: [{
      //   path: '/card/card',
      //   component: () =>
      //     import ('@/pages/card/card.vue')
      // }
      // ]
    },
    {
      path: '/accesscontrol',
      redirect: '/accesscontrol/device',
      component: () =>
        import ('@/components/accesscontrol'),
      children: [{
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
        }
      ]
    },
    {
      path: '/querytrack',
      redirect: '/querytrack/alertReport',
      component: () =>
        import ('@/components/querytrack'),
      children: [{
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
  ]
}
