import cookies from 'vue-cookies'
const prefix = process.env.VUE_APP_PREFIX
// ******************** 动态路由
// 全局守卫
export default {
  install (Vue, router) {
    // 刷新页面时更新路由
    if (!!+cookies.get(`${prefix}hasLogin`) === true) {
      router.setMenuTree()
    }
    // ----
    router.beforeEach((to, from, next) => {
      const attribute = to.meta.attribute
      const auth = to.meta.auth
      const hasLogin = !!+cookies.get(`${prefix}hasLogin`)
      // 如果不需要登录时
      if (to.meta.requireAuth === undefined && to.name !== null) {
        if (to.path === '/login' && hasLogin) {
          next('/')
        } else {
          next()
        }
      } else {
        // 如果没有登录，跳转登录页
        if (!hasLogin) {
          next(`/login?redirect=${to.fullPath}`)
        } else {
          // 已登录~进入页面
          // 判断用户添加删除编辑等权限~~~~~
          if (attribute !== undefined && auth !== undefined) {
            if (auth[attribute] === 1) {
              next()
            } else {
              next('/403')
            }
          } else {
            next()
          }
        }
      }
    })

    router.beforeResolve((to, from, next) => {
      // 判断路由是否需要守卫
      next()
      // meta数据的方式
      /* if (window.isLogin) {
        // 已登录
        if (to.path === '/login') {
          next('/')
        } else {
          next()
        }
      } else {
        // 未登录
        if (to.path === '/login') {
          next()
        } else {
          next('/login?redirect=' + to.fullPath)
          // 传参的方式比较多
          // next({name:"Login",params:{toRouterName:to.name}})
        }
      } */
    })

    router.afterEach((to, from) => {
      // ....
    })
  }
}
