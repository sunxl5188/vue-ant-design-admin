<template>
  <a-table
    :tableLayout="tableLayout"
    :rowKey="record=>record.id"
    :bordered="bordered"
    :columns="columns"
    :data-source="dataSource"
    :loading="loading"
    :pagination="pageConfig"
    :showHeader="showHeader"
    :size="size"
    @change="onChange"
  >
    <!--文字超长栏-->
    <div slot="ellipsis" slot-scope="content" class="text-ellipsis">
      {{content}}
    </div>
    <!--操作栏=====================================-->
    <template slot="action" slot-scope="row">
      <a-space align="center" direction="horizontal" size="middle">
        <slot #action :row="row"></slot>
        <a-button type="link" @click="onEditor(row.id)">编辑</a-button>
        <a-popconfirm
          title="您是否确定删除吗?"
          @confirm="onDelete(row.id)"
        >
          <a-button type="link">删除</a-button>
        </a-popconfirm>
      </a-space>
    </template>
  </a-table>
</template>

<script>
export default {
  name: 'Tables',
  props: {
    // 表格元素的 table-layout 属性，设为 fixed 表示内容不会影响列的布局 - | 'auto' | 'fixed'
    tableLayout: {
      type: String,
      default: ''
    },
    // 是否展示外边框和列边框
    bordered: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default () {
        return {
          current: 1,
          pageSize: 15,
          total: 50,
          showQuickJumper: true
        }
      }
    },
    // 表格数据原
    dataSource: {
      type: Array,
      required: true
    },
    // 表格列的配置描述
    columns: {
      type: Array,
      required: true
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true
    },
    // 表格大小 default | middle | small
    size: {
      type: String,
      default: 'default'
    }
  },
  data () {
    return {
      pageConfig: this.pagination
    }
  },
  methods: {
    onChange (e) {
      const { current } = e
      this.pageConfig.current = current
      this.$emit('change', current)
      console.log(e)
    },
    // 编辑跳转
    onEditor (id) {
      this.$emit('editor', id)
    },
    // 确认删除
    onDelete (id) {
      this.$emit('delete', id)
    }
  }
}
</script>

<style scoped>

</style>
