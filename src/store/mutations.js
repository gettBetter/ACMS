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
  setMns(state, mns) {
    console.info('mns', mns)
    const menus = [];

    // for (let p in mns) {
    //   console.info(mns[p])
    //   let menu = {
    //     name: p,
    //     children: []
    //   };
    //   for (let prop in mns[p]) {

    //     console.info(mns[p][prop])
    //     let item = mns[p][prop].split(':');
    //     let child = [];

    //     menu.index = item[1].match(/\/\w+/g)[0]
    //     child.push({
    //       index: item[1],
    //       name: item[0]
    //     })
    //   }
    // }

    // state.mns = munus
  }
}
