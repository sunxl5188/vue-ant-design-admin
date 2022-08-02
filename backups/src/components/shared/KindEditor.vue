<template>
  <div>
    <textarea name="content" id="content"></textarea>
  </div>
</template>

<script>
import kindEditor from '@@/kindeditor/kindeditor.config'

export default {
  name: 'KindEditor',
  data () {
    return {
      content: ''
    }
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      kindEditor('#content', {
        afterChange: function () {
          self.content = this.html()
        }
      })
    })
  },
  methods: {},
  components: {},
  watch: {},
  errorCaptured (err, vm, info) {
    console.log(err)
  }
}
</script>

<style scoped>
@import "../../../static/kindeditor/themes/default/default.css";
</style>
