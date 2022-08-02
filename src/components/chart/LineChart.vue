<template>
  <div :id="id" :style="`width: 100%;height: ${height}px;`" v-if="!loading"></div>
</template>

<script>
import * as echarts from 'echarts/core'
import { TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { SVGRenderer } from 'echarts/renderers'

echarts.use([TooltipComponent, GridComponent, LegendComponent, LineChart, SVGRenderer, LabelLayout, UniversalTransition])

export default {
  name: 'LineChart',
  props: {
    height: {
      type: [Number, String],
      default: 400
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
        return ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    },
    dataSource: {
      type: Array,
      default: () => {
        return [
          { name: '意向', value: [150, 230, 224, 218, 135, 147, 260] },
          { name: '预购', value: [120, 132, 101, 134, 90, 230, 210] },
          { name: '成交', value: [220, 182, 191, 234, 290, 330, 310] }
        ]
      }
    },
    smooth: { // 折线是否光滑，曲线
      type: Boolean,
      default: false
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
    const series = []
    const legendData = []
    for (let i = 0; i < this.dataSource.length; i++) {
      series.push({
        name: this.dataSource[i].name,
        type: 'line',
        stack: 'Total',
        smooth: this.smooth,
        data: this.dataSource[i].value
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
