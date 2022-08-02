<template>
  <div class="error-container">
    <div class="error-content">
      <a-row>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <div class="pic-error">
            <img
                alt="404"
                class="pic-error-parent"
                src="@/assets/images/404.png"
            />
            <img
                alt="404"
                class="pic-error-child left"
                src="@/assets/images/cloud.png"
            />
            <img
                alt="404"
                class="pic-error-child"
                src="@/assets/images/cloud.png"
            />
            <img
                alt="404"
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
            <a-space align="center" direction="horizontal" size="large">
              <a-button type="default" @click="onClearInterval">{{ jumpTime }}s 返回上一页</a-button>
              <a-button type="primary" @click="onGoToHome">返回首页</a-button>
            </a-space>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  data () {
    return {
      jumpTime: 5,
      oops: '抱歉!',
      headline: '当前页面不存在...',
      info: '请检查您输入的网址是否正确，或点击下面的按钮返回首页。',
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
    },
    onGoToHome () {
      clearInterval(this.timer)
      this.$vuex('vuex_menu.openKeys', [])
      this.$vuex('vuex_menu.selectedKeys', [])
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
</style>
