import user from './user'
import article from './article'

const install = (Vue) => {
  Vue.prototype.$api = {
    user, article
  }
}

export default { install }
