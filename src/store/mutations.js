export default {
  firstLogin(sate, bool) {
    state.firstLogin = bool;
  },
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
  // setDepTree(state, depTree) {
  //   state.depTree = depTree
  // },
  // setUserEditData(state, userEditData) {
  //   state.userEditData = userEditData
  //   state.userInfo = Object.keys(userEditData).length > 0 ? userEditData.user_info[0] : {}
  // },
  // setDepList(state, depList) {
  //   state.depList = depList
  // }
  // delUserList(state, delID) {
  //   debugger;
  //   state.userList = state.userLi.filter(item => id != item.emp_indx)
  // }
}
