<template>
  <div>
    <FullCalendar
        ref="fullCalendar"
        defaultView="dayGridMonth"
        locale="zh-cn"
        :header="{
                    left: 'today',
                    center: 'prev title next',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }"
        :views="{
                    timeGrid: {
                      eventLimit: 6
                    }
                }"
        :eventLimit="true"
        :plugins="calendarPlugins"
        :weekends="calendarWeekends"
        :editable="false"
        :events="calendarEvents"
        :buttonText="buttonText"
        @eventClick="handleEventClick"
    />

    <div id="popoverMenu" style="display: none;">
      <dd>
        <i class='iconfont'>&#xe6b4;</i><a href='#' data-toggle="modal" data-backdrop="static"
                                           data-target="#createRe">创建提醒</a>
      </dd>
      <dd>
        <i class='iconfont'>&#xe600;</i><a href='#' data-toggle="modal" data-backdrop="static"
                                           data-target="#createSch">创建日程</a>
      </dd>
    </div>

    <div class="modal fade" id="createRe">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">创建提醒</h4>
          </div>
          <form action="" method="POST" class="form-horizontal"
                @submit.prevent="validateBeforeSubmit('form1')" data-vv-scope="form1">
            <div class="modal-body pl-30 pr-30">
              <div class="form-group">
                <label class="col-sm-2 control-label">添加标题</label>
                <div class="col-sm-9">
                  <input type="text" class="form-control" name="reTitle" placeholder="请输入标题"
                         v-model="reTitle" v-validate="'required|max:20'" data-vv-as="标题">
                  <div class="validateTip" v-show="errors.has('form1.reTitle')">
                    {{ errors.first('form1.reTitle') }}
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">选择时间</label>
                <div class="col-sm-4">
                  <input type="text" class="form-control" name="reTime" placeholder="请选择日期"
                         v-model="reTime" v-validate="'required'" data-vv-as="时间">
                  <div class="validateTip" v-show="errors.has('form1.reTime')">
                    {{ errors.first('form1.reTime') }}
                  </div>
                </div>
                <div class="col-sm-3">
                  <select name="name" class="form-control">
                    <option value="">不重复</option>
                    <option value="">每天</option>
                    <option value="">每个工作日</option>
                  </select>
                </div>
                <div class="col-sm-2">
                  <div class="checkbox">
                    <label>
                      <input type="checkbox" name="" value=""> 全天
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">提醒状态</label>
                <div class="col-sm-4">
                  <input type="text" class="form-control" name="reState" placeholder="已完成/未完成"
                         v-model="reState" v-validate="'required'" data-vv-as="提醒状态">
                  <div class="validateTip" v-show="errors.has('form1.reState')">
                    {{ errors.first('form1.reState') }}
                  </div>
                </div>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default">完成并创建下一个</button>
              <button type="submit" class="btn btn-primary">保存</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="modal fade" id="createSch">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title">创建日程</h4>
          </div>
          <form action="" method="POST" class="form-horizontal"
                @submit.prevent="validateBeforeSubmitSch('form2')" data-vv-scope="form2">
            <div class="modal-body pl-30 pr-30">
              <div class="form-group">
                <label class="col-sm-2 control-label">添加标题</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" name="sTitle" placeholder="请输入日程标题"
                         v-model="sTitle"
                         v-validate="'required'" data-vv-as="标题">
                  <div class="validateTip" v-show="errors.has('form2.sTitle')">
                    {{ errors.first('form2.sTitle') }}
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">优先级</label>
                <div class="col-sm-10">
                  <div class="radio priority">
                    <label class="high active" title="高">
                      <input type="radio" name="" value="">
                    </label>
                    <label class="in" title="中">
                      <input type="radio" name="" value="">
                    </label>
                    <label class="low" title="低">
                      <input type="radio" name="" value="">
                    </label>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">选择时间</label>
                <div class="col-sm-5">
                  <input type="text" name="name" class="form-control" placeholder="请选择日期"/>
                </div>
                <div class="col-sm-5">
                  <div class="checkbox" style="display:inline-block;">
                    <label>
                      <input type="checkbox" name="" value=""> 全天
                    </label>
                  </div>

                  <div class="dropdown" style="display: inline-block;">
                    <i class="iconfont font20 c999 ml-15" style="cursor:pointer;"
                       data-toggle="dropdown">&#xe8bf;</i>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li class="active"><a href="#">不重复</a></li>
                      <li><a href="#">每天重复</a></li>
                      <li><a href="#">每周重复</a></li>
                      <li><a href="#">每月重复</a></li>
                      <li><a href="#">每年重复</a></li>
                      <li><a href="#">工作日重复</a></li>
                    </ul>
                  </div>

                  <div class="dropdown" style="display: inline-block;">
                    <i class="iconfont font20 c999 ml-15" style="cursor:pointer;"
                       data-toggle="dropdown">&#xe6b4;</i>
                    <ul class="dropdown-menu dropdown-menu-right">
                      <li class="active"><a href="#">关闭提醒</a></li>
                      <li><a href="#">开始时提醒</a></li>
                      <li><a href="#">5分钟提醒</a></li>
                      <li><a href="#">15分钟提醒</a></li>
                      <li><a href="#">30分钟提醒</a></li>
                      <li><a href="#">1小时前</a></li>
                    </ul>
                  </div>

                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">参与者</label>
                <div class="col-sm-5">
                  <select name="name" class="form-control">
                    <option value=""> 请选择</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label">日程说明</label>
                <div class="col-sm-10"><textarea name="" class="form-control"
                                                 style="height: 80px;"></textarea></div>
              </div>

              <div class="form-group">
                <label class="col-sm-2 control-label">日程状态</label>
                <div class="col-sm-5">
                  <input type="text" name="name" class="form-control" placeholder="已完成/未完成"/>
                </div>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default">完成并创建下一个</button>
              <button type="submit" class="btn btn-primary">保存</button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// import '@~/js/VeeValidateConfig'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import db from '@~/js/request'

