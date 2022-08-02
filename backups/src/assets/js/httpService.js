import Vue from 'vue'
import axios from 'axios'
// http://www.axios-js.com/zh-cn/docs/

let $http = {}

let config = {
  baseURL: 'http://www.api.me',
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  timeout: 5000,
  withCredentials: false, // 表明跨跨域请求书否需要证明
  responseType: 'json', // 'arraybuffer','blob','document','json','text',stream'
  responseEncoding: 'utf8'
}

const errorHandle = function (error) {
  const status = error.response.status
  switch (status) {
    case 401 : // 未登录状态，跳转登录页
      // 跳转登录
      break
    case 403: // 403 token过期
      Vue.layer.alert('登录已过期，请重新登录!', {icon: 2}, function (i) {
        Vue.layer.close(i)
        Vue.$router.forward('/login')
      })
      break
    case 404: // 404请求不存在
      break
    default:
      if (error.response) {
        // 发出了请求，服务器返回了状态码
        // 超出2xx的范围
        // console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // 已发出请求，但未收到响应
        // `error.request`是浏览器中XMLHttpRequest的实例，也是
        // node.js中的http.ClientRequest
        console.log(error.request)
      } else {
        // 设置触发错误的请求时发生了什么
        console.log('Error', error.message)
      }
      console.log(error.config)
  }
}

const instance = axios.create(config)

// 在请求或响应被 then 或 catch 处理前拦截它们。
instance.interceptors.request.use(function (config) {
// 在发送请求之前做些什么
  const token = new Date().getTime()
  token && (config.headers['X-CustomToken'] = token) // 自定义token
  token && (config.headers['Authorization'] = token)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

$http.get = function (url, params) {
  return new Promise((resolve, reject) => {
    instance.get(url, {params: params}).then(response => {
      if (response.status === 200) {
        resolve(response.data)
      } else {
        errorHandle(response)
        reject(response)
      }
    }).catch(error => {
      errorHandle(error)
    })
  })
}

export default $http
