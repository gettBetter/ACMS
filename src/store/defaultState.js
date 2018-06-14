export default {
  menus: [{
      index: '/admin',
      name: '管理员权限管理',
      children: [{
          index: '/admin/user',
          name: '用户管理'
        },
        {
          index: '/admin/role',
          name: '角色管理'
        },
        {
          index: '/admin/menu',
          name: '菜单权限'
        },
        {
          index: '/admin/areaaccess',
          name: '区域、门禁管理权限'
        },
        {
          index: '/admin/permissionCopy',
          name: '权限复制功能'
        }
      ]
    },
    {
      index: '/personnel',
      name: '人事管理',
      children: [{
          index: '/personnel/depart',
          name: '部门管理'
        },
        {
          index: '/personnel/personal',
          name: '人员管理'
        },
        {
          index: '/personnel/personalGroup',
          name: '人员分组'
        }
      ]
    },
    {
      index: '/card',
      name: '发卡管理'
    },
    {
      index: '/accesscontrol',
      name: '门禁管理',
      children: [{
          index: '/accesscontrol/device',
          name: '门禁设备管理'
        },
        {
          index: '/accesscontrol/basicSetting',
          name: '门禁基本设置'
        },
        {
          index: '/accesscontrol/permissionSetting',
          name: '权限设置'
        },
        {
          index: '/accesscontrol/eMap',
          name: '电子地图及实事监控'
        },
        {
          index: '/accesscontrol/specialPermission',
          name: '日历特殊开门权限'
        }
      ]
    },
    {
      index: '/querytrack',
      name: '查询跟踪',
      children: [{
          index: '/querytrack/alertReport',
          name: '门禁报警报表'
        },
        {
          index: '/querytrack/recordReport',
          name: '打卡记录报表'
        }
      ]
    }
  ],
  children: [],
}
