<template>
  <div :id="id" :style="`width:100%;height: ${height}px;`" v-if="!loading"></div>
</template>

<script>
import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  UniversalTransition
])

export default {
  name: 'PieChart',
  props: {
    height: {
      type: [String, Number],
      default: 400
    },
    name: {
      type: String,
      default: 'Access From'
    },
    dataSource: {
      type: Array,
      default: () => {
        return [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    },
    radius: {
      type: Array,
      default: () => {
        return ['0%', '50%']
      }
    },
    center: {
      type: Array,
      default: () => {
        return ['50%', '50%']
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
      id: this.$utils.guid(),
      loading: true,
      option: {}
    }
  },
  created () {
    this.option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      color: this.color,
      series: [
        {
          name: this.name,
          type: 'pie',
          radius: this.radius,
          center: this.center,
          data: this.dataSource,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
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
  }
}
</script>

<style scoped>

</style>
