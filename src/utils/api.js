//  http://203.195.236.217:9000/admin/login/Login_chk
const apihost = 'http://203.195.236.217:9000/admin';

const apis = {
  login: 'login/Login_chk'
}
const getApi = (alias, params) => {
  if (params) {
    return `${apihost}/${apis['alias']}?${param}`
  }
  return `${apihost}/${apis['alias']}`
}
export default getApi;
