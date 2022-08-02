import axios from 'axios'
import router from '../../router'
import store from '../../store'
import { notification } from 'ant-design-vue'

const config = {
  baseURL: '/api',
  // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
  withCredentials: false, // 表明跨域请求是否需要证明
  responseType: 'json', // 'arraybuffer','blob','document','json','text',stream'
  responseEncoding: 'utf8'
}
const AX_IOS = axios.create(config)
/**
 * @在请求或响应被 then 或 catch 处理前拦截它们。
 */
AX_IOS.interceptors.request.use(function (config) {
  if (store.state.vuex_token) {
    config.headers.Authorization = store.state.vuex_token
    config.headers.Token = store.state.vuex_token
  }
  // console.log(config)
  return config
}, (error) => Promise.reject(error))

/**
 * @添加响应拦截器
 */
AX_IOS.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { data } = response
  if (data.status === 401) {
    store.dispatch('logOut')
    router.push({
      path: '/login',
      query: { redirect: router.currentRoute.fullPath }// 从哪个页面跳转
    })
    location.reload()
  }
  return data
}, function (error) {
  // 对响应错误做点什么
  let status = ''
  if (error.request) {
    status = error.request
  } else if (error.response) {
    status = error.response
  }
  if (status) {
    switch (status.status) {
      case 400:
        error.message = '请求错误(400)'
        break
      case 401:
        error.message = '未授权，请重新登录(401)'
        break
      case 403:
        error.message = '拒绝访问(403)'
        break
      case 404:
        error.message = '请求出错(404)'
        break
      case 408:
        error.message = '请求超时(408)'
        break
      case 500:
        error.message = '服务器错误(500)'
        router.push('/500')
        break
      case 501:
        error.message = '服务未实现(501)'
        break
      case 502:
        error.message = '网络错误(502)'
        break
      case 503:
        error.message = '服务不可用(503)'
        break
      case 504:
        error.message = '网络超时(504)'
        break
      case 505:
        error.message = 'HTTP版本不受支持(505)'
        break
      default:
        error.message = `连接出错(${error.response.status})!`
    }
  } else {
    error.message = '连接服务器失败!'
  }
  notification.error({
    message: '错误',
    description: error.message
  })
  return Promise.reject(error)
})

const http = {
  /**
   * @get方法~查询数据
   * @param url
   * @param params
   * @returns {Promise<unknown>}
   */
  $fetch (url, params = {}) {
    return new Promise((resolve, reject) => {
      AX_IOS.get(url, { params: params })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  /**
   * @post方法~添加数据
   * @param url
   * @param params
   * @returns {Promise<unknown>}
   */
  $post (url, params = {}) {
    return new Promise((resolve, reject) => {
      AX_IOS.post(url, params)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  /**
   * @put方法~修改数据:将所有数据都推送到后端
   * @param url
   * @param params
   * @returns {Promise<unknown>}
   */
  $put (url, params = {}) {
    return new Promise((resolve, reject) => {
      AX_IOS.put(url, params)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  /**
   * @patch~修改数据：只将修改的数据推送到后端
   * @param url
   * @param params
   */
  $patch (url, params = {}) {
    return new Promise((resolve, reject) => {
      AX_IOS.patch(url, params)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  /**
   * @delete~用于删除数据
   * @param url
   * @param params
   */
  $del (url, params = {}) {
    return new Promise((resolve, reject) => {
      AX_IOS.delete(url, { data: params })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}

export default http
