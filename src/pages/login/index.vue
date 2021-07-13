<template>
  <div class="login_wrap">
    <div class="login">
      <div class="logo-box">
        <img src="../../../static/logo.png" alt="" />
      </div>
      <div class="title">Welcome to login Fortune Pay Portal</div>
      <div class="login-type-box">
        <div
          @click="changeLoginType('phone')"
          :class="loginType === 'phone' ? 'login-tabs is-select' : 'login-tabs'"
        >
          Login via Mobile number
        </div>
        <div
          @click="changeLoginType('email')"
          :class="loginType === 'email' ? 'login-tabs is-select' : 'login-tabs'"
        >
          Login via Email
        </div>
      </div>
      <div class="form-box">
        <div class="form-tip">Please enter your login credentials here:</div>
        <el-form
          :model="mobileForm"
          label-position="left"
          label-width="0px"
          :rules="mobileFormRules"
          ref="mobileLoginForm"
          size="medium"
          v-if="loginType === 'phone'"
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
          <el-form-item prop="mpassword" style="margin-top: 30px">
            <el-input
              maxlength="8"
              prefix-icon="el-icon-lock"
              v-model="mobileForm.mpassword"
              placeholder="Please enter your passwords"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-form
          :model="emailForm"
          label-position="left"
          label-width="0px"
          :rules="emailFormRules"
          ref="emailLoginForm"
          size="medium"
          v-if="loginType === 'email'"
        >
          <el-form-item prop="email">
            <el-input
              prefix-icon="el-icon-user"
              v-model="emailForm.email"
              placeholder="Please enter your e-mail address"
            ></el-input>
          </el-form-item>
          <el-form-item prop="epassword" style="margin-top: 30px">
            <el-input
              prefix-icon="el-icon-lock"
              v-model="emailForm.epassword"
              placeholder="Please enter your passwords"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="text-box">
          <span @click="goForget">Forget passwords</span>
        </div>
        <div class="btn-box">
          <el-button class="btn-style" type="primary" @click="clickLogin"
            >Sign in</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import encrypt from "@/utils/encrypt";
import { login } from "./api";
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
      loginType: "phone", //登陆类型
      mobileForm: {
        mobileNum: "",
        mpassword: "",
      },
      emailForm: {
        email: "",
        epassword: "",
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
        mpassword: [
          {
            required: true,
            message: "Please enter your passwords",
            trigger: "blur",
          },
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
        epassword: [
          {
            required: true,
            message: "Please enter your passwords",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    //选择登陆类型 1.电话 2.邮箱
    changeLoginType(type) {
      if (type === this.loginType) return;
      if (type === "email") {
        this.$refs.mobileLoginForm.resetFields();
      }
      if (type === "phone") {
        this.$refs.emailLoginForm.resetFields();
      }
      this.loginType = type;
    },
    //跳转忘记密码页面
    goForget() {
      this.$router.push("/forget-password");
    },
    async subLogin() {
      // let params = JSON.parse(JSON.stringify(this.mobileForm));
      // params.password = encrypt.Encrypt(params.password);
      // let data = await login();
      let data = {
        code: 200,
        token: "test",
      };
      if (data.code === 200) {
        let token = data.token;
        this.$store.commit("LOGIN_IN", token);
        this.$message.success("登陆成功");
        this.$router.replace("/home");
      }
    },
    clickLogin() {
      if (this.loginType === "phone") {
        this.$refs["mobileLoginForm"].validate((valid) => {
          if (valid) {
            this.subLogin();
          } else {
            return false;
          }
        });
      } else {
        this.$refs["emailLoginForm"].validate((valid) => {
          if (valid) {
            this.subLogin();
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

