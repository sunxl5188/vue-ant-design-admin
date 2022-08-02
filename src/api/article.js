import http from '../assets/js/http'

const article = {
  /**
   * @获取列表~有分页
   * @param params 分页，搜索相关参数
   * @returns {Promise<unknown>}
   */
  getList (params) {
    return new Promise((resolve, reject) => {
      http.$fetch('/index/index/article', params)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  /**
   * @获取详情信息
   * @param id
   * @returns {Promise<unknown>}
   */
  getDetail (id) {
    return new Promise((resolve, reject) => {
      http.$fetch('/admin/article', { id: id })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  add (params) {
    return new Promise((resolve, reject) => {
      http.$post('/admin/article', params)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  edit (params) {
    return new Promise((resolve, reject) => {
      http.$put('/admin/article', params)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },
  del (id) {
    return new Promise((resolve, reject) => {
      http.$del('/admin/article', { id: id })
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}

export default article
