<template>
  <div class="error-container">
    <div class="error-content">
      <a-row :gutter="20">
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="pic-error">
            <img
              alt="403"
              class="pic-error-parent"
              src="@/assets/images/403.png"
            />
            <img
              alt="401"
              class="pic-error-child left"
              src="@/assets/images/cloud.png"
            />
            <img
              alt="401"
              class="pic-error-child"
              src="@/assets/images/cloud.png"
            />
            <img
              alt="401"
              class="pic-error-child"
              src="@/assets/images/cloud.png"
            />
          </div>
        </a-col>

        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="bullshit">
            <div class="bullshit-oops">{{ oops }}</div>
            <div class="bullshit-headline">{{ headline }}</div>
            <div class="bullshit-info">{{ info }}</div>
            <div>
              <a-button type="primary" @click="onClearInterval">{{ jumpTime }}s&nbsp;返回上一页</a-button>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error403',
  data () {
    return {
      jumpTime: 5,
      oops: '抱歉!',
      headline: '您没有操作权限...',
      info: '当前帐号没有操作权限,请联系管理员。',
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
