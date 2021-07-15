import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index';
import { clearHttpRequestingList } from '@/utils/cancelClear';

Vue.use(Router)
//修改相同地址router报错问题
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import("@/pages/login"),
      meta: {
        name: 'login'
      }
    },
    {
      path: '/forget-password',
      name: 'forget-password',
      component: () => import("@/pages/forget-password"),
      meta: {
        name: 'forget-password'
      }
    },
    {
      path: '/get-code',
      name: 'get-code',
      component: () => import("@/pages/getCode"),
      meta: {
        name: 'forget-password'
      }
    },
    {
      path: '/',
      name: 'layout',
      component: () => import('@/pages/layout'),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {
            name: '首页',
            requiresAuth: true
          },
          component: () => import("@/pages/dashboard")
        },
        // {
        //   path: '/transactions/e-wallet',
        //   name: 'E-Wallet',
        //   meta: {
        //     name: 'E-Wallet'
        //   },
        //   component: () => import("@/pages/transactions/e-wallet")
        // },
        {
          path: '/transactions/e-wallet',
          name: 'E-Wallet',
          meta: {
            name: 'E-Wallet'
          },
          component: () => import("@/pages/transactions/e-wallet")
        },
        {
          path: '/test2-1',
          name: 'test2',
          meta: {
            name: '测试2-1',
            requiresAuth: true
          },
          component: () => import("@/pages/test2/test2-1")
        },
        {
          path: '/test2-2',
          name: 'test2-2',
          meta: {
            name: '测试2-2',
            requiresAuth: true
          },
          component: () => import("@/pages/test2/test2-2")
        }
      ]
    },
    {
      path: '/403',
      component: () => import('@/pages/page403')
    },
    {
      path: '*',
      component: () => import('@/pages/page404')
    }
  ]
})
router.beforeEach((to, from, next) => {
  clearHttpRequestingList()
  if (!store.state.UserToken) {
    if (
      to.matched.length > 0 &&
      !to.matched.some(record => record.meta.requiresAuth)
    ) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    if (to.path !== '/login') {
      next()
    } else {

      next(from.fullPath)
    }
  }
  store.commit('SET_MENU_NAME', to.meta.name)

})

export default router

