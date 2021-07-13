<template>
  <div class="login_wrap">
    <div class="login">
      <div class="logo-box">
        <img src="../../../static/logo.png" alt="" />
      </div>
      <div class="title">Find your passwords</div>

      <div class="form-box">
        <div class="form-tip">
          Select the way of finding back your passwords:
        </div>
        <div class="login-type-box">
          <div
            @click="changeLoginType('phone')"
            :class="
              loginType === 'phone' ? 'login-tabs is-select' : 'login-tabs'
            "
          >
            Login via Mobile number
          </div>
          <div
            @click="changeLoginType('email')"
            :class="
              loginType === 'email' ? 'login-tabs is-select' : 'login-tabs'
            "
          >
            Login via Email
          </div>
        </div>
        <el-form
          :rules="mobileFormRules"
          v-if="loginType === 'phone'"
          :model="mobileForm"
          label-position="left"
          label-width="0px"
          ref="mobileLoginForm"
          size="medium"
        >
          <el-form-item prop="mobileNum">
            <el-input
              maxlength="10"
              prefix-icon="el-icon-user"
              v-model.number="mobileForm.mobileNum"
              placeholder="Please enter your mobile number"
            >
              <template slot="prepend">+63</template></el-input
            >
          </el-form-item>
        </el-form>
        <el-form
          :rules="emailFormRules"
          v-if="loginType === 'email'"
          :model="emailForm"
          label-position="left"
          label-width="0px"
          ref="emailLoginForm"
          size="medium"
        >
          <el-form-item prop="email">
            <el-input
              prefix-icon="el-icon-user"
              v-model="emailForm.email"
              placeholder="Please enter your e-mail address"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="btn-box">
          <el-button class="btn-style" type="primary" @click="goNext"
            >next</el-button
          >
        </div>
      </div>
    </div>
    <div class="bottom-box">
      <p>
        Notice:If you have lost your mobile number or e-mail address,please
        contact our customer service by providing your identity certifications
      </p>
      <p>Call us at: 098373733</p>
      <p>E-mail us at Service@Fortunepay.com</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var mobileLength = (rule, value, callback) => {
      let str = value.toString();
      if (str.length != 10) {
        callback(new Error("Please enter correct mobile number"));
      } else {
        callback();
      }
    };
    return {
      loginType: "phone",
      mobileForm: {
        mobileNum: "",
      },
      emailForm: {
        email: "",
      },
      mobileFormRules: {
        mobileNum: [
          {
            required: true,
            message: "Please enter your mobile number",
            trigger: ["blur", "change"],
          },
          {
            type: "number",
            message: "Please enter correct mobile number",
            trigger: ["blur", "change"],
          },
          { validator: mobileLength, trigger: "blur" },
        ],
      },
      emailFormRules: {
        email: [
          {
            required: true,
            message: "Please enter your e-mail address",
            trigger: ["blur", "change"],
          },
          {
            type: "email",
            message: "Please enter correct e-mail address",
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    //选择不同的账号类型
    changeLoginType(type) {
      if (type === this.loginType) return;
      if (type === "email") {
        this.$refs.mobileLoginForm.resetFields();
      }
      if (type === "phone") {
        this.$refs.emailLoginForm.resetFields();
      }
      this.loginType = type;
      this.loginType = type;
    },
    goNext() {
      if (this.loginType === "phone") {
        this.$refs["mobileLoginForm"].validate((valid) => {
          if (valid) {
            console.log(this.mobileForm, "1");
            this.$router.push("/get-code");
          } else {
            return false;
          }
        });
      } else {
        this.$refs["emailLoginForm"].validate((valid) => {
          if (valid) {
            console.log(this.emailForm, "2");
            this.$router.push("/get-code");
          } else {
            return false;
          }
        });
      }
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

