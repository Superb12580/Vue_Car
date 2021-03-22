import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 首页
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home')
  },
  // 选车
  {
    path: '/xc',
    name: 'xc',
    component: () => import('../views/xc')
  },
  // 排行
  {
    path: '/ph',
    name: 'ph',
    component: () => import('../views/ph')
  },
  // 车友圈
  {
    path: '/cyq',
    name: 'cyq',
    component: () => import('../views/cyq')
  },
  // 头部
  {
    path: '/header',
    name: 'header',
    component: () => import('../components/header')
  },
  // 发表动态
  {
    path: '/fbdt',
    name: 'fbdt',
    component: () => import('../views/center/fbdt')
  },
  // 动态详情
  {
    path: '/dtxq',
    name: 'dtxq',
    component: () => import('../views/center/dtxq')
  },
  // 个人中心
  {
    path: '/center',
    name: 'center',
    component: () => import('../views/center/center'),
    children: [
      // 个人资料
      {
        path: '/grzl',
        name: 'grzl',
        component: () => import('../views/center/grzl')
      },
      // 我的动态
      {
        path: '/wddt',
        name: 'wddt',
        component: () => import('../views/center/wddt')
      },
      // 我的转发
      {
        path: '/wdzf',
        name: 'wdzf',
        component: () => import('../views/center/wdzf')
      },
      // 我的粉丝
      {
        path: '/wdfs',
        name: 'wdfs',
        component: () => import('../views/center/wdfs')
      },
      {
        path: '/xgmm',
        name: 'xgmm',
        component: () => import('../views/center/xgmm')
      },
      {
        path: '/wdpl',
        name: 'wdpl',
        component: () => import('../views/center/wdpl')
      },
      // 我的收藏
      {
        path: '/wdsc',
        name: 'wdsc',
        component: () => import('../views/center/wdsc')
      },
      // 我的关注
      {
        path: '/wdgz',
        name: 'wdgz',
        component: () => import('../views/center/wdgz')
      },
      // 我的消息
      {
        path: '/wdxx',
        name: 'wdxx',
        component: () => import('../views/center/wdxx')
      }
    ]
  },
  // 登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login')
  },
  // 注册
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/login/register')
  },
  // 注册
  {
    path: '/register2',
    name: 'register2',
    component: () => import('../views/login/register2')
  },
  // 修改资料
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/edit')
  }
]

const router = new VueRouter({
  routes
})

export default router
