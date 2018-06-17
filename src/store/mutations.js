export default {
  getChildren(state, path) {
    const indexSate = state.menus.filter(
      v => v.path == path
    )[0]

    if (indexSate && 'children' in indexSate) {
      state.children = indexSate.children
    } else {
      state.children = []
    }
  },
  setMenus(state, menus) {
    // debugger;


    // menus.push({
    //   path: "/",
    //   redirect: "/admin/user"
    // });
    // menus.push({
    //   path: "/index",
    //   redirect: "/admin/user"
    // });
    // const menu = []


    state.menus = menus

    // console.info(state.menus)
  }
}
