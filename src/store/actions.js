import axios from 'axios'

export default {

  getUserList(store) {
    axios.get('/user/user_list').then(data => {
        if (data.data.success == true) {
          store.commit('setUserList', data.data.listuser)
        } else {
          alert(data.data.msg)
        }
      },
      data => alert('System Error'))
  },
  getDepTree(store) {
    axios.get('/index/dept_tree').then(data => {
        if (data.data.success == true) {
          console.info('deptree', data.data.deptree)
          store.commit('setDepTree', data.data.deptree)
        } else {
          alert(data.data.msg)
        }
      },
      data => alert('System Error'))
  },
  getUserEditData(store, param) {

    axios.get('/user/user_edit_data', {
      params: param
    }).then(data => {
        if (data.data.success == true) {
          store.commit('setUserEditData', data.data)
        } else {
          alert(data.data.msg)
        }
      },
      data => alert('System Error'))
  }
}
