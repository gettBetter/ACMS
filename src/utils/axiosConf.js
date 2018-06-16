import axios from 'axios';
import qs from 'qs';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';

if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://203.195.236.217:9000/admin';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://203.195.236.217:9000/admin';
}

//http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = sessionStorage.userToken;

    config.data = qs.stringify(config.data);
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    if (token) {
      config.params = {
        'token': qs.parse(token)
      }
    }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


// http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     // if (response.data.errCode == 2) {
//     //   router.push({
//     //     path: "/login",
//     //     querry: {
//     //       redirect: router.currentRoute.fullPath
//     //     } //从哪个页面跳转
//     //   })
//     // }
//     return qs.parse(response);
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

// export function patch(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.patch(url, data)
//       .then(response => {
//         resolve(response.data);
//       }, err => {
//         reject(err)
//       })
//   })
// }

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

// export function put(url, data = {}) {
//   return new Promise((resolve, reject) => {
//     axios.put(url, data)
//       .then(response => {
//         resolve(response.data);
//       }, err => {
//         reject(err)
//       })
//   })
// }
