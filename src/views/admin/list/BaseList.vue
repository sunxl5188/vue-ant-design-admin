<template>
  <div>
    <Tables
      :dataSource="dataSource"
      :columns="columns"
      :loading="loading"
    >
      <div name="action" slot-scope="{row}">{{row}}</div>
    </Tables>
  </div>
</template>

<script>
import Tables from '../../../components/Tables'

export default {
  name: 'BaseList',
  components: { Tables },
  data () {
    return {
      loading: true,
      dataSource: [
        {
          id: 1,
          name: '测试标题1',
          address: '福建省厦门市安兜社超过宽度将自动省略'
        }, {
          id: 2,
          name: '测试标题2',
          address: '福建省厦门市安兜社超过宽度将自动省略'
        }
      ],
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.id - b.id,
          sortDirections: ['descend', 'ascend']
        },
        {
          title: '联系地址',
          dataIndex: 'address',
          scopedSlots: { customRender: 'ellipsis', ww: '11' },
          width: 200
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' },
          align: 'center'
        }
      ]
    }
  },
  async mounted () {
    await this.$nextTick()
    this.loading = false
  }
}
</script>

<style scoped>

</style>
