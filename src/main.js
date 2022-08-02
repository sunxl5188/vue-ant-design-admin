import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'
import permission from './assets/js/permission'
import vueTitle from 'vue-wechat-title'
// 引入js *****************************************
import { initI18n } from './assets/js/i18n'
import antd from './assets/js/antd'
import moment from 'moment'
import uploader from 'vue-simple-uploader' // 引入分片上传组件
import vuexStore from './store/vuex.mixin.js' // 引入vuex的简写法文件
import { setStorage, getStorage, remStorage } from './assets/js/storage' // 引入本地存储方法
import api from './api/index'
import utils from './assets/js/utils'
// 引入CSS样式
import 'animate.css'
import './assets/css/main.less'

const i18n = initI18n('CN', 'US')

Vue.use(VueCookies)
Vue.use(permission, router)
Vue.use(vueTitle)
Vue.use(antd)
Vue.use(uploader)
Vue.use(api)

Vue.prototype.$moment = moment
Vue.prototype.$setStorage = setStorage
Vue.prototype.$getStorage = getStorage
Vue.prototype.$remStorage = remStorage
Vue.prototype.$utils = utils
Vue.prototype.$prefix = process.env.VUE_APP_PREFIX
Vue.prototype.$eventBus = new Vue()

Vue.config.productionTip = false
Vue.mixin(vuexStore)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
