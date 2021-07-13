<template>
  <div class="login_wrap">
    <div class="login">
      <div class="logo-box">
        <img src="../../../static/logo.png" alt="" />
      </div>
      <div class="title">Find your passwords</div>

      <div class="form-box" v-if="!isOTP">
        <div class="form-tip">Please enter OTP here:</div>
        <el-form
          :rules="rules"
          :model="forms"
          label-position="left"
          label-width="0px"
          ref="forms"
          size="medium"
        >
          <el-form-item prop="code">
            <el-input
              maxlength="6"
              prefix-icon="el-icon-user"
              v-model.number="forms.code"
              placeholder="Please enter OTP sent to our mobile/e-mail"
            >
              <template slot="append">
                <div
                  v-if="times > 0"
                  style="
                    width: 40px;
                    height: 78px;
                    line-height: 80px;
                    text-align: center;
                  "
                >
                  {{ times + "s" }}
                </div>
                <div
                  @click="again"
                  v-else
                  style="
                    width: 40px;
                    height: 78px;
                    line-height: 80px;
                    text-align: center;
                    cursor: pointer;
                  "
                >
                  Again
                </div>
              </template></el-input
            >
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button class="btn-style" type="primary" @click="goNext"
            >next</el-button
          >
        </div>
      </div>
      <div class="form-box" v-else>
        <div class="form-tip">Please reset your passwords</div>
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
              placeholder="Please enter passwords here"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input
              type="password"
              maxlength="8"
              v-model="passwordForm.password2"
              placeholder="Please enter passwords here"
            ></el-input>
          </el-form-item>
        </el-form>

        <div class="ok-bottom-box">
          <p class="ok-bottom-title">Passwords requirements:</p>
          <p class="ok-bottom-content">
            Must be 8 characters it at lest contains two character style of
            upper-case letters,lower-caseletters,digits,special symbols
          </p>
        </div>
        <div class="btn-box">
          <el-button
            class="btn-style"
            type="primary"
            @click="confirm"
            :loading="confirmLoading"
            >Confirm</el-button
          >
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <div v-if="!isOTP">
        <p>
          Notice:If you have lost your mobile number or e-mail address,please
          contact our customer service by providing your identity certifications
        </p>
        <p>Call us at: 098373733</p>
        <p>E-mail us at Service@Fortunepay.com</p>
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
    var mobileLength = (rule, value, callback) => {
      let str = value.toString();
      if (str.length != 6) {
        callback(new Error("Please enter correct OTP"));
      } else {
        callback();
      }
    };
    return {
      //验证验证码是否正确
      isOTP: true,
      confirmLoading: false, //提交loading
      times: 30,
      forms: {
        code: "",
      },
      passwordForm: {
        password1: "",
        password2: "",
      },
      rules: {
        code: [
          {
            required: true,
            message: "Please enter your OTP",
            trigger: ["blur", "change"],
          },
          {
            type: "number",
            message: "Please enter correct OTP",
            trigger: ["blur", "change"],
          },
          { validator: mobileLength, trigger: "blur" },
        ],
      },
      passwordRule: {
        password1: [{ validator: validatePass, trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  created() {
    this.countDown();
  },
  methods: {
    //倒计时
    countDown() {
      let timer = setInterval(() => {
        if (this.times <= 0) {
          clearInterval(timer);
        }
        this.times--;
      }, 1000);
    },
    //重新发送
    again() {
      this.times = 30;
      this.countDown();
    },
    //提交
    confirm() {
      this.$refs["passwordForm"].validate((valid) => {
        if (valid) {
          this.confirmLoading = true;
          this.$message.success("Password reset successfully");
        } else {
          return false;
        }
      });
    },
    //
    goNext() {
      this.$refs["forms"].validate((valid) => {
        if (valid) {
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang='less'>
@import "./index.less";
</style>
<style lang='less'>
.form-box {
  .el-input--medium .el-input__inner {
    height: 80px;
  }
}
</style>

