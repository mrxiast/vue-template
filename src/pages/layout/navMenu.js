const navList = [
  {
    title: "Dashboard",
    icon: "el-icon-menu",
    url: "/dashboard",
  },
  {
    title: "Transactions",
    icon: "el-icon-menu",
    url: "/transactions",
    children: [
      {
        title: 'E-Wallet',
        icon: 'el-icon-bank-card',
        url: '/transactions/e-wallet'
      },
      {
        title: 'Customer-OTC',
        icon: 'el-icon-bank-card',
        url: '/transactions/customer-otc'
      },
      {
        title: 'Direct-OTC',
        icon: 'el-icon-bank-card',
        url: '/transactions/direct-otc'
      },
      {
        title: 'Payments',
        icon: 'el-icon-bank-card',
        url: '/transactions/pay-ments'
      },
      {
        title: 'Netbanking',
        icon: 'el-icon-bank-card',
        url: '/transactions/netbanking'
      },
      {
        title: 'Prepaid Acct',
        icon: 'el-icon-bank-card',
        url: '/transactions/pre-paid'
      }
    ]
  },
  {
    title: "Customer",
    icon: "el-icon-menu",
    url: "/customer",
  }, {
    title: "Merchant",
    icon: "el-icon-menu",
    url: "/merchant",
  }, {
    title: "System",
    icon: "el-icon-menu",
    url: "/system",
    children: [
      {
        title: "Check my profile",
        icon: "el-icon-menu",
        url: "/system/check-my-profile",
      }, {
        title: "Change login passwords",
        icon: "el-icon-menu",
        url: "/system/change-login-passwords",
      },

    ]
  }, {
    title: "Service",
    icon: "el-icon-menu",
    url: "/service",
    children: [
      {
        title: "Message centre",
        icon: "el-icon-menu",
        url: "/service/message-centre",
      }, {
        title: "Agency service",
        icon: "el-icon-menu",
        url: "/service/agency-service",
      }, {
        title: "Payroll",
        icon: "el-icon-menu",
        url: "/service/payroll",
      },

    ]
  },
  {
    title: "User center",
    icon: "el-icon-menu",
    url: "/user-center",
  },
  {
    title: "测试二",
    icon: "el-icon-menu",
    url: "/test2",
    children: [
      {
        title: "测试2-1",
        icon: "el-icon-menu",
        url: "/test2-1",
      },
      {
        title: "测试2-2",
        icon: "el-icon-menu",
        url: "/test2-2",
      },
    ],
  },

]
export default navList