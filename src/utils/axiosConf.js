import axios from 'axios';
import qs from 'qs';
import router from '@/router'
// axios.defaults.timeout = 5000;
axios.defaults.baseURL = '';
// axios.defaults.withCredentials = true 

if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'http://203.195.236.217:9000/admin';
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://203.195.236.217:9000/admin';
}

//http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const token = localStorage.userToken;
    if (token) {
      const param = JSON.parse(token);
      config.url += '/token/' + param.token + '/username/' + param.username
    }
    config.data = qs.stringify(config.data);

    return config;
  },
  error => {
    return Promise.reject(err);
  }
);


// http response 拦截器
// console.info(router)
axios.interceptors.response.use(
  response => {
    if (!response.data.success) {
      console.info(router.currentRoute)
      localStorage.clear();
      if (router.currentRoute.fullPath != '/login') {
        router.push({
          path: "/login",
          query: {
            redirect: router.currentRoute.fullPath
          } //从哪个页面跳转
        })
      }

    }
    return response;
    // return qs.parse(response);
  },
  error => {
    return Promise.reject(error)
  }
)


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
