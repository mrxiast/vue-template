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
      }
    ]
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