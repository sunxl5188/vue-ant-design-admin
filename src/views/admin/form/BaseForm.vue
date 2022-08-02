<template>
  <div>{{$t('pageDesc')}}
    <Card title="基本表单">
      <Form :form="form" :rules="rules" @change="submitSave"></Form>
    </Card>
  </div>
</template>

<script>
import Card from '../../../components/Card'
import Form from '../../../components/form/Form'

const option = [
  { label: '分类一分类一分类一', value: 1 },
  { label: '分类', value: 2 },
  { label: '分类3', value: 3 }
]

const options = [
  { label: 'Apple', value: '1' },
  { label: 'Pear', value: '2' },
  { label: 'Orange', value: '3' }
]

const sex = [
  { label: '男', value: 1 },
  { label: '女', value: 2 }
]

const targetOpt = [
  { label: '公开', value: 1 },
  { label: '部分公开', value: 2 },
  { label: '不公开', value: 3 }
]

export default {
  name: 'BaseForm',
  i18n: require('./i18n'),
  data () {
    return {
      form: [
        { label: '用户名', name: 'user', placeholder: '请输入用户名称' },
        { label: '省市区', name: 'city', type: 'city' },
        {
          label: '产品分类',
          name: 'product',
          type: 'select',
          option,
          children: [
            { label: '产品列一', name: 'target_aaa', type: 'text', relation: [1] },
            { label: '产品列二', name: 'target_bbb', type: 'text', relation: [2, 3] }
          ]
        },
        { label: '产品标签', name: 'productTab', type: 'select', mode: 'multiple', option },
        { label: '添加日期', name: 'addtime', type: 'date' },
        { label: '出发日期', name: 'adddate', type: 'range' },
        { label: '爱好', name: 'hobby', type: 'checkbox', option: options },
        { label: '性别', name: 'sex', type: 'radio', option: sex },
        {
          label: '目标公开',
          name: 'target',
          type: 'radio',
          option: targetOpt,
          children: [
            { label: '产品列表', name: 'target_a', type: 'text', relation: [1] },
            { label: '产品列', name: 'target_bb', type: 'text', relation: [1] },
            { name: 'target_b', type: 'select', relation: [2], option: option },
            { name: 'target_c', type: 'date', relation: [3] }
          ],
          rules: {}
        }
      ],
      rules: {
        user: [
          { required: true, message: '请输入用户名称' }
        ]
      }
    }
  },
  mounted () {
    _.delay(() => {
      this.$i18n.locale = 'HK'
    }, 2000)
  },
  methods: {
    onChange (e) {
      console.log(e)
    },
    submitSave (e) {
      console.log(e)
    }
  },
  components: { Form, Card }
}
</script>

<style scoped>

</style>
