<template>
  <div class="container">
    <div class="base-style">
      <div v-if="!codeIsOk">
        <div class="input-item">
          <div class="input-title">Please enter your current passwords:</div>
          <div>
            <el-input></el-input>
          </div>
        </div>
        <div class="input-item">
          <div class="input-title">
            Please enter OTP here:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Phone
            number:0999****55555
          </div>
          <div>
            <el-input
              ><template slot="append" class="right-btn">
                <el-button type="primary" :disabled="!canSend" @click="getCode">
                  {{ canSend ? "Sent OTP" : time + "s" }}
                </el-button>
              </template></el-input
            >
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" @click="testCode">Confirm</el-button>
        </div>
      </div>
      <div v-else>
        <!-- <div class="input-item">
          <div class="input-title">Please enter your new passwords here:</div>
          <div>
            <el-input></el-input>
          </div>
        </div>
        <div class="input-item">
          <div class="input-title">Please re-enter new passwords here:</div>
          <div>
            <el-input></el-input>
          </div>
        </div> -->
        <el-form
          :rules="passwordRule"
          :model="passwordForm"
          label-position="left"
          label-width="0px"
          ref="passwordForm"
          size="medium"
        >
          <el-form-item prop="password1">
            <el-input
              type="password"
              maxlength="8"
              v-model="passwordForm.password1"
              placeholder="Please enter your new passwords here:"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input
              type="password"
              maxlength="8"
              v-model="passwordForm.password2"
              placeholder="Please re-enter new passwords here:"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary" @click="confirm">Confirm</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter passwords"));
      } else {
        if (this.passwordForm.password1 !== "") {
          this.$refs.passwordForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter passwords"));
      } else if (value !== this.passwordForm.password1) {
        callback(new Error("Passwords entered not matched,please re-enter!"));
      } else {
        callback();
      }
    };
    return {
      time: 60,
      canSend: true,
      codeIsOk: false,
      passwordRule: {
        password1: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
      },
      passwordForm: {
        password1: "",
        password2: "",
      },
    };
  },
  methods: {
    //提交
    confirm() {
      this.$refs["passwordForm"].validate((valid) => {
        if (valid) {
          this.confirmLoading = true;
          this.$message.success("Password reset successfully");
          localStorage.clear();
          this.$store.commit("LOGIN_OUT");
          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        } else {
          return false;
        }
      });
    },
    testCode() {
      this.$message.error("OTP is not correct,please re-enter!");
      this.codeIsOk = true;
    },
    getCode() {
      console.log("1234");
      this.canSend = false;
      let timer = setInterval(() => {
        if (this.time <= 0) {
          this.canSend = true;
          this.time = 60;
          clearInterval(timer);
        }
        this.time--;
      }, 1000);
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>