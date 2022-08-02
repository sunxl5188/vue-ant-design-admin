<template>
  <div>
    <!--tab~start-->
    <a-tabs default-active-key="0" type="line" size="large" :tab-bar-gutter="20" :hide-add="true" class="bg-white mb-4">
      <template slot="tabBarExtraContent">
        <a-space align="center" direction="horizontal" size="small">
          <a-button size="small" type="link" class="text-primary">今日</a-button>
          <a-button size="small" type="link" class="text-secondary">本周</a-button>
          <a-button size="small" type="link" class="text-secondary">本月</a-button>
          <a-button size="small" type="link" class="text-secondary">本年</a-button>
        </a-space>
        <a-range-picker
          format="YYYY-MM-DD"
          @change="onChange"
          style="width: 240px;"
          class="ml-3 mr-3"
        >
          <template slot="suffixIcon">
            <i class="iconfont">&#xe89e;</i>
          </template>
        </a-range-picker>
      </template>
      <!--tab--11111-->
      <a-tab-pane key="0" tab="销售额">
        <a-row :gutter="[0, 0]">
          <a-col :span="16" :xs="24" :sm="24" :md="14" :xl="16" :xxl="18">
            <Histogram height="350"/>
          </a-col>
          <a-col :span="8" :xs="24" :sm="24" :md="10" :xl="8" :xxl="6">
            <RankingList title="门店销售额排名" :list="rankList"/>
          </a-col>
        </a-row>
      </a-tab-pane>
      <!--tab---222222-->
      <a-tab-pane key="1" tab="访问量">
        <a-row :gutter="[0, 0]">
          <a-col :span="16" :xs="24" :sm="24" :md="14" :xl="16" :xxl="18">
            <LineChart height="350" :dataSource="lineData"/>
          </a-col>
          <a-col :span="8" :xs="24" :sm="24" :md="10" :xl="8" :xxl="6">
            <RankingList title="门店访问量排名" :list="visitList"/>
          </a-col>
        </a-row>
      </a-tab-pane>
    </a-tabs>
    <a-row :gutter="20">
      <a-col :span="12">
        <Card title="线上热门搜索">
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </Card>
      </a-col>
      <a-col :span="12">
        <Card title="销售额类别占比">
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </Card>
      </a-col>
    </a-row>
  </div>
</template>

<script>

import RankingList from '../../components/RankingList'
import Histogram from '../../components/chart/Histogram'
import LineChart from '../../components/chart/LineChart'
import Card from '../../components/Card'

export default {
  name: 'Mail',
  data () {
    return {
      rangeData: '',
      list: [],
      rankList: [],
      visitList: [],
      lineData: [
        {
          name: '福建',
          value: [15784, 23564, 25468, 12548, 2546, 1254, 12598]
        },
        {
          name: '浙江',
          value: [11784, 20564, 20468, 10548, 21546, 21254, 10598]
        },
        {
          name: '上海',
          value: [10784, 21564, 24468, 20548, 31546, 25254, 20598]
        }
      ]
    }
  },
  mounted () {
    for (let i = 0; i < 8; i++) {
      this.rankList.push({
        name: '桃源村' + i + '号店',
        total: 1234.56 - i * 100
      })
      this.visitList.push({
        name: '桃源村' + i + '号店访问量',
        total: 98734 - i * 100
      })
    }
  },
  methods: {
    pageChange (p) {
      this.list = []
      for (let i = p; i < p + 15; i++) {
        this.list.push({
          id: i,
          key: i,
          name: 'John Brown' + i,
          age: 32,
          address: 'New York No. 1 Lake Park',
          description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.'
        })
      }
    },
    onChange (value, dateString) {
      this.rangeData = dateString[0] ? dateString.join('~') : ''
    }
  },
  components: { Card, LineChart, Histogram, RankingList }
}
</script>
<style scoped lang="less">
  /deep/ .ant-tabs-nav {
    margin-left: 20px;
  }
</style>
