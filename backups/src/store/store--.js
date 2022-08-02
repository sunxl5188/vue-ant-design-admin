import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const domain = document.domain.replace('www.', '')
let Secure = true
if (window.location.protocol === 'http:') {
  Secure = false
}

// state访问状态对象
const state = {
  userData: {},
  toKen: ''
}

// Mutations修改状态

const mutations = {
  // 用户登录
  signIn (state, data) {
    state.userData = data.userData
    state.toKen = data.toKen
    console.log(domain)
    Vue.$cookies.config('50s', '/', domain, Secure, 'Lax')
    Vue.$cookies.set('toKen', data.toKen)
  },
  // 退出登录
  signOut (state) {
    state.userData = ''
    state.toKen = ''
  }
}

// getters计算过滤操作
const getters = {}

// actions异步修改状态
const actions = {
  _signIn (context, data) {
    context.commit('signIn', data)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
