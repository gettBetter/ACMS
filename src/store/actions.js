import axios from 'axios'

export default {
  getMns(store) {
    // axios.get('/index/left').then(data => {
    //   console.info('a', data.data)
    //   store.commit('setMns', data.data)
    // })
  },
  getUserList(store) {
    axios.get('/user/user_list').then(data => {
        // console.info('a', data.data)
        // data = JSON.parse(data)
        // debugger
        if (data.data.success == true) {
          // debugger
          console.info(data.data.listuser)
          store.commit('setUserList', data.data.listuser)
        } else {
          alert(data.data.msg)
        }
      },
      data => alert(data.data.msg))
  },
  getDepTree(store) {
    axios.get('/index/dept_tree').then(data => {
        if (data.data.success == true) {
          // debugger
          // console.info(data)
          console.info('deptree', data.data.deptree)
          store.commit('setDepTree', data.data.deptree)
        } else {
          alert(data.data.msg)
        }
      },
      data => alert(data.data.msg))
  }
}
