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
        {
          path: '/transactions/e-wallet',
          name: 'E-Wallet',
          meta: {
            name: 'E-Wallet'
          },
          component: () => import("@/pages/transactions/e-wallet")
        },
        {
          path: '/transactions/customer-otc',
          name: 'Customer-OTC',
          meta: {
            name: 'Customer-OTC'
          },
          component: () => import("@/pages/transactions/customer-otc")
        },
        {
          path: '/transactions/direct-otc',
          name: 'Direct-OTC',
          meta: {
            name: 'Direct-OTC'
          },
          component: () => import("@/pages/transactions/direct-otc")
        }, {
          path: '/transactions/pay-ments',
          name: 'Payments',
          meta: {
            name: 'Payments'
          },
          component: () => import("@/pages/transactions/pay-ments")
        }, {
          path: '/transactions/netbanking',
          name: 'Netbanking',
          meta: {
            name: 'Netbanking'
          },
          component: () => import("@/pages/transactions/netbanking")
        }, {
          path: '/transactions/pre-paid',
          name: 'Prepaid Acct',
          meta: {
            name: 'Prepaid Acct'
          },
          component: () => import("@/pages/transactions/pre-paid")
        }, {
          path: '/customer',
          name: 'Customer',
          meta: {
            name: 'Customer'
          },
          component: () => import("@/pages/customer")
        },
        {
          path: '/customer-detail/:id',
          name: 'Customer',
          meta: {
            name: 'Customer'
          },
          component: () => import("@/pages/customer/detail")
        }, {
          path: '/merchant',
          name: 'Merchant',
          meta: {
            name: 'Merchant'
          },
          component: () => import("@/pages/merchant")
        }, {
          path: '/merchant-detail/:id',
          name: 'Merchant Detail',
          meta: {
            name: 'Merchant Detail'
          },
          component: () => import("@/pages/merchant/merchant-detail")
        }, {
          path: '/branch-detail/:id',
          name: 'Brahch Detail',
          meta: {
            name: 'Brahch Detail'
          },
          component: () => import("@/pages/merchant/branch-detail")
        }, {
          path: '/partner',
          name: 'Partner',
          meta: {
            name: 'Partner'
          },
          component: () => import("@/pages/partner/index")
        }, {
          path: '/partner-detail/:id',
          name: 'Partner Detail',
          meta: {
            name: 'Partner Detail'
          },
          component: () => import("@/pages/partner/partner-detail")
        },
        {
          path: '/user-center',
          name: 'user-center',
          meta: {
            name: 'user-center'
          },
          component: () => import("@/pages/user-center/index"),
          redirect: '/user-center/check-my-profile',
          children: [{
            path: '/user-center/change-login-passwords',
            name: 'Change login passwords',
            meta: {
              name: 'Change login passwords'
            },
            component: () => import("@/pages/user-center/change-login")
          },
          {
            path: '/user-center/check-my-profile',
            name: 'Check my profile',
            meta: {
              name: 'Merchant'
            },
            component: () => import("@/pages/user-center/check-my-profile")
          }]
        }, {
          path: '/service/message-centre',
          name: 'Message centre',
          meta: {
            name: 'Message centre'
          },
          component: () => import("@/pages/service/message-centre")
        }, {
          path: '/service/agency-service',
          name: 'Agency service',
          meta: {
            name: 'Agency service'
          },
          component: () => import("@/pages/service/agency-service")
        }, {
          path: '/service/payroll',
          name: 'Payroll',
          meta: {
            name: 'Payroll'
          },
          component: () => import("@/pages/service/payroll")
        }, {
          path: '/marketing/ang-pao',
          name: 'Ang Pao',
          meta: {
            name: 'Ang Pao'
          },
          component: () => import("@/pages/marketing/ang-pao")
        }, {
          path: '/marketing/cockfight',
          name: 'Cockfight',
          meta: {
            name: 'Cockfight'
          },
          component: () => import("@/pages/marketing/cockfight")
        }, {
          path: '/marketing/fortune-wheel',
          name: 'Fortune Wheel',
          meta: {
            name: 'Fortune Wheel'
          },
          component: () => import("@/pages/marketing/fortune-wheel")
        },
        {
          path: '/finance/cash-in',
          name: 'Cash in',
          meta: {
            name: 'Cash in'
          },
          component: () => import("@/pages/finance/cash-in")
        }, {
          path: '/finance/cash-out',
          name: 'Cash out',
          meta: {
            name: 'Cash out'
          },
          component: () => import("@/pages/finance/cash-out")
        }, {
          path: '/finance/finance-report',
          name: 'Finance report',
          meta: {
            name: 'Finance report'
          },
          component: () => import("@/pages/finance/finance-report")
        }, {
          path: '/system/logos',
          name: 'Logos management',
          meta: {
            name: 'Logos management'
          },
          component: () => import("@/pages/system/logos")
        }, {
          path: '/system/role-management',
          name: 'Portal role management',
          meta: {
            name: 'Portal role management'
          },
          component: () => import("@/pages/system/management/role-management")
        }, {
          path: '/system/user-management',
          name: 'Portal user management',
          meta: {
            name: 'Portal user management'
          },
          component: () => import("@/pages/system/management/user-management")
        }, {
          path: '/system/configuration/mrd',
          name: 'Configuration',
          meta: {
            name: 'Configuration'
          },
          component: () => import("@/pages/system/configuration/mrd")
        }, {
          path: '/system/configuration/commission',
          name: 'Commission',
          meta: {
            name: 'Commission'
          },
          component: () => import("@/pages/system/configuration/commission")
        }, {
          path: '/system/configuration/service-charge',
          name: 'Service charge',
          meta: {
            name: 'Service charge'
          },
          component: () => import("@/pages/system/configuration/service-charge")
        }, {
          path: '/system/configuration/transaction-limits',
          name: 'Transaction limits',
          meta: {
            name: 'Transaction limits'
          },
          component: () => import("@/pages/system/configuration/transaction-limits")
        }, {
          path: '/system/message-center',
          name: 'Message center',
          meta: {
            name: 'Message center'
          },
          component: () => import("@/pages/system/message-center")
        }, {
          path: '/system/approval-center/customer-kyc',
          name: 'Customer KYC',
          meta: {
            name: 'Customer KYC'
          },
          component: () => import("@/pages/system/approval-center/customer-kyc")
        },
        {
          path: '/system/approval-center/merchant-cash-in',
          name: 'Merchant cash in',
          meta: {
            name: 'Merchant cash in'
          },
          component: () => import("@/pages/system/approval-center/merchant-cash-in")
        },
        {
          path: '/system/approval-center/merchant-cash-out',
          name: 'Merchant cash out',
          meta: {
            name: 'Merchant cash out'
          },
          component: () => import("@/pages/system/approval-center/merchant-cash-out")
        },
        {
          path: '/system/approval-center/merchant-approval',
          name: 'Merchant approval',
          meta: {
            name: 'Merchant approval'
          },
          component: () => import("@/pages/system/approval-center/merchant-approval")
        },
        {
          path: '/system/approval-center/branch-approval',
          name: 'Branch approval',
          meta: {
            name: 'Branch approval'
          },
          component: () => import("@/pages/system/approval-center/branch-approval")
        },
        {
          path: '/system/approval-center/partner-approval',
          name: 'Partner approval',
          meta: {
            name: 'Partner approval'
          },
          component: () => import("@/pages/system/approval-center/partner-approval")
        },
        {
          path: '/system/approval-center/ctbc-approval',
          name: 'CTBC approval',
          meta: {
            name: 'CTBC approval'
          },
          component: () => import("@/pages/system/approval-center/ctbc-approval")
        },
        {
          path: '/system/approval-center/ctbc-approval/application/:id',
          name: 'Application form',
          meta: {
            name: 'Application form'
          },
          component: () => import("@/pages/system/approval-center/ctbc-approval/application")
        }, {
          path: '/system/approval-center/ctbc-approval/activate/:id',
          name: 'Activate form',
          meta: {
            name: 'Activate form'
          },
          component: () => import("@/pages/system/approval-center/ctbc-approval/activate")
        }, {
          path: '/system/biller-management',
          name: 'Biller management',
          meta: {
            name: 'Biller management'
          },
          component: () => import("@/pages/system/biller-management")
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

