import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
const instance = axios.create({
  // baseURL: '/blog',
  timeout: 1000 * 20 // 请求超时时间
  // headers: {
  //   'Content-Type': 'application/json;charset=UTF-8;',
  //   'X-Requested-With': 'XMLHttpRequest',
  //   'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT' // 避免 IE10 返回 304
  // }
})

// request拦截器
instance.interceptors.request.use(
  config => {
    // console.log('config', config)
    return config
  },
  error => {
    // Do something with request error
    console.log('11111: ', error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('errsss' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default instance
