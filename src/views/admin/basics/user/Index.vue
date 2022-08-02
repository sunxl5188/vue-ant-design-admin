<template>
  <div>
    <a-space align="center" direction="horizontal" size="large">
      <router-link to='/basics/user/add'>添加用户</router-link>
      <router-link to='/basics/user/edit'>编辑用户</router-link>
      <router-link to='/basics/user/detail'>查看用户</router-link>
      <router-link to='/basics/user/detail1111'>404</router-link>
      <router-link to='/403'>403</router-link>
      <router-link to='/500'>500</router-link>
    </a-space>

    <div>
      <a-button type="primary" @click="handleSend">发送</a-button>
    </div>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Index',
  directives: {},
  components: {},
  data () {
    return {}
  },
  beforeMount () {
  },
  beforeDestroy () {
    // this.$eventBus.$off('send')
  },
  computed: {},
  mounted () {
  },
  methods: {
    handleSend () {
      console.log('发送中。。。')
      this.$eventBus.$emit('send', '123456')
    }
  },
  watch: {},
  errorCaptured (err, vm, info) {
    console.log(err)
  }
}
</script>

<style scoped>

</style>