export default {
  name: 'Calendar2',
  data () {
    return {
      reTitle: '',
      reTime: '',
      reState: '',
      sTitle: '',
      createAch: {},
      // -------------------------------
      buttonText: {
        today: '今天',
        month: '月',
        week: '周',
        day: '天',
        list: '列表'
      },
      calendarPlugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin
      ],
      calendarWeekends: true,
      calendarEvents: [
        {title: '今天会议今天会议今天会议今天会议', start: '2019-07-23'},
        {title: '1212', start: new Date()},
        {title: '3435', start: new Date()},
        {title: '464646', start: new Date()},
        {title: 'dgdg', start: new Date()},
        {title: 'fjfgj', start: new Date()},
        {title: 'fhfh', start: new Date()},
        {title: 'zxdgdxh', start: new Date()},
        {title: 'dfhbf', start: new Date()},
        {title: 'xfbxcnb', start: new Date()},
        {title: 'x cn bvc xn', start: new Date()},
        {title: '今天会议2', start: '2019-07-10T10:30:00', end: '2019-07-12T12:30:00'},
        {title: 'All Day Event', start: '2019-07-01'},
        {title: 'Long Event', start: '2019-07-07', end: '2019-07-10'},
        {groupId: '999', title: 'Repeating Event', start: '2019-07-09T16:00:00+00:00'},
        {groupId: '999', title: 'Repeating Event', start: '2019-07-16T16:00:00+00:00'},
        {title: 'Conference', start: '2019-07-16', end: '2019-07-18'},
        {title: 'Meeting', start: '2019-07-17T10:30:00+00:00', end: '2019-07-17T12:30:00+00:00'},
        {title: 'Lunch', start: '2019-07-17T12:00:00+00:00'},
        {title: 'Birthday Party', start: '2019-07-18T07:00:00+00:00'},
        {url: 'http://google.com/', title: 'Click for Google', start: '2019-07-28'},
        {title: 'Meeting', start: '2019-07-17T14:30:00+00:00'},
        {title: 'Happy Hour', start: '2019-07-17T17:30:00+00:00'},
        {title: 'Dinner', start: '2019-07-17T20:00:00+00:00'}
      ]
    }
  },
  computed: {},
  mounted () {
    let self = this
    self.$nextTick(() => {
      $('.fc-content-skeleton td').each(function (index, element) {
        $('<a data-toggle=\'popover\' role="button" tabindex="' + index + '"></a>').appendTo(element)
      })
      setTimeout(function () {
        $('[data-toggle=\'popover\']').popover({
          html: true,
          placement: 'auto',
          container: 'body',
          content: function () {
            return $('#popoverMenu').html()
          }
        })

        $('[data-toggle=\'popover\']').on('click', function () {
          let $this = $(this)
          $('[data-toggle=\'popover\']').popover('hide')
          setTimeout(function () {
            $this.popover('toggle')
          }, 300)
        })
        $(document).on('click', function (e) {
          let i = $(e.target)
          if (!i.closest('[data-toggle=\'popover\']').length > 0) {
            $('[data-toggle=\'popover\']').popover('hide')
          }
        })
      }, 500)
    })
  },
  methods: {
    toggleWeekends () {
      this.calendarWeekends = !this.calendarWeekends // update a property
    },
    gotoPast () {
      let calendarApi = this.$refs.fullCalendar.getApi() // from the ref="..."
      calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
    },
    handleDateClick (arg) {
      if (confirm('您想要添加活动吗' + arg.dateStr + ' ?')) {
        this.calendarEvents.push({ // add new event data
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay
        })
      }
    },

    // 用户点击事件触发
    handleEventClick (info) {
      console.log(info)
    },
    validateBeforeSubmit (scope) {
      let self = this
      self.$validator.validateAll(scope).then((result) => {
        if (result) {
          let formData = $('').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {
                icon: 1
              }, function (i) {
                self.layer.close(i)
                self.$router.push('')
              })
            } else {
              self.layer.alert(res.msg, {
                icon: 2
              })
            }
          })
        }
      })
    },
    validateBeforeSubmitSch (scope) {
      let self = this
      self.$validator.validateAll(scope).then((result) => {
        if (result) {
          let formData = $('').serializeArray()
          let params = new URLSearchParams()
          formData.map(item => {
            params.append(item.name, item.value)
          })
          db.postRequest('', params).then(res => {
            if (res.status === 1) {
              self.layer.alert(res.msg, {
                icon: 1
              }, function (i) {
                self.layer.close(i)
                self.$router.push('')
              })
            } else {
              self.layer.alert(res.msg, {
                icon: 2
              })
            }
          })
        }
      })
    }
  },
  components: {FullCalendar},
  watch: {}
}
</script>

