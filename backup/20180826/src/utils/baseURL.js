let baseURL = ''

if (process.env.NODE_ENV == 'development') {
  baseURL = 'http://203.195.236.217:9000/admin';
} else if (process.env.NODE_ENV == 'production') {
  baseURL = 'http://203.195.236.217:9000/admin';
}

export default baseURL
