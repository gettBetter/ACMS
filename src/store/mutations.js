export default {
  getChildren(state, path) {
    // debugger
    const indexSate = state.menus.filter(
      v => v.path == path
    )[0]

    if (indexSate && 'chilren' in indexSate) {
      state.children = indexSate.chilren
    } else {
      state.children = []
    }
  },
  setMenus(state, menus) {
    state.menus = menus
  },
  setUserList(state, userlist) {
    state.userList = userlist
  }
}
