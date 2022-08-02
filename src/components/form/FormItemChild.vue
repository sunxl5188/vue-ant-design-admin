<template>
  <a-form-model
    ref="form"
    layout="horizontal"
    :label-col="{span:labelCol}"
    :wrapper-col="{span:wrapperCol}"
    :model="formData"
    :rules="rules"
  >
    <template v-for="(item, index) in form">
      <!--文本人-->
      <a-form-model-item
        :label="item.label || ' '"
        :colon="item.label!==undefined"
        :prop="item.name"
        :key="item.name+index"
        v-if="(item.type===undefined || item.type === 'text') && item.relation.includes(relation)"
      >
        <a-input
          v-model="formData[item.name]"
          :placeholder="item.placeholder?item.placeholder:'请输入'"
        />
      </a-form-model-item>
      <!--选择-->
      <a-form-model-item
        :label="item.label || ' '"
        :colon="item.label!==undefined"
        :prop="item.name"
        :key="item.name+index"
        v-if="item.type==='select'&& item.relation.includes(relation)"
      >
        <a-select
          v-model="formData[item.name]"
          show-search
          allowClear
          :options="item.option"
          :placeholder="item.placeholder?item.placeholder:'请选择'"
          :mode="item.mode?item.mode:'default'"
          :maxTagCount="2"
          style="min-width: 100px"
          v-if="item.type==='select'"
        />
      </a-form-model-item>
      <!--日期-->
      <a-form-model-item
        :label="item.label || ' '"
        :colon="item.label!==undefined"
        :prop="item.name"
        :key="item.name+index"
        v-if="item.type==='date'&& item.relation.includes(relation)"
      >
        <a-date-picker
          v-model="formData[item.name]"
          valueFormat="yyyy-MM-DD"
          :placeholder="item.placeholder?item.placeholder:'请选择'"
          v-if="item.type === 'date'"
        />
      </a-form-model-item>
      <!--日期选择框~日期范围-->
      <a-form-model-item
        :label="item.label || ' '"
        :colon="item.label!==undefined"
        :prop="item.name"
        :key="item.name+index"
        v-if="item.type==='range'&& item.relation.includes(relation)"
      >
        <a-range-picker
          v-model="formData[item.name]"
          valueFormat="YYYY-MM-DD"
          :placeholder="['开始时间', '结束时间']"
          v-if="item.type === 'range'"
        />
      </a-form-model-item>
    </template>
  </a-form-model>
</template>

<script>
export default {
  name: 'FormItemChild',
  props: {
    labelCol: {
      type: Number,
      default: 4
    },
    wrapperCol: {
      type: Number,
      default: 6
    },
    relation: {
      type: [String, Number, Boolean],
      required: true
    },
    form: {
      type: Array,
      default: () => {
        return []
      }
    },
    rules: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      formData: {}
    }
  },
  mounted () {
    this.form.map(item => {
      let val = ''
      if (['select', 'date'].includes(item.type)) {
        val = undefined
      }
      if (item.type === 'range') {
        val = []
      }
      this.$set(this.formData, item.name, val)
    })
  },
  methods: {
    labelName (text) {
      console.log(text)
      return text === '' ? text : ' '
    }
  },
  watch: {
    formData: {
      handler: function (data) {
        this.$emit('change', data)
      },
      deep: true
    }
  }
}
</script>

<style scoped>

</style>