<style>
@import "../../node_modules/@fullcalendar/core/main.min.css";
@import '../../node_modules/@fullcalendar/daygrid/main.css';
@import '../../node_modules/@fullcalendar/timegrid/main.css';
</style>
<style lang="less">
.fc-center{
  & h2{display:inline-block;vertical-align:middle;}
  & button{
    padding:0;border:none;background-color:transparent;color:#666;vertical-align:middle;
    .fc-icon{margin-top:-2px;}
  }
}
.fc-button-group{
  & button{
    &.fc-button-primary{
    }
  }
}
.fc-body{
  & .fc-bg{
  }
  & .fc-content-skeleton{
    bottom:0;
    & > table{
      height:100%;
      & [data-toggle="popover"]{
        display:block;width:100%;height:100%;
      }
    }
  }
}
.popover-content{
  padding:15px 30px;
  & dd{
    line-height:35px;
    & a{display:inline-block;vertical-align:middle;margin-left:5px;color:#666;}
  }
}
</style>
<style scoped lang="less">
#createSch{
  & .priority{
    & label{
      width:20px;height:20px;display:inline-block;-webkit-border-radius:50%;-moz-border-radius:50%;border-radius:50%;margin-right:15px;position:relative;cursor:pointer;
      & input{filter:Alpha(Opacity=0); opacity:0;z-index:-1;}
      &.high{background-color:#f08772;}
      &.in{background-color:#3dc0ee;}
      &.low{background-color:#a1c38e;}
      &.active{
        &:before{
          content:'\e607';font-family:"iconfont";width:20px;height:20px;line-height:20px;text-align:center;position:absolute;left:0;top:0;color:#fff;
        }
      }
    }
  }
}
.dropdown{
  & .dropdown-menu{
    & li{
      &.active{
        &:after{
          content:'\e607';font-family:"iconfont";width:20px;height:20px;line-height:20px;text-align:center;position:absolute;right:10px;top:3px;
        }
        & a{background-color:transparent;color:#333;}
      }
    }
  }
}
</style>
