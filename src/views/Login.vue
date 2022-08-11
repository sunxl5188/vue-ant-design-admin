<template>
  <a-layout class="login">
    <a-layout-header>
      <div class="logo">
        <router-link to='/'>
          <img src="@/assets/images/logo.jpg" alt="logo"/>
        </router-link>
      </div>
      <div></div>
    </a-layout-header>
    <a-layout-content>
      <div class="loginTable">
        <div class="loginTableLeft"></div>
        <div class="loginTableRight">
          <h4>后台管理系统</h4>
          <a-form-model
            ref="myform"
            layout="horizontal"
            :model="myform"
            :rules="rules"
            @submit.prevent="submitSave"
            class="pt-5"
          >
            <a-form-model-item prop="name">
              <a-input size="large" v-model="myform.name" placeholder="请输入登录账号">
                <a-icon type="user" slot="prefix" style="color:rgba(0,0,0,.25)"/>
              </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
              <a-input-password size="large" v-model="myform.password" allow-clear placeholder="请输入登录密码">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
              </a-input-password>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" size="large" block html-type="submit">登录</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer>
      <div class="footer-nav">
        <a href="javascript:void(0);">关于我们</a>
        <span class="pl-2 pr-2">|</span>
        <a href="javascript:void(0);">联系我们</a>
        <span class="pl-2 pr-2">|</span>
        <a href="javascript:void(0);">人才招聘</a>
        <span class="pl-2 pr-2">|</span>
        <a href="javascript:void(0);">商家入驻</a>
        <span class="pl-2 pr-2">|</span>
        <a href="javascript:void(0);">广告服务</a>
        <span class="pl-2 pr-2">|</span>
        <a href="javascript:void(0);">友情链接</a>
        <span class="pl-2 pr-2">|</span>
        <a href="javascript:void(0);">销售联盟</a>
      </div>
      <div><small>浙ICP备11003236号 浙公网安备 33010602010533号 已通过 ISO27001:2013 信息安全认证</small></div>
      <div><small>违法和不良信息举报 举报邮箱：admin@XXX.com</small></div>
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      myform: {
        name: '孙悟空',
        password: '123456'
      },
      rules: {
        name: [
          { required: true, message: '请输入登录账号' },
          { min: 3, max: 15, message: '账号长度为3~15个字符' }
        ],
        password: [
          { required: true, message: '请输入登录密码' },
          { min: 6, max: 18, message: '密码长度为6~18个字符' }
        ]
      }
    }
  },
  methods: {
    submitSave () {
      this.$refs.myform.validate(valid => {
        if (valid) {
          // ....提交表单
          // 获取用户权限
          const data = { user: 'sxl123' }
          const authority = {
            basics: {
              user: {
                edit: 1,
                see: 0,
                del: 0,
                add: 1
              },
              role: {
                edit: 1,
                see: 1,
                del: 0,
                add: 0
              },
              menu: {
                edit: 0,
                see: 1,
                del: 0,
                add: 0
              },
              agency: {
                edit: 1,
                see: 1,
                del: 0,
                add: 1
              },
              loginlog: {
                edit: 1,
                see: 1,
                del: 0,
                add: 1
              },
              operatelog: {
                edit: 1,
                see: 1,
                del: 0,
                add: 1
              },
              photosphere: {},
              photosphere: {}
            },
            form: {
              baseform: {
                edit: 1,
                see: 1,
                del: 0,
                add: 1
              },
              base: {
                edit: 1,
                see: 1,
                del: 0,
                add: 1
              }
            },
            list: {
              listbase: {
                edit: 0,
                see: 1,
                del: 0,
                add: 1
              }
            }
          }
          this.$vuex('authority', authority)
          this.$vuex('vuex_token', 'gratest_59023FDF369611A71DB9E3ADBA79E5EE')
          this.$store.dispatch('signIn', data)
          this.$router.setMenuTree()
          this.$nextTick(() => {
            this.$router.push('/')
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login {
    min-width: 1200px;
    min-height: 710px;

    & .ant-layout-header {
      background-color: #ffffff;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & .logo {
        width: 200px;
        height: 40px;

        & img {
          vertical-align: initial;
        }
      }
    }

    & .ant-layout-footer {
      text-align: center;
      background: #ffffff;
    }

    & .ant-layout-content {
      display: flex;
      display: -webkit-flex;
      justify-content: center;
      align-items: center;

      & .loginTable {
        width: 1000px;
        height: 480px;
        background: #ffffff;
        box-shadow: 1px 0 5px 3px #e3e5e8;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        border-radius: 8px;
        overflow: hidden;

        & .loginTableLeft {
          float: left;
          width: 55%;
          height: 100%;
          background-image: url(../assets/images/login_bg.png);
          background-size: auto 100%;
          background-repeat: no-repeat;
          background-position: center center;
        }

        & .loginTableRight {
          float: right;
          width: 45%;
          height: 100%;
          padding: 30px 50px;

          & h4 {
            font-size: 26px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
