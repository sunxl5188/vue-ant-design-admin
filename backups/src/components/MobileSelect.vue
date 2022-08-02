<template>
  <div>
    <div id="day">单选</div>
    <div id="trigger2">两列</div>
    <div id="trigger3">地区选择-联动</div>
  </div>
</template>

<script>
import MobileSelect from 'mobile-select'

export default {
  name: 'MobileSelect',
  data () {
    return {}
  },
  mounted () {
    let self = this
    self.$nextTick(() => {
      let m1 = new MobileSelect({
        trigger: '#day',
        title: '单项选择',
        wheels: [
          {data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']}
        ],
        position: [1]
      })
      let m2 = new MobileSelect({
        trigger: '#trigger2',
        title: '地区选择',
        wheels: [
          {data: [
            {id: '1', value: '附近'},
            {id: '2', value: '上城区'},
            {id: '3', value: '下城区'},
            {id: '4', value: '江干区'},
            {id: '5', value: '拱墅区'},
            {id: '6', value: '西湖区'}
          ]},
          {data: [
            {id: '1', value: '1000米'},
            {id: '2', value: '2000米'},
            {id: '3', value: '3000米'},
            {id: '4', value: '5000米'},
            {id: '5', value: '10000米'}
          ]}
        ],
        callback: function (indexArr, data) {
          console.log(data) // 返回选中的json数据
        }
      })
      let m3 = new MobileSelect({
        trigger: '#trigger3',
        title: '地区选择-联动',
        wheels: [
          {data: [
            {
              id: '1',
              value: '附近',
              childs: [
                {id: '1', value: '1000米'},
                {id: '2', value: '2000米'},
                {id: '3', value: '3000米'},
                {id: '4', value: '5000米'},
                {id: '5', value: '10000米'}
              ]
            },
            {id: '2', value: '上城区'},
            {id: '3', value: '下城区'},
            {id: '4', value: '江干区'},
            {id: '5', value: '拱墅区'},
            {id: '6', value: '西湖区'}
          ]}
        ],
        position: [0, 1],
        callback: function (indexArr, data) {
          console.log(data) // 返回选中的json数据
        }
      })
      console.log(m1, m2, m3)
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

</style>
