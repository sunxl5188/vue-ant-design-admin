import http from '../assets/js/http'

const user = {
  /**
   * @获取用户信息
   */
  userInfo (params) {
    return new Promise((resolve, reject) => {
      http.$fetch('/admin/userInfo', params)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  /**
   * @用户登录
   * @param params
   * @returns {Promise<unknown>}
   */
  userLogin (params = {}) {
    return new Promise((resolve, reject) => {
      http.$put('/admin/login', params)
        .then(res => resolve(res))
        .catch(error => reject(error))
    })
  }
}

export default user
