<template>
  <div class="form-inline" :id="id">
    <!--省市区三级联动菜单-->
    <select :name="pName" class="form-control selectpicker show-tick" v-model="province"
            @change="getCityList($event.target.selectedIndex - 1, 1);refreshSelect()">
      <option value="">请选择</option>
      <option :value="item.area_id" v-for="(item,i) in pList" :key="i">{{item.title}}</option>
    </select>
    <select :name="cName" class="form-control selectpicker show-tick" v-model="city"
            @change="getCityList($event.target.selectedIndex - 1, 2);refreshSelect()"
            :style="{'display:none;': cList.length > 0}">
      <option value="">请选择</option>
      <option :value="item.area_id" v-for="(item,i) in cList" :key="i">{{item.title}}</option>
    </select>
    <select :name="aName" class="form-control selectpicker show-tick" v-model="area"
            @change="getCityList($event.target.selectedIndex - 1, 3)"
            :style="{'display:none;': aList.length > 0}" v-if="aDisplay">
      <option value="">请选择</option>
      <option :value="item.area_id" v-for="(item, i) in aList" :key="i">{{item.title}}</option>
    </select>
    <!--调用组件与赋值-->
    <!--<CitySelect p="350000" c="361003" a="361001" @cityCallback="cityCallback"></CitySelect>-->
  </div>
</template>

<script>
import cityJson from '@@/json/cityjson'
import 'bootstrap-select'
import 'bootstrap-select/dist/js/i18n/defaults-zh_CN'

export default {
  name: 'CitySelect',
  props: {
    p: {
      type: String,
      default: ''
    },
    c: {
      type: String,
      default: ''
    },
    a: {
      type: String,
      default: ''
    },
    pName: {
      type: String,
      default: 'province'
    },
    cName: {
      type: String,
      default: 'city'
    },
    aName: {
      type: String,
      default: 'area'
    },
    aDisplay: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      id: '',
      province: this.p,
      city: this.c,
      area: this.a,
      pList: cityJson.cityList,
      cList: [],
      aList: []
    }
  },
  mounted () {
    let self = this
    self.id = 'city_' + (new Date()).getTime()
    self.$nextTick(() => {
      if (self.province) {
        let i = self.arrObjIndex(self.pList, self.province)
        self.initialList(i, 1)
      }
      if (self.city) {
        let i = self.arrObjIndex(self.cList, self.city)
        self.initialList(i, 2)
      }

      setTimeout(function () {
        let $this = $('#' + self.id).find('.bootstrap-select')
        if (self.cList.length < 1) {
          $this.eq(1).hide()
        } else {
          $this.eq(1).show()
        }
        if (self.aList.length < 1) {
          $this.eq(2).hide()
        } else {
          $this.eq(2).show()
        }
      }, 1000)
    })
  },
  methods: {
    initialList (i, type) {
      let self = this
      if (type === 1) {
        self.cList = self.pList[i]['child']
      }
      if (type === 2) {
        self.aList = self.cList[i]['child']
      }
    },
    getCityList (i, type) {
      let self = this
      if (type === 1) {
        self.city = ''
        self.area = ''
        self.cList = []
        self.aList = []
        self.cList = self.pList[i]['child']
      }
      if (type === 2) {
        self.area = ''
        self.aList = []
        self.aList = self.cList[i]['child']
      }
      self.$emit('cityCallback', {
        province: self.province,
        city: self.city,
        area: self.area
      })
    },
    arrObjIndex (obj, objStr) {
      return obj.reduce((index, ele, i) => {
        if (ele.area_id === String(objStr)) {
          return i
        } else {
          return index
        }
      }, -1)
    },
    // 选择时，列表值变动时刷新select样式
    refreshSelect () {
      setTimeout(function () {
        $('.selectpicker').selectpicker('refresh')
        setTimeout(function () {
          $('.form-inline .selectpicker').each(function () {
            if ($(this).find('option').length > 1) {
              $(this).parents('.bootstrap-select').show()
            } else {
              $(this).parents('.bootstrap-select').hide()
            }
          })
        }, 100)
      }, 100)
    }
  }
}
</script>

<style scoped>

</style>
