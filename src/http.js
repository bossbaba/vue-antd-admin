import axios from 'axios'
import qs from 'qs'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const $http = axios.create({
  // headers: {'X-Custom-Header': 'foobar'}// 这里不加任何东西
  // baseURL: 'http://192.168.1.10/'
  baseURL: 'http://localhost:3000'
})

$http.interceptors.request.use((config) => {
  config.data = qs.stringify(config.data)
  return config
})

$http.interceptors.response.use((resp) => {
  return resp
})

export default $http
