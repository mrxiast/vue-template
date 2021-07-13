const navList = [

  {
    title: "Dashboard",
    icon: "el-icon-menu",
    url: "/dashboard",
  },
  {
    title: "测试一",
    icon: "el-icon-menu",
    url: "/test1",
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