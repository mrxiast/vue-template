<template>
  <div class="container">
    <div class="item-box">
      <div class="item-left">
        <div class="item-title">User type:</div>
        <div class="item-content">Internal user</div>
      </div>
      <div class="item-right" v-if="userType === 'merchant'">
        <span @click="goDetail">Check</span>
      </div>
    </div>
    <div class="item-box">
      <div class="item-title">User name:</div>
      <div class="item-content">Olivia Wang</div>
    </div>
    <div class="item-box">
      <div class="item-title">Phone number:</div>
      <div class="item-content">08955558881</div>
    </div>
    <div class="item-box">
      <div class="item-title">E-mail address:</div>
      <div class="item-content">123@163.com</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userType: "merchant",
    };
  },
  methods: {
    goDetail() {
      this.$router.push("/merchant-detail/12456");
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>