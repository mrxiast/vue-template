<template>
  <div class="containers">
    <div :class="isCollapse ? 'left-box text-algin' : 'left-box'">
      <div class="title-box" v-if="!isCollapse">
        <i>Fortune Pay</i>
      </div>
      <img v-if="isCollapse" class="logo-box" src="@/static/logo.png" alt="" />

      <el-menu
        :default-active="routerIndex"
        class="el-menu-vertical-demo"
        @select="selectMenu"
        :collapse="isCollapse"
      >
        <SlideBar :navlist="navlist"></SlideBar>
      </el-menu>
    </div>
    <div class="right-box">
      <div class="top-box">
        <div class="top-box-left" @click="isCollapse = !isCollapse">
          <i class="el-icon-s-fold" v-if="!isCollapse"></i>
          <i class="el-icon-s-unfold" v-else></i>
        </div>
        <div class="top-box-right">
          <div class="user-box">
            <img src="@/static/logo.png" alt="" />
            <div @click="goCenter">
              <span
                class="el-dropdown-link"
                style="color: #fff; cursor: pointer; font-size: 16px"
              >
                Olivia<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
            </div>
          </div>
          <div class="logout-box" @click="layout">
            <img class="logout-img" src="@/static/icon/out.png" alt="" />
            <span>Logout</span>
          </div>
        </div>

        <!-- {{ menuName }} -->
      </div>
      <div class="content-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SlideBar from "./components/sideBar";
import navlist from "./navMenu";
import { mapState } from "vuex";
export default {
  components: { SlideBar },
  data() {
    return {
      routerName: "home",
      navlist: navlist,
      isCollapse: false,
    };
  },
  computed: {
    ...mapState(["routerIndex", "menuName"]),
  },
  methods: {
    goCenter() {
      this.$router.push("/user-center");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    selectMenu(v, e) {
      this.$store.commit("SET_ROUTER_INDEX", v);
      this.$router.push(v);
    },
    layout() {
      this.$confirm("此操作将退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.clear();
          this.$store.commit("LOGIN_OUT");
          this.$message({
            type: "success",
            message: "退出成功!",
          });
          this.$router.replace("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 280px;
  min-height: 100%;
}
.el-menu--collapse {
  width: 70px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.module-box {
  .el-dialog {
    width: 1200px;
    background-color: #f5f5f5;
  }
}
.module600 {
  .el-dialog {
    width: 600px;
    background-color: #f5f5f5;
  }
}
</style>