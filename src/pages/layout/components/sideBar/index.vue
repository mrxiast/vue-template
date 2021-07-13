<template>
  <fragment>
    <template v-for="menu in navlist">
      <el-submenu
        v-if="menu.children && menu.children.length >= 1"
        :index="menu.url"
        :key="menu.url"
      >
        <template slot="title">
          <i :class="menu.icon"></i>
          <span slot="title">{{ menu.title }}</span>
        </template>
        <NavMenu :navlist="menu.children"></NavMenu>
      </el-submenu>
      <el-menu-item v-else :index="menu.url" :key="menu.url">
        <i :class="menu.icon"></i>
        <span slot="title">{{ menu.title }}</span>
      </el-menu-item>
    </template>
  </fragment>
</template>
 
<script>
export default {
  name: "NavMenu",
  props: ["navlist"],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>
<style lang='less' >
//如果没有此样式的话  折叠有子级菜单的父菜单文字是不会隐藏的
.own_nav {
  .el-menu--collapse .el-menu-item span,
  .el-menu--collapse .el-submenu .el-submenu__title span {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
}
.el-menu {
  border: none;
}
// .el-menu{
//   width: 200px;
//    .el-submenu__icon-arrow{
//     opacity: 1;
//   }
// }
// .el-menu--collapse{
//   width: 60px!important;
//   .el-submenu__icon-arrow{
//     opacity: 0;
//   }
// }
</style>