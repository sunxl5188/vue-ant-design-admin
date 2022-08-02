<template>
    <div>
      角色管理
      <a-button type="primary" @click="handleSend">确定</a-button>
    </div>
</template>

<script>
export default {
  name: 'Role',
  data () {
    return {
    }
  },
  computed: {

  },
  methods: {
    handleSend () {
      console.log('发送中1。。。')
      this.$eventBus.$emit('send', '123456')
    }
  },
  components: { }
}
</script>

<style scoped>

</style>
