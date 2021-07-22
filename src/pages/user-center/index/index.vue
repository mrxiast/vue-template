<template>
  <div class="container">
    <div>
      <el-menu
        @select="changePage"
        default-active="1"
        class="el-menu-vertical-demo"
      >
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">Chect my profile</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-document"></i>
          <span slot="title">Change login passwords</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    changePage(index) {
      if (index === "1") {
        this.$router.push("/user-center/check-my-profile");
      } else {
        this.$router.push("/user-center/change-login-passwords");
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>