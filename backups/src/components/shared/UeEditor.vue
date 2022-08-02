<template>
  <div>
    <!--便用方法<UeEditor :value="value" @UeCallback="UeCallback"></UeEditor>-->
    <script type="text/plain" id="uEditor" disabled=""></script>
  </div>
</template>

<script>
import '@@/ueditor/ueditor.config.js'
import '@@/ueditor/ueditor.all.js'
import '@@/ueditor/ueditor.parse.min.js'

export default {
  name: 'UeEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      editor: null
    }
  },
  destroyed () { // 实例销毁后调用
    this.editor.destroy()
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      // https://www.jianshu.com/p/2c2c54acf1b9
      self.editor = window.UE.getEditor('uEditor', self.config)
      self.editor.addListener('ready', () => {
        self.editor.setContent(self.value)
      })
      // 内容发生变化时回调数据传给父级
      self.editor.addListener('contentChange', () => {
        let data = {
          content: self.editor.getContent(),
          len: self.editor.getPlainTxt().trim().length
        }
        self.$emit('UeCallback', data)
      })
    })
  }
}
</script>

<style scoped>

</style>
