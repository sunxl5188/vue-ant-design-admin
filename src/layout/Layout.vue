<template>
  <div class="h-100">
    <a-layout class="layout-custom-trigger" v-if="network">
      <a-layout-sider v-model="vuex_menu.collapsed" :trigger="null" collapsible>
        <div class="logo" @click="goToHome">
          <router-link exact to="/" class="flex" :class="vuex_menu.collapsed ? 'row-center' : 'row-left'">
            <img src="../assets/images/logo.png" alt="">
            <h1 v-if="!vuex_menu.collapsed">Ant Design</h1>
          </router-link>
        </div>
        <Menu/>
      </a-layout-sider>
      <a-layout style="min-width: 600px">
        <a-layout-header style="background: #fff; padding: 0">
          <Header/>
        </a-layout-header>
        <a-layout-content class="layout-content">
          <Mail v-if="$route.name.toLowerCase()==='index'"/>
          <router-view v-if="!$route.meta.keepAlive"/>
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"/>
          </keep-alive>
        </a-layout-content>
      </a-layout>
    </a-layout>
    <!--无网络时提示网络已断开-->
    <div v-else>
      网络已断开
    </div>
  </div>
</template>

<script>
import Header from './Header'
import Menu from './Menu'
import Mail from '../views/admin/Main'

export default {
  name: 'Layout',
  components: { Mail, Header, Menu },
  data () {
    return {
      collapsed: false,
      routesArr: [],
      network: true
    }
  },
  mounted () {
    window.addEventListener('offline', () => {
      this.network = false
    })
    window.addEventListener('online', () => {
      this.network = true
    })
  },
  methods: {
    goToHome () {
      this.$vuex('vuex_menu.openKeys', [])
      this.$vuex('vuex_menu.selectedKeys', [])
    }
  },
  watch: {
    $route: {
      handler: function (nVal) {
        if (nVal.name === 'Index') {
          this.$vuex('vuex_menu.openKeys', [])
          this.$vuex('vuex_menu.selectedKeys', [])
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="less">
  .layout-custom-trigger {

    & .logo {
      height: 64px;
      background: #000;
      padding: 16px 14px;

      a {
        height: 32px;

        img {
          width: 26px;
          height: 26px;
        }

        h1 {
          display: inline-block;
          margin: 0 0 0 12px;
          font-size: 18px;
          color: #ffffff;
        }
      }
    }

    & .layout-content {
      margin: 24px 16px;
      min-height: auto;
      position: relative;
    }

  }
</style>
