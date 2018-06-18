import axios from 'axios'

export default {
  getMns(store) {
    // axios.get('/index/left').then(data => {
    //   console.info('a', data.data)
    //   store.commit('setMns', data.data)
    // })
  },
  getUserList(store) {
    axios.get('/user/listUser').then(data => {
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
  }
}
