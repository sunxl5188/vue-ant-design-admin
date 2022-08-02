<template>
  <div>
    <a-form :form="form" layout="horizontal" :labelCol="{span: 8}" :wrapperCol="{ span: 16 }">
      <a-row :gutter="10">
        <template v-for="(item, i) in formItem">
          <a-col :xs="12" :sm="12" :md="12" :lg="8" :xl="8" :xxl="6" :key="i" v-show="i < len">
            <a-form-item :label="item.label">
              <!--文本输入-->
              <a-input
                v-decorator="[item.name, {}]"
                :placeholder="item.placeholder?item.placeholder:`请输入${item.label}`"
                v-if="item.type===undefined || item.type === 'text'"
              />
              <!--选择项-->
              <a-select
                v-decorator="[item.name]"
                show-search
                allowClear
                class="w-100"
                :options="item.option"
                :placeholder="item.placeholder?item.placeholder:`请选择${item.label}`"
                :mode="item.mode?item.mode:'default'"
                :maxTagCount="2"
                v-if="item.type === 'select'"
              />
              <!--日期选择框~单日期-->
              <a-date-picker v-decorator="[item.name]" valueFormat="yyyy-MM-DD"
                             :placeholder="item.placeholder?item.placeholder:`请选择${item.label}`"
                             class="w-100" v-if="item.type === 'date'"/>
              <!--日期选择框~日期范围-->
              <a-range-picker
                v-decorator="[item.name]"
                valueFormat="YYYY-MM-DD"
                :placeholder="['开始时间', '结束时间']"
                class="w-100"
                v-if="item.type === 'range'"
              />
            </a-form-item>
          </a-col>
        </template>
        <a-col :span="colSpan" class="text-right pt-1" v-if="formItem.length>0">
          <a-space align="end" direction="horizontal" size="middle">
            <a-button type="primary" @click="handleSearch()">搜索</a-button>
            <a-button type="default" @click="handleSearch('clear')">清空</a-button>
            <a-button type="link" @click.stop="setAdvanced"
                      v-if="formItem.length > len || (!advanced && formItem.length === len)">
              {{advanced?'展开':'收起'}}
              <i class="iconfont">{{advanced?'&#xe7b2;':'&#xe745;'}}</i>
            </a-button>
          </a-space>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    formItem: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      advanced: true,
      len: 3,
      colSpan: 0,
      form: this.$form.createForm(this, { name: 'advanced_search' })
    }
  },
  mounted () {
    this.getWidth()
    window.addEventListener('resize', _.debounce(() => { this.getWidth() }, 100))
  },
  methods: {
    /**
       * @获取页面宽计算显示个数
       */
    getWidth () {
      const fLen = this.formItem.length
      if (this.advanced) {
        if (window.innerWidth < 992) {
          this.len = 2
        } else if (window.innerWidth > 992 && window.innerWidth < 1600) {
          this.len = 3
        } else {
          this.len = 4
        }
      }
      const current = this.len - fLen
      const radix = (24 / this.len)

      if (this.advanced === true) {
        if (fLen < this.len) {
          this.colSpan = (this.len - fLen) * radix
        } else {
          this.colSpan = 24
        }
      } else {
        this.colSpan = (this.len - Math.abs(current) % this.len) * radix
      }
      if (this.advanced === false) {
        this.len = this.formItem.length
      }
    },
    /**
       * @展开收起
       */
    setAdvanced () {
      this.advanced = !this.advanced
      this.getWidth()
    },
    /**
       * @搜索~向父组件传值
       */
    handleSearch (action) {
      // 清空搜索
      if (action === 'clear') {
        this.form.resetFields()
      }
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = {}
          for (const i in values) {
            const val = values[i] || ''
            const obj = _.filter(this.formItem, o => o.name === i)[0]
            if (Object.prototype.toString.call(val) === '[object Array]') {
              if (obj.type === 'range') {
                data[i] = val.join('~')
              } else {
                data[i] = val.join(',')
              }
            } else {
              data[i] = val
            }
          }
          this.$emit('search', data)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .ant-form-item {
    margin-bottom: 10px;
  }
</style>
