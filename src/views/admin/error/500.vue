<template>
    <div class="error-container text-center">
      <div class="mb-5"><img src="@/assets/images/500.png" alt="500"></div>
      <a-space align="center" direction="horizontal" size="large">
        <a-button type="default" @click="$router.back()">{{jumpTime}}s 返回上一页</a-button>
        <a-button type="primary" @click="$router.push('/')">返回首页</a-button>
      </a-space>
    </div>
</template>

<script>
export default {
  name: 'Error500',
  data () {
    return {
      jumpTime: 5000,
      timer: ''
    }
  },
  activated () {
    this.timeChange()
  },
  deactivated () {
    this.jumpTime = 5
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    timeChange () {
      this.timer = setInterval(() => {
        if (this.jumpTime > 1) {
          this.jumpTime--
        } else {
          this.onClearInterval()
        }
      }, 1000)
    },
    onClearInterval () {
      clearInterval(this.timer)
      this.$nextTick(() => {
        this.$router.back()
      })
    }
  }
}
</script>

<style scoped>

</style>
