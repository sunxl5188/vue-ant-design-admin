<template>
  <a-modal
    :title="title"
    :visible="visible"
    :width="width"
    :maskClosable="maskClosable"
    :footer="null"
    @cancel="handleCancel"
    :bodyStyle="{padding: 0}"
  >
    <div class="p-4">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
    <div class="footer">
      <a-space align="baseline" direction="horizontal" size="middle">
        <a-button type="default" @click.stop="handleCancel">取消</a-button>
        <a-button type="primary" @click.stop="handleOk">确定</a-button>
      </a-space>
    </div>
  </a-modal>
</template>

<script>
export default {
  name: 'Modals',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '温柔提示'
    },
    content: {
      type: String,
      default: ''
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 520
    }
  },
  model: {
    prop: 'visible',
    event: 'change'
  },
  data () {
    return {}
  },
  methods: {
    handleOk () {
      this.$emit('change', false)
      this.$emit('confirm')
    },
    handleCancel () {
      this.$emit('change', false)
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped lang="less">
.footer{
  border-top: 1px solid #e8e8e8;
  text-align: right;
  padding: 10px 16px;
}
</style>
