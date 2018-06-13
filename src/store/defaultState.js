export default {
  menus: [{
      index: 'admin',
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
          index: '/admin/mareaaccess',
          name: '区域、门禁管理权限'
        },
        {
          index: '/admin/mpermissionCopy',
          name: '权限复制功能'
        }
      ]
    },
    {
      index: 'personnel',
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
      index: 'card',
      name: '发卡管理'
    },
    {
      index: 'accesscontrol',
      name: '门禁管理',
      children: [{
          index: 'device',
          name: '门禁设备管理'
        },
        {
          index: 'basicSetting',
          name: '门禁基本设置'
        },
        {
          index: 'permissionSetting',
          name: '权限设置'
        },
        {
          index: 'eMap',
          name: '电子地图及实事监控'
        },
        {
          index: 'specialPermission',
          name: '日历特殊开门权限'
        }
      ]
    },
    {
      index: 'querytrack',
      name: '查询跟踪',
      children: [{
          index: 'alertReport',
          name: '门禁报警报表'
        },
        {
          index: 'recordReport',
          name: '打卡记录报表'
        }
      ]
    }
  ],
  children: [],
}
