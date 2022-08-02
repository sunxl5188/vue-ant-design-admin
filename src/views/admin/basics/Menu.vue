<template>
    <div>Menu
      <a-button type="default" @click="test1">确定</a-button>
    </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      m: '',
      dialogVisible: false
    }
  },
  mounted () {
    this.m = this.test()
  },
  methods: {
    * test () {
      this.dialogVisible = true
      yield (console.log(2))
      yield (console.log(3))
      yield (console.log(4))
      return false
    },
    test1 () {
      this.dialogVisible = false
      const gen = this.m.next()
      if (gen.done) {
        this.m = this.test()
        this.m.next()
      }
    },
    test2 () {
      this.dialogVisible = false
      this.m.next()
    }
  }
}
</script>

<style scoped>

</style>
