<template>
  <div class="container">
    <div :class="isCollapse ? 'left-box text-algin' : 'left-box'">
      <transition name="fade" mode="out-in">
        <div class="title-box" v-if="!isCollapse">
          <i>Fortune Pay</i>
        </div>
        <img
          v-if="isCollapse"
          class="logo-box"
          src="@/static/logo.png"
          alt=""
        />
      </transition>
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
          <transition name="fade" mode="out-in">
            <i class="el-icon-s-fold" v-if="!isCollapse"></i>
            <i class="el-icon-s-unfold" v-else></i>
          </transition>
        </div>
        <div class="top-box-right">
          <div class="user-box">
            <img src="@/static/logo.png" alt="" />
            <el-dropdown trigger="click">
              <span
                class="el-dropdown-link"
                style="color: #fff; cursor: pointer; font-size: 16px"
              >
                Olivia<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="logout-box">
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
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>