export default {
  isLogin(state) {
    return state.isLogin;
  },
  menus(state) {
    return state.menus;
  },
  children(state) {
    return state.children
  },
  // getMenus(state) {
  //   return state.menus
  // },
  userList(state) {
    return state.userList
  },
  depTree(state) {
    return state.depTree
  },
  userEditData(state) {
    return state.userEditData
  },
  userInfo(state) {
    return state.userInfo
  },
  depList(state) {
    return state.depList
  }
}
