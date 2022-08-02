<template>
  <div>addUser</div>
</template>

<script>
export default {
  name: 'AddUser',
  mounted () {
    this.$eventBus.$on('send', (arg) => {
      console.log('接收到', arg)
    })
  },
  methods: {}
}
</script>

<style scoped>

</style>
