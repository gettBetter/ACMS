export default {
  authorlist: {
    namespaced: true,
    state: {
      userList: []
    },
    getters: {
      getUserList(state, getters, rootState) {
        return state.userList
      }
    },
    mutations: {
      setUserList({
        userList
      }, {
        type,
        user
      }) {
        if (type === "add") {
          userList.push(user)
        } else if (type === "del") {
          let idx = userList.findIndex(item => item.dev_indx == user.dev_indx)
          if (idx != -1) {
            userList.splice(idx, 1)
          }
        } else if (type === "clean") {
          userList = []
        }
      }
    }
  }
}
