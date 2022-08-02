<template>
    <div>操作日志</div>
</template>

<script>
export default {
  name: 'OperateLog',
  mounted () {
    this.$cookies.set('hasLogin', 1)
  }
}
</script>

<style scoped>

</style>
