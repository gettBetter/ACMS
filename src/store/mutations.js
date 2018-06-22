export default {
  isLogin(state, bool) {
    state.isLogin = bool;
  },
  getChildren(state, path) {

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
  }
}
