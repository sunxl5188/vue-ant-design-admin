export default {
  install (Vue, vm) {
    Vue.prototype.confirms = (options) => {
      const opt = Object.assign({ title: '温馨提示', content: '' }, options)
      console.log(opt)
      vm.$confirm(opt)
    }
  }
}
