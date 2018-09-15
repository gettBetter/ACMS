export default {
  isLogin(state, val) {
    // debugger
    state.isLogin = val;
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
  },
  setMapId(state, mapId) {
    state.mapId = mapId
  },
  changeDevs(state, val) {
    state.changeDev = val
  }
}
