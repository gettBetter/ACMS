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
  getMenu(state) {
    // debugger
    // const indexSate = state.menus.filter(
    //   v => v.path == path
    // )[0]

    // if (indexSate && 'chilren' in indexSate) {
    //   state.children = indexSate.chilren
    // } else {
    //   state.children = []
    // }

    
  },
  setMenus(state, menus) {
    state.menus = menus
  },
  setUserList(state, userlist) {
    state.userList = userlist
  },
  setDepTree(state, depTree) {
    state.depTree = depTree
  },
  setUserEditData(state, userEditData) {
    state.userEditData = userEditData
  },
  // delUserList(state, delID) {
  //   debugger;
  //   state.userList = state.userLi.filter(item => id != item.emp_indx)
  // }
}
