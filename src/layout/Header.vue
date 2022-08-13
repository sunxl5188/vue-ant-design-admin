<template>
  <div class="header">
    <div>
      <a-icon
        class="trigger"
        :type="vuex_menu.collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="onSider"
      />
      <a-breadcrumb :routes="routesArr" style="display: inline-block">
        <template slot="itemRender" slot-scope="{ route, routes, paths }">
          <span v-if="routes.indexOf(route) === routes.length - 1 || routes.indexOf(route) === 1">
            {{route.meta.title}}
          </span>
          <router-link
            v-else
            :to="{path: `/${routes.indexOf(route) - 1 === -1 ? '' : paths[routes.indexOf(route) - 1]}`}"
          >
            {{ route.meta.title }}
          </router-link>
        </template>
      </a-breadcrumb>
    </div>
    <div class="pr-4 headerMenu">
      <a-space align="center" direction="horizontal" size="middle">
        <div>
          <a-icon type="question-circle" :style="{'font-size': '20px'}" class="align-middle"/>
        </div>
        <div>
          <a-dropdown v-model="dropdownVisible" :trigger="['click']" placement="bottomRight">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <a-badge :count="5" :overflow-count="9">
                <i class="iconfont font-22">&#xe8be;</i>
              </a-badge>
            </a>
            <a-menu slot="overlay" @click="handleMenuClick" style="width:380px;">
              <a-tabs default-active-key="0">
                <a-tab-pane tab="通知(4)" key="0">
                  <a-list item-layout="horizontal" :data-source="notice">
                    <a-list-item slot="renderItem" :key="index" slot-scope="item, index">
                      <a-list-item-meta :description="item.content">
                        <a-avatar :src="iconType[item.type]" slot="avatar" class="ml-3"/>
                        <a slot="title" href="#">
                          <span class="align-middle" :class="{'text-bold':item.read!==1}">{{item.title}}</span>
                          <img src="@/assets/images/1-140104202149.gif" class="align-middle ml-1" v-if="item.read!==1">
                        </a>
                      </a-list-item-meta>
                    </a-list-item>
                    <div slot="footer" class="flex row-center pt-0 pb-0 text-center">
                      <div class="flex-1">
                        <a-button type="link" size="small" class="text-secondary">清空通知</a-button>
                      </div>
                      <div class="flex-1">
                        <a-button type="link" size="small" class="text-secondary">查看更多</a-button>
                      </div>
                    </div>
                  </a-list>
                </a-tab-pane>
                <a-tab-pane tab="消息(3)" key="1">
                  <a-list :data-source="newsList">
                    <a-list-item slot="renderItem" slot-scope="item">
                      <a-list-item-meta>
                        <a-avatar slot="avatar" :src="require('@/assets/images/avatar.jpg')" class="ml-3"/>
                        <a href="#" slot="title">
                            <span class="text-ellipsis align-middle" :class="{'text-bold':item.read!==1}"
                                  style="width:240px;">
                              {{item.title}}
                            </span>
                          <img src="../assets/images/1-140104202149.gif" alt="" class="align-middle ml-1"
                               v-if="item.read!==1">
                        </a>
                        <div slot="description">
                          {{item.content}}
                          <div class="w-25 text-gray-light"><small>{{moment(item.date).fromNow()}}</small></div>
                        </div>
                      </a-list-item-meta>
                    </a-list-item>
                    <div slot="footer" class="flex row-center pt-0 pb-0 text-center">
                      <div class="flex-1">
                        <a-button type="link" size="small" class="text-secondary">清空消息</a-button>
                      </div>
                      <div class="flex-1">
                        <a-button type="link" size="small" class="text-secondary">查看更多</a-button>
                      </div>
                    </div>
                  </a-list>
                </a-tab-pane>
              </a-tabs>
            </a-menu>
          </a-dropdown>
        </div>
        <div>
          <a-dropdown placement="bottomCenter">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              <a-avatar icon="user" size="small" style="background-color:#ccc" shape="circle"/>
              <span class="pl-2 align-middle text-secondary">孙悟空</span>
            </a>
            <a-menu slot="overlay" style="width: 120px;">
              <a-menu-item key="0">
                <a-button type="link">修改密码</a-button>
              </a-menu-item>
              <a-menu-item key="1">
                <a-button type="link">个人中心</a-button>
              </a-menu-item>
              <a-menu-divider/>
              <a-menu-item key="3">
                <a-button type="link" @click="loginOut">退出登录</a-button>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
      </a-space>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  data () {
    return {
      routesArr: [],
      dropdownVisible: false,
      iconType: {
        email: require('@/assets/images/email.png'),
        nail: require('@/assets/images/nailnail.png'),
        collection: require('@/assets/images/collection.png')
      },
      loading: false,
      notice: [
        {
          title: '你收到了 14 份新周报',
          content: '周报信息描述详情细节等文案...',
          type: 'email',
          read: 0
        },
        {
          title: '你推荐的 曲妮妮 已通过第三轮面试',
          content: '已通过第三轮面试描述详情细节等文案...',
          type: 'nail',
          read: 0
        },
        {
          title: '左侧图标用于区分不同的类型',
          content: '收藏信息详细信息...',
          type: 'collection',
          read: 1
        }
      ], // 通知列表
      newsList: [] // 消息列表
    }
  },
  beforeMount () {
    this.newsList = this.fetchData()
  },
  mounted () {

  },
  methods: {
    onSider () {
      this.$vuex('vuex_menu.collapsed', !this.vuex_menu.collapsed)
    },
    loginOut () {
      this.$confirm(Object.assign(this.$confirmOpt,
        {
          content: '您确定要退出登录？',
          onOk: () => {
            this.$store.dispatch('logOut')
            window.location.replace('/login?redirect=' + this.$route.fullPath)
          }
        }))
    },
    handleMenuClick () {
      this.dropdownVisible = true
    },
    fetchData () {
      const dataArr = []
      for (let i = 1; i < 6; i++) {
        dataArr.push({
          id: i,
          title: '曲丽丽评论了你曲丽丽评论了你曲丽丽评论了你',
          content: '描述信息描述信息描述信息...',
          date: '2020-01-02',
          read: i % 2 === 0 ? 1 : 0
        })
      }
      this.loading = false
      return dataArr
    }
  },
  watch: {
    $route: {
      handler: function (to) {
        const { matched } = to
        this.routesArr = matched
      },
      immediate: true
    }
  },
  errorCaptured (err, vm, info) {
    console.log(err)
  }
}
</script>

<style scoped lang="less">
  @import "../assets/css/valiables.less";

  .header {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;

    & .ant-dropdown-link {
      display: inline-block;
    }

    & .trigger {
      font-size: 18px;
      line-height: 64px;
      padding: 0 24px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .headerMenu {
    .ant-space-item {
      & > div {
        padding: 0 12px;
        cursor: pointer;

        &:hover {
          background-color: #f0f2f5;
        }
      }
    }
  }

  .ant-dropdown-menu {
    padding-bottom: 0;
  }

  /deep/ .ant-tabs-nav-scroll {
    text-align: center;
  }

  /deep/ .ant-list-footer {
    position: relative;
    overflow: hidden;

    &:after {
      content: '';
      width: 1px;
      height: 50px;
      position: absolute;
      left: 50%;
      top: 0;
      background: @border-color;
    }
  }
</style>
