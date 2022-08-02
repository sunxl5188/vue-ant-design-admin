import Vue from 'vue'
import Router from 'vue-router'
import Home from '@#/Home'
import List from '@#/List'
import Draggable from '@#/Draggable'
import Upload from '@#/Upload'
import Calendar from '@#/Calendar'
import Calendar2 from '@#/Calendar2'
import Error from '@#/Error'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Home', component: Home, meta: {title: '首页', requiresAuth: false}},
    {path: '/List', name: 'List', component: List, meta: {title: '列表', requiresAuth: false}},
    {path: '/draggable', name: 'draggable', component: Draggable, meta: {title: '托拽', requiresAuth: false}},
    {path: '/upload', name: 'upload', component: Upload, meta: {title: '上传', requiresAuth: false}},
    {path: '/calendar', name: 'calendar', component: Calendar, meta: {title: '日历', requiresAuth: false}},
    {path: '/calendar2', name: 'calendar2', component: Calendar2, meta: {title: '日历2', requiresAuth: false}},
    {path: '/mobileswiper', name: 'mobileswiper', component: resolve => require(['@#/MobileSwiper'], resolve), meta: {title: '---', requiresAuth: false}},
    {path: '/notebook', name: 'notebook', component: resolve => require(['@#/Notebook'], resolve), meta: {title: '----', requiresAuth: false}},
    {
      path: '/download-pdf',
      name: 'DownloadPdf',
      component: () => import('@#/DownloadPdf.vue'),
      meta: {
        title: 'html转pdf下载',
        requiresAuth: false
      }
    },
    {
      path: '/mobileSelect',
      name: 'mobileSelect',
      component: () => import('@#/MobileSelect.vue'),
      meta: {
        title: 'mobileSelect',
        requiresAuth: false
      }
    },
    {
      path: '/KindEditor',
      name: 'KindEditor',
      component: () => import('@#/shared/KindEditor.vue'),
      meta: {
        title: 'KindEditor',
        requiresAuth: false
      }
    },
    {path: '*', name: 'Error', component: Error}
  ]
})
