import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    name: '首 页',
    hidden: true,
    children: [{
      path: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首 页' }
    }]
  },

  {
    path: '/gate',
    component: Layout,
    name: '门 禁',
    meta: {
      title: '门 禁',
      icon: 'gate'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/gate/menu1/index'), // Parent router-view
        meta: { title: '校 卫 处' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/gate/menu2/index'),
        meta: { title: '宿 管 楼' }
      },
      {
        path: 'menu3',
        component: () => import('@/views/gate/menu3/index'),
        meta: { title: '图 书 馆' }
      }
    ]
  },

  {
    path: '/consume',
    component: Layout,
    name: '消 费',
    meta: {
      title: '消 费',
      icon: 'consume'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/consume/menu1/index'), // Parent router-view
        meta: { title: '食 堂' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/consume/menu2/index'),
        meta: { title: '校 车' }
      },
      {
        path: 'menu3',
        component: () => import('@/views/consume/menu3/index'),
        meta: { title: '其 它' }
      }
    ]
  },

  {
    path: '/study',
    component: Layout,
    name: '学 习',
    meta: {
      title: '学 习',
      icon: 'study'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/study/menu1/index'), // Parent router-view
        meta: { title: '课 程' }
      },
      {
        path: 'menu2',
        component: () => import('@/views/study/menu2/index'),
        meta: { title: '书 籍' }
      },
      {
        path: 'menu3',
        component: () => import('@/views/study/menu3/index'),
        meta: { title: '竞 赛' }
      }
    ]
  },

  {
    path: '/sport',
    component: Layout,
    name: '运 动',
    meta: {
      title: '运 动',
      icon: 'sport'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/sport/menu1/index'), // Parent router-view
        meta: { title: '路 线' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
