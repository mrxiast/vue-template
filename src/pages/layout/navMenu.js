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
        title: "Portal user management",
        icon: "el-icon-menu",
        url: "/system/management",
        children: [
          {
            title: "Portal role mangement",
            icon: "el-icon-menu",
            url: "/system/role-management",
          },
          {
            title: "Portal user mangement",
            icon: "el-icon-menu",
            url: "/system/user-management",
          }
        ],
      }, {
        title: "Configuration",
        icon: "el-icon-menu",
        url: "/system/configuration",
        children: [
          {
            title: "MDR",
            icon: "el-icon-menu",
            url: "/system/configuration/mrd",
          }, {
            title: "Commission",
            icon: "el-icon-menu",
            url: "/system/configuration/commission",
          }, {
            title: "Service charge",
            icon: "el-icon-menu",
            url: "/system/configuration/service-charge",
          }, {
            title: "Transaction limits",
            icon: "el-icon-menu",
            url: "/system/configuration/transaction-limits",
          },

        ]
      }, {
        title: "Approval center",
        icon: "el-icon-menu",
        url: "/system/approval-center",
        children: [
          {
            title: "Customer KYC",
            icon: "el-icon-menu",
            url: "/system/approval-center/customer-kyc",
          }, {
            title: "Merchant cash in",
            icon: "el-icon-menu",
            url: "/system/approval-center/merchant-cash-in",
          }, {
            title: "Merchant cash out",
            icon: "el-icon-menu",
            url: "/system/approval-center/merchant-cash-out",
          }, {
            title: "Merchant approval",
            icon: "el-icon-menu",
            url: "/system/approval-center/merchant-approval",
          }, {
            title: "Branch approval",
            icon: "el-icon-menu",
            url: "/system/approval-center/branch-approval",
          }, {
            title: "Partner approval",
            icon: "el-icon-menu",
            url: "/system/approval-center/partner-approval",
          }, {
            title: "CTBC approval",
            icon: "el-icon-menu",
            url: "/system/approval-center/ctbc-approval",
          },


        ]
      }, {
        title: "Message center",
        icon: "el-icon-menu",
        url: "/system/message-center",
      }, {
        title: "Biller management",
        icon: "el-icon-menu",
        url: "/system/biller-management",
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
  }, {
    title: "Marketing",
    icon: "el-icon-menu",
    url: "/marketing",
    children: [
      {
        title: "Ang Pao",
        icon: "el-icon-menu",
        url: "/marketing/ang-pao",
      }, {
        title: "Cockfight",
        icon: "el-icon-menu",
        url: "/marketing/cockfight",
      }, {
        title: "Fortune Wheel",
        icon: "el-icon-menu",
        url: "/marketing/fortune-wheel",
      },

    ]
  }, {
    title: "Finance",
    icon: "el-icon-menu",
    url: "/finance",
    children: [
      {
        title: "Cash in",
        icon: "el-icon-menu",
        url: "/finance/cash-in",
      }, {
        title: "Cash out",
        icon: "el-icon-menu",
        url: "/finance/cash-out",
      }, {
        title: "Finance report",
        icon: "el-icon-menu",
        url: "/finance/finance-report",
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