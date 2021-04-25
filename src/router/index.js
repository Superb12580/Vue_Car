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
  // 搜索
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search')
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
  // 文章详情
  {
    path: '/wzxq',
    name: 'wzxq',
    component: () => import('../views/news/wzxq')
  },
  // 文章列表
  {
    path: '/wzlb',
    name: 'wzlb',
    component: () => import('../views/news/wzlb')
  },
  // 发布文章
  {
    path: '/fbwz',
    name: 'fbwz',
    component: () => import('../views/news/fbwz')
  },
  // 发布文章
  {
    path: '/fbwz2',
    name: 'fbwz2',
    component: () => import('../views/news/fbwz2')
  },
  // 发布文章
  {
    path: '/fbwz3',
    name: 'fbwz3',
    component: () => import('../views/news/fbwz3')
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
  // 查看用户
  {
    path: '/ckyh',
    name: 'ckyh',
    component: () => import('../views/look/ckyh')
  },
  // 查看动态
  {
    path: '/ckdt',
    name: 'ckdt',
    component: () => import('../views/look/ckdt')
  },
  // 查看评论
  {
    path: '/ckpl',
    name: 'ckpl',
    component: () => import('../views/look/ckpl')
  },
  // 查看收藏
  {
    path: '/cksc',
    name: 'cksc',
    component: () => import('../views/look/cksc')
  },
  // 查看粉丝
  {
    path: '/ckfs',
    name: 'ckfs',
    component: () => import('../views/look/ckfs')
  },
  // 查看文章
  {
    path: '/ckwz',
    name: 'ckwz',
    component: () => import('../views/look/ckwz')
  },
  // 查看关注
  {
    path: '/ckgz',
    name: 'ckgz',
    component: () => import('../views/look/ckgz')
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
      // 我的文章
      {
        path: '/wdwz',
        name: 'wdwz',
        component: () => import('../views/center/wdwz')
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
  }
]

const router = new VueRouter({
  routes
})

export default router
