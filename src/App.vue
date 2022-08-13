<template>
  <transition
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    mode="out-in"
    appear
  >
    <a-config-provider :locale="locale.zhCN" v-wechat-title="`${$route.meta.title}-后台管理系统`">
      <router-view v-if="!$route.meta.keepAlive"/>
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </a-config-provider>
  </transition>
</template>
<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'

export default {
  name: 'App',
  data () {
    return {
      locale: {
        zhCN: zhCN,
        enUS: enUS
      },
      times: new Date().getTime(),
      updateLogin: ''
    }
  },
  created () {
    this.updateLogin = _.debounce(() => {
      let expireTime = +this.$getStorage('expireTime')
      if (expireTime === '') {
        expireTime = new Date().getTime()
        this.$setStorage('expireTime', expireTime)
      }
      // 间隔10分钟更新一次
      if (new Date().getTime() - expireTime > 1000 * 60 * 10) {
        this.$cookies.set(this.$prefix + 'hasLogin', 1, 60 * 30)
        this.$setStorage('expireTime', new Date().getTime())
        console.log('%c更新登录过期时间', 'border-radius:3px;background-color: #000000;color: #fff;padding:3px 6px;')
      }
    }, 500)
  },
  mounted () {
    document.addEventListener('mousemove', this.updateLogin)
    document.addEventListener('click', this.updateLogin)
    const arrays = [
      { name: 'aaa', id: 1 },
      { name: 'ssss', id: 2 },
      { name: 'bbb', id: 3 },
      { name: 'ccc', id: 1 },
      { name: 'ascb', id: 1 }
    ]

    // 为数组中的每一个元素依次执行回调函数， 如果这个数组为空运行会报错
    const sum = arrays.reduce(function (prev, cur, index, arr) {
      if (arr.findIndex(o => o.id === cur.id) === index) {
        prev.push(cur)
      }
      return prev
    }, [])
    console.log(sum)
  },
  methods: {
  },
  watch: { }
}
</script>
<style lang="less">
</style>
