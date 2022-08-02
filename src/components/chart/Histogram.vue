<template>
  <div :id="id" :style="`width: 100%;height: ${height}px;`" v-if="!loading"></div>
</template>

<script>
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([TooltipComponent, GridComponent, LegendComponent, BarChart, LabelLayout, UniversalTransition, SVGRenderer])

export default {
  name: 'Histogram',
  props: {
    height: {
      type: [String, Number],
      default: 400
    },
    borderRadius: {
      type: [Array, String],
      default: () => {
        return [4, 4, 0, 0]
      }
    },
    grid: {
      type: Object,
      default: () => {
        return {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '15%'
        }
      }
    },
    xData: {
      type: Array,
      default: () => {
        return ['家具家电', '粮油副食', '生鲜水果', '美容洗护', '母婴用品', '进口食品', '食品饮料', '家庭清洁']
      }
    },
    dataSource: {
      type: Array,
      default: () => {
        return [
          { name: '售出额', value: [34000, 25000, 11000, 9000, 7000, 6000, 4800, 7500] },
          { name: '总利润', value: [32000, 21000, 9000, 9800, 17000, 13000, 14800, 17500] }
        ]
      }
    },
    color: {
      type: Array,
      default: () => {
        return ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
      }
    }
  },
  data () {
    return {
      id: this.$utils.guid(32, true),
      loading: true,
      option: {}
    }
  },
  created () {
    const series = []
    const legendData = []
    for (let i = 0; i < this.dataSource.length; i++) {
      series.push({
        name: this.dataSource[i].name,
        data: this.generateData(this.dataSource[i].value),
        type: 'bar',
        barMaxWidth: '40%',
        barMinWidth: '10%',
        barMinHeight: 0,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(198,198,198,0.1)'
        }
      })
      legendData.push(this.dataSource[i].name)
    }
    this.option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        valueFormatter: (params) => {
          return params
        }
      },
      color: this.color,
      grid: {
        left: this.grid.left,
        right: this.grid.right,
        bottom: this.grid.bottom,
        top: this.grid.top,
        containLabel: true
      },
      legend: {
        data: legendData
      },
      xAxis: {
        type: 'category',
        data: this.xData
      },
      yAxis: {
        type: 'value'
      },
      series
    }
  },
  async mounted () {
    await this.$nextTick()
    this.loading = false
    await this.$nextTick()
    // 初始化图表，设置配置项
    const myChart = echarts.init(document.getElementById(this.id))
    myChart.setOption(this.option)
    window.addEventListener('resize', _.debounce(() => {
      myChart.resize()
    }, 100))
  },
  methods: {
    generateData (data) {
      const arr = []
      data.map((item) => {
        arr.push({
          value: item,
          itemStyle: {
            borderRadius: this.borderRadius
          }
        })
      })
      return arr
    }
  }
}
</script>

<style scoped>

</style>
