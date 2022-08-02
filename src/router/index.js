import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/Layout'
import Admin from '../views/admin/Admin'
import store from '../store'

Vue.use(VueRouter)

const dynamicArr = [] // 动态路由数组

// 静态路由
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login'),
    meta: {
      title: '用户登陆',
      keepAlive: true
    }
  },
  {
    path: '/',
    name: 'Index',
    component: Layout,
    meta: {
      title: '首页',
      requireAuth: true,
      keepAlive: true
    },
    children: [
      {
        path: '403',
        name: 'error403',
        component: () => import('../views/admin/error/403'),
        meta: {
          title: '您没有操作权限',
          keepAlive: true
        }
      },
      {
        path: '500',
        name: 'error500',
        component: () => import('../views/admin/error/500'),
        meta: {
          title: '哎呀...服务器出现错误了!',
          keepAlive: true
        }
      }
    ]
  }
]

const page404 = {
  path: '*',
  name: '404',
  component: () => import('../views/admin/error/404'),
  meta: {
    title: '当前页面不存在',
    keepAlive: true
  }
}

/**
 * @动态路由
 */
const routeList = [
  {
    path: 'basics',
    name: 'Basics',
    component: Admin,
    meta: {
      title: '系统管理',
      icon: 'setting',
      keepAlive: true,
      requireAuth: true
    },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('../views/admin/basics/user/Index'),
        meta: {
          title: '用户管理',
          keepAlive: true,
          requireAuth: true
        },
        children: [
          {
            path: 'add',
            name: 'UserAdd',
            component: () => import('../views/admin/basics/user/Add'),
            meta: {
              title: '添加用户',
              attribute: 'add',
              keepAlive: true,
              requireAuth: true
            }
          },
          {
            path: 'edit',
            name: 'UserEdit',
            component: () => import('../views/admin/basics/user/Edit'),
            meta: {
              title: '编辑用户',
              attribute: 'edit',
              keepAlive: true,
              requireAuth: true
            }
          },
          {
            path: 'detail',
            name: 'UserDetail',
            component: () => import('../views/admin/basics/user/Detail'),
            meta: {
              title: '查看用户',
              attribute: 'see',
              keepAlive: true,
              requireAuth: true
            }
          }
        ]
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('../views/admin/basics/Role'),
        meta: {
          title: '角色管理',
          keepAlive: true,
          requireAuth: true
        }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('../views/admin/basics/Menu'),
        meta: {
          title: '菜单管理',
          keepAlive: true,
          requireAuth: true
        }
      },
      {
        path: 'agency',
        name: 'Agency',
        component: () => import('../views/admin/basics/Agency'),
        meta: {
          title: '机构管理',
          keepAlive: true,
          requireAuth: true
        }
      },
      {
        path: 'loginlog',
        name: 'LoginLog',
        component: () => import('../views/admin/basics/LoginLog'),
        meta: {
          title: '登录日志',
          keepAlive: true,
          requireAuth: true
        }
      },
      {
        path: 'operatelog',
        name: 'OperateLog',
        component: () => import('../views/admin/basics/OperateLog'),
        meta: {
          title: '操作日志',
          keepAlive: true,
          requireAuth: true
        }
      },
      {
        path: 'photosphere',
        name: 'PhotoSphere',
        component: () => import('../views/admin/basics/PhotoSphere'),
        meta: {
          title: '全景模拟VR',
          keepAlive: true,
          requireAuth: true
        }
      }
    ]
  },
  {
    path: 'form',
    name: 'Form',
    component: Admin,
    redirect: { name: 'baseform' },
    meta: {
      title: '表单页面',
      icon: 'profile',
      keepAlive: true,
      requireAuth: true
    },
    children: [
      {
        path: 'baseform',
        name: 'Baseform',
        component: () => import('../views/admin/form/BaseForm'),
        meta: {
          title: '基础菜单',
          keepAlive: true,
          requireAuth: true
        }
      },
      {
        path: 'base',
        name: 'Base',
        component: () => import('../views/admin/form/BaseForm'),
        meta: {
          title: '基础菜单2',
          keepAlive: true,
          requireAuth: true
        }
      }
    ]
  },
  {
    path: 'list',
    name: 'List',
    component: Admin,
    meta: {
      title: '列表页面',
      icon: 'table',
      keepAlive: true,
      requireAuth: true
    },
    children: [{
      path: 'listbase',
      name: 'ListBase',
      component: () => import('../views/admin/list/BaseList'),
      meta: {
        title: '基础列表',
        requireAuth: true,
        keepAlive: true
      }
    }]
  }
]

const setMenuTree = () => {
  console.log('更新菜单与路由')
  const menuList = [] // 动态路由生成菜单列表
  const authority = store.state.authority // 获取用户权限
  routeList.filter((item, index) => {
    const nameStr = item.name.toLowerCase()
    if (Object.keys(authority).includes(nameStr)) {
      menuList.push({
        title: item.meta.title,
        path: item.path,
        icon: item.meta.icon,
        children: handleChild(item.children, authority[nameStr], authority, nameStr)
      })
      dynamicArr.push({
        path: item.path,
        name: item.name,
        component: item.component,
        redirect: item.redirect || undefined,
        meta: item.meta,
        children: handleChildRoute(item.children, authority[nameStr])
      })
    }
  })

  // 添加动态路由
  for (let i = 0; i < dynamicArr.length; i++) {
    router.addRoute('Index', dynamicArr[i])
  }

  router.addRoute('Index', page404)
  // 更新后台操作菜单
  store.commit('$uStore', {
    name: 'vuex_menu.list',
    value: menuList
  })
}

const handleChild = (childArr, authObj, name) => {
  const menuArr = []
  for (let i = 0; i < childArr.length; i++) {
    const item = childArr[i]
    const nameStr = item.name.toLowerCase()
    if (Object.prototype.hasOwnProperty.call(authObj, nameStr)) {
      menuArr.push({
        title: item.meta.title,
        path: item.path
      })
    }
  }
  return menuArr
}

const handleChildRoute = (childArr, authObj) => {
  const routeArr = []
  for (let i = 0; i < childArr.length; i++) {
    const item = childArr[i]
    const nameStr = item.name.toLowerCase()
    if (Object.prototype.hasOwnProperty.call(authObj, nameStr)) {
      routeArr.push({
        path: item.path,
        name: item.name,
        component: item.component,
        meta: item.meta,
        children: handleRouteAuth(item.children, authObj[nameStr])
      })
    }
  }
  return routeArr
}

const handleRouteAuth = (arr, auth) => {
  let nArr = []
  if (arr !== undefined) {
    arr.filter((item) => {
      item.meta.auth = auth
    })
    nArr = arr
  }
  return nArr
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.setMenuTree = setMenuTree

export default router
