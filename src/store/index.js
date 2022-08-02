import Vue from 'vue'
import Vuex from 'vuex'
import cookies from 'vue-cookies'
import { setStorage, getStorage } from '@/assets/js/storage'

Vue.use(Vuex)

const PREFIX = process.env.VUE_APP_PREFIX
const hasLogin = `${PREFIX}hasLogin`

export default new Vuex.Store({
  state: {
    vuex_user: getStorage('vuex_user'), // 用户信息
    vuex_token: getStorage('vuex_token'), // 请求时用的token
    vuex_menu: getStorage('vuex_menu') ? getStorage('vuex_menu') : {
      collapsed: false,
      openKeys: [],
      selectedKeys: [],
      list: []
    }, // 操作菜单开关
    authority: getStorage('authority') // 路由菜单权限
  },
  mutations: {
    $uStore (state, payload) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      const nameArr = payload.name.split('.')
      let saveKey = ''
      const len = nameArr.length
      if (len >= 2) {
        let obj = state[nameArr[0]]
        for (let i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]]
        }
        obj[nameArr[len - 1]] = payload.value
        saveKey = nameArr[0]
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        state[payload.name] = payload.value
        saveKey = payload.name
      }
      // 保存变量到本地，见顶部函数定义
      setStorage(saveKey, state[saveKey])
    },
    /**
     * 用户登录
     * @param state
     * @param data
     * @constructor
     */
    SIGN_IN (state, data) {
      const dataSource = data || ''
      state.vuex_user = dataSource
      cookies.set(hasLogin, 1, 60 * 30)
      setStorage('vuex_user', dataSource)
    },
    /**
     * 退出登录
     * @param state
     * @constructor
     */
    LOGIN_OUT (state) {
      const vuexMenu = {
        collapsed: false,
        openKeys: [],
        selectedKeys: [],
        list: []
      }
      state.vuex_user = ''
      state.authority = {}
      state.vuex_menu = vuexMenu
      setStorage('vuex_user', '')
      setStorage('authority', '')
      setStorage('vuex_menu', vuexMenu)
      cookies.remove(hasLogin)
    }
  },
  actions: {
    /**
     * 异步登录
     * @param commit
     * @param data
     */
    signIn ({ commit }, data) {
      commit('SIGN_IN', data)
    },
    /**
     * 异步退出登录
     * @param commit
     */
    logOut ({ commit }) {
      commit('LOGIN_OUT')
    }
  },
  getters: {
    menuCount: (state) => {
      return state.vuex_menu.list.length
    }
  },
  modules: {}
})
