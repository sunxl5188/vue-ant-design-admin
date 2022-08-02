<template>
  <div>
    <Loading :loading="loading"/>
    <a-form-model
      ref="form"
      layout="horizontal"
      :model="formData"
      :rules="rules"
      :label-col="{span:4}"
      :wrapper-col="{span:14}"
      @submit.prevent="submitSave"
      v-if="!loading"
    >
      <template v-for="(item, index) in form">
        <!--输入框-->
        <a-form-model-item :key="index" :label="item.label" :prop="item.name"
                           v-if="item.type === undefined || item.type === 'text'">
          <a-input
            v-model="formData[item.name]"
            :placeholder="item.placeholder?item.placeholder:`请输入${item.label}`"
          />
        </a-form-model-item>
        <!--下拉选择框-->
        <a-form-model-item :key="index" :label="item.label" :prop="item.name" v-if="item.type==='select'">
          <a-select
            v-model="formData[item.name]"
            show-search
            allowClear
            :options="item.option"
            :placeholder="item.placeholder?item.placeholder:`请选择${item.label}`"
            :mode="item.mode?item.mode:'default'"
            :maxTagCount="2"
          />
        </a-form-model-item>
        <!--日期选择框~单日期-->
        <a-form-model-item :key="index" :label="item.label" :prop="item.name" v-if="item.type === 'date'">
          <a-date-picker
            v-model="formData[item.name]"
            valueFormat="yyyy-MM-DD"
            :placeholder="item.placeholder?item.placeholder:`请选择${item.label}`"
          />
        </a-form-model-item>
        <!--日期选择框~日期范围-->
        <a-form-model-item :key="index" :label="item.label" :prop="item.name" v-if="item.type === 'range'">
          <a-range-picker
            v-model="formData[item.name]"
            valueFormat="YYYY-MM-DD"
            :placeholder="['开始时间', '结束时间']"
          />
        </a-form-model-item>
        <!--多选项checkbox-->
        <a-form-model-item :key="index" :label="item.label" :prop="item.name" v-if="item.type === 'checkbox'">
          <a-checkbox-group
            v-model="formData[item.name]"
            :options="item.option"
          />
        </a-form-model-item>
        <!--单选项radio-->
        <a-form-model-item :key="index" :label="item.label" :prop="item.name" v-if="item.type === 'radio'">
          <a-radio-group
            v-model="formData[item.name]"
            :options="item.option"
          />
        </a-form-model-item>
        <!--省市区-->
        <a-form-model-item :key="index" :label="item.label" :prop="item.name" v-if="item.type === 'city'">
          <a-cascader
            v-model="formData[item.name]"
            :options="cityOption"
            :showSearch="true"
            :placeholder="item.placeholder?item.placeholder:`请选择${item.label}`"
          />
        </a-form-model-item>
        <FormItemChild
          :relation="formData[item.name]?formData[item.name]:''"
          :form="item.children"
          :rules="item.rules"
          :key="item.name+index"
          v-if="item.children"
          @change="childCallback"
        />
      </template>
      <a-form-model-item :wrapper-col="{span:14,offset:4}">
        <a-space align="center" direction="horizontal" size="large">
          <a-button type="primary" html-type="submit">
            保存
          </a-button>
          <a-button type="default" @click="handleReset">
            重置
          </a-button>
        </a-space>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import FormItemChild from '@/components/form/FormItemChild'
import Loading from '@/components/Loading'
import cityOption from '@/assets/json/city.json'

export default {
  name: 'Form',
  components: { Loading, FormItemChild },
  props: {
    form: {
      type: Array,
      default: () => {
        return {}
      }
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      loading: true,
      cityOption,
      formData: {}
    }
  },
  created () {
    this.form.map(item => {
      if (item.type === 'select') {
        if (item.mode === 'multiple') {
          this.$set(this.formData, item.name, [])
        } else {
          this.$set(this.formData, item.name, undefined)
        }
      } else if (['checkbox', 'range', 'city'].includes(item.type)) {
        this.$set(this.formData, item.name, [])
      } else {
        this.$set(this.formData, item.name, '')
      }

      if (item.children) {
        item.children.map(items => {
          this.$set(this.formData, items.name, '')
        })
      }
    })
  },
  async mounted () {
    await this.$nextTick()
    this.loading = false
  },
  methods: {
    submitSave () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('change', this.formData)
        }
      })
    },
    handleReset () {
      this.$refs.form.resetFields()
    },
    childCallback (data) {
      for (const i in data) {
        this.formData[i] = data[i]
      }
    }
  }
}
</script>

<style scoped>

</style>
