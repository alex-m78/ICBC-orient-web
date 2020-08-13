<template>
  <div id="login">
    <div class="middle">
      <el-form
        class="info front"
        ref="loginForm"
        :rules="account"
        :model="loginForm"
        label-position="right"
        label-width="auto"
        show-message
      >
        <div class="name">LOGIN</div>
        <div class="main">
          <div class="row">
            <p>Login with your account</p>
          </div>
          <el-form-item prop="username">
            <el-input
              placeholder="User Name"
              prefix-icon="el-icon-s-custom"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="password"
              prefix-icon="el-icon-lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <!-- <div class="row">
            <el-checkbox v-model="loginForm.checked">Remember Me</el-checkbox>
            <el-button id="forgetBtn" type="text">Forget password</el-button>
          </div> -->
          <el-form-item>
            <el-button id="loginBtn" class="center" @click="handleLogin">Login</el-button>
          </el-form-item>
          <div class="row">
            <p>
              if you do not have an account,
              <el-button type="text" @click="togglePanel">Sign up</el-button>
            </p>
          </div>
        </div>
      </el-form>
      <el-form
        class="info back"
        ref="signUpForm"
        :rules="signUp"
        :model="signUpForm"
        status-icon
        label-position="left"
        label-width="auto"
        show-message
      >
        <div class="name">SIGN UP</div>
        <div class="main">
          <el-form-item prop="username">
            <el-input v-model="signUpForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="tel">
            <el-input v-model="signUpForm.tel" prefix-icon="el-icon-phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="signUpForm.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkpass">
            <el-input
              v-model="signUpForm.checkpass"
              prefix-icon="el-icon-unlock"
              placeholder="请再次输入密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" id="signUpBtn"  @click="handleSignUp">Sign Up</el-button>
          </el-form-item>
          <div class="row">
            <p>
              if you already have an account,
              <el-button type="text" @click="togglePanel">Sign in</el-button>
            </p>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import { requestLogin } from '../api/api';
// import {Login} from '../requests/api'
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      // console.log(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.signUpForm.checkpass !== "") {
          this.$refs.signUpForm.validateField("checkpass");
        }
        callback();
      }
    };
    var isSame = (rule, value, callback) => {
      // console.log(value);
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.signUpForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      logining: false,
      loginForm: {
        username: "",
        password: "",
        // checked: false,
      },
      signUpForm: {
        username: "",
        tel: "",
        password: "",
        checkpass: "",
      },
      signUp: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        tel: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        password: [{ required:true,validator: validatePass, trigger: "blur" }],
        checkpass: [{required:true, validator: isSame, trigger: "blur" }],
      },
      account: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    handleLogin: async function () {
      // 验证是否为空
      let valid = await this.$refs.loginForm.validate();
      if (valid) {
        // 正在登录
        this.logining = true;
        let loginParams = {
          username: this.loginForm.username,
          password: this.loginForm.password,
        };
        // 调用axios登录接口
        await this.$api
          .Login(loginParams)
          .then((res) => {
            // debugger;
            // console.log(res);
            let { code, msg } = res.data;
            let headers = res.headers;
            let token = headers.token;
            let role = res.data.result
            if (code === "200") {
              // elementui中提示组件
              this.$message({
                type: "success",
                message: msg,
              });
              // 登陆成功，用户信息就保存在sessionStorage中
              sessionStorage.setItem("token", JSON.stringify(token));
              sessionStorage.setItem(
                "username",
                JSON.stringify(loginParams.username)
              );
              sessionStorage.setItem("role", JSON.stringify(role));
              this.$store.dispatch('generateRoutes',role)
              // 跳转到后台主页面
              this.$router.push({ path: "/" });
            } else {
              this.$message({
                type: "error",
                message: msg,
              });
            }
            
            // 根据角色生成导航
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // console.log("error submit!");
        return false;
      }
    },

    handleSignUp:async function(){
      // 验证是否为空
      let valid = await this.$refs.signUpForm.validate();
      if(valid){
        let signUpParams={
          username:this.signUpForm.username,
          phone:this.signUpForm.tel,
          password:this.signUpForm.password,
        }
        let res=await this.$api.signUp(signUpParams)
        let {msg,success}=res.data
        if(success){
          this.$message({
            message:"注册成功",
            type:'success'
            })
          this.togglePanel();
          this.$refs.signUpForm.resetFields()
        }else{
          this.$message({
            message:msg,
            type:'error'})
          this.$refs.signUpForm.resetFields()
        }
      }else{
        return false
      }
    },
    togglePanel: function () {
      $(".middle").toggleClass("middle-flip");
    },

  },
};
</script>

<style scoped>
@import "../assets/style/Login.css";
</style>
