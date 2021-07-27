<template>
  <div class="container">
    <div class="top-box">
      <div class="top-inner">
        <div class="top-item">
          <div class="top-item-title">Select a role to cash in for</div>
          <div class="top-item-select">
            <div
              :class="roleType === 1 ? 'select-box is-active' : 'select-box'"
              @click="changeRoleType(1)"
            >
              Merchant
            </div>
            <div
              :class="roleType === 2 ? 'select-box is-active' : 'select-box'"
              @click="changeRoleType(2)"
            >
              Partner
            </div>
          </div>
        </div>
        <div class="top-item">
          <div class="top-item-title">Select a role to cash in for</div>
          <div class="top-item-select">
            <div
              :class="poolType === 1 ? 'select-box is-active' : 'select-box'"
              @click="changePollType(1)"
            >
              Waller balance
            </div>
            <div
              :class="poolType === 2 ? 'select-box is-active' : 'select-box'"
              @click="changePollType(2)"
            >
              Pre-deposit balance
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <div class="bottom-title">Please enter mobile number</div>
      <div class="bottom-input">
        <el-input v-model="mobileNumber"></el-input>
      </div>
      <div class="bottom-title">Please enter cash out amount</div>
      <div class="bottom-input">
        <el-input v-model="amount"></el-input>
      </div>
      <div class="bottom-title">Please upload cash out receipt</div>
      <div>
        <el-upload
          ref="upload"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
    </div>
    <div class="center-btn">
      <el-button type="primary" @click="confirm" :loading="loading"
        >Confirm</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleType: 1,
      poolType: 1,
      mobileNumber: "",
      amount: "",
      loading: false,
    };
  },
  methods: {
    //图片上传开始
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //图片上传结束
    changeRoleType(num) {
      this.roleType = num;
    },
    changePollType(num) {
      this.poolType = num;
    },
    confirm() {
      this.resetForm();
      this.$message.success("Successfly!");
    },
    resetForm() {
      this.roleType = 1;
      this.poolType = 1;
      this.mobileNumber = "";
      this.amount = "";
      this.$refs.upload.clearFiles();
    },
  },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>