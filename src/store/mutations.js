export default {
  getChildren(state, index) {
    const indexSate = state.menus.filter(
      v => v.index == index
    )[0]

    if (indexSate && 'children' in indexSate) {
      state.children = indexSate.children
    } else {
      state.children = []
    }
  },
  setMenus(state, data) {
    // const menus = data.map(item => {
    //   return {
    //     name: item.name,
    //     path: item.path,
    //     component: () =>
    //       import (item.component),
    //     children: item.children.map(val => {
    //       return {
    //         name: val.name,
    //         path: val.path,
    //         component: () =>
    //           import (val.component)
    //       };
    //     })
    //   };
    // });

    //   menus.push({
    //     path: "/",
    //     redirect: "/admin/user"
    //   });
    //   menus.push({
    //     path: "/index",
    //     redirect: "/admin/user"
    //   });
    const menu = []
    

    state.menus = menus
  }
}
