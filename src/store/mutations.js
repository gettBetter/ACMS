export default {
  getChildren(state, index) {
    state.children = state.menus.filter(
      v => v.index == index
    )[0]["children"];
  }
}
