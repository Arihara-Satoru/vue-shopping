import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/layoutIndex'
import Search from '@/views/search/searchIndex'
import Pay from '@/views/pay/payIndex'
import SearchList from '@/views/search/searchList'
import category from '@/views/layout/category'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/layout/home')
      },
      { path: '/category', component: category },
      { path: '/cart', component: () => import('@/views/layout/cart') },
      {
        path: '/user',
        component: () => import('@/views/layout/User')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/loginIndex')
  },
  {
    path: '/myorder',
    name: 'myorder',
    component: () => import('@/views/myorder/orderIndex')
  },
  {
    path: '/pay',
    name: 'pay',
    component: Pay
  },
  { path: '/prodetail', component: () => import('@/views/prodetail/prodetail') },
  { path: '/searchList', component: SearchList }

]

const router = new VueRouter({
  routes
})

const authorityUrl = [
  '/user',
  '/myorder',
  '/pay',
  '/login'
]

router.beforeEach((to, from, next) => {
  if (authorityUrl.includes(to.path)) {
    if (store.getters.getToken) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
