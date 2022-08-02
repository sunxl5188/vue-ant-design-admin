<template>
  <div>
    <full-calendar
        lang="zh"
        :events="monthData"
        @changeMonth="changeMonth"
        @eventClick="eventClick"
        @dayClick="dayClick"
        @moreClick="moreClick"
    />
    <a class="btn btn-primary" data-toggle="modal" data-backdrop="static" data-target="#modal-id">Trigger modal</a>
    <div class="modal fade" id="modal-id">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">Modal title</h4>
          </div>
          <div class="modal-body">
            Modal body ...
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary">保存</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import 'vue-fullcalendar'

export default {
  name: 'Calendar',
  data () {
    return {
      monthData: [
        {
          title: 'eeeeeeeee', // 事件内容
          start: '2019-07-19', // 事件开始时间
          end: '2019-07-20', // 事件结束时间
          cssClass: 'blue' // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
        }
      ]
    }
  },
  computed: {},
  mounted () {},
  methods: {
    // 选择月份
    changeMonth (start, end, current) {
      console.log('changeMonth', start, end, current)
    },
    // 点击事件
    eventClick (event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos)
    },
    // 点击当天
    dayClick (day, jsEvent) {
      let self = this
      self.monthData.push({
        title: '(无标题)', // 事件内容
        start: '2019-07-21', // 事件开始时间
        end: '2019-07-22', // 事件结束时间
        cssClass: 'blue' // 事件的样式   class名（由后台返回数据）  red为自己定义的class名
      })
      console.log('dayClick', day, jsEvent)
    },
    // 查看更多
    moreClick (day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    }
  },
  components: {
    'full-calendar': require('vue-fullcalendar')
  }
}
</script>

<style lang="less">
.comp-full-calendar{
  max-width:none;height:800px;
  & .full-calendar-body{
    height:100%;
    & .dates{
      & .dates-events .events-week .events-day{
        min-height:100px;
        & .event-box .event-item{
          &.blue{
            background-color:#cceefe;
            color:#135a82;
          }
          &.pink{
            background-color:#fce5e0;
            color:#666;
          }
        }
      }
      & .week-row .day-cell{
        position:relative;
        & .day-number{
          z-index:2;position:absolute;width:24px;height:24px;line-height:24px;text-align:center;left:50%;top:2px;margin-left:-12.5px;
        }
        &.today{
          background-color:#fff;
          &:before{
            content:''; display:block; width:24px; height:24px;-webkit-border-radius:24px;-moz-border-radius:24px;border-radius:24px;background-color:#1a73e8;position:absolute; left:50%; top:2px; margin-left:-12.5px;z-index:1;
          }
          & .day-number{color:#fff;}
        }
      }
    }
  }
}
</style>
