export default {
    name: "Login",
    data() {
      return {
        logining: false,
        loginForm: {
          username: "",
          password: ""
        },
  
        account: {
          username: [{ required: true, message: "请输入账号", trigger: "blur" }],
          password: [{ required: true, message: "请输入密码", trigger: "blur" }]
        },
        checked: true
      };
    },
    methods: {
      handleLogin: async function() {
        // 验证是否为空
        let valid = await this.$refs.loginForm.validate();
        if (valid) {
          // 正在登录
          this.logining = true;
          let loginParams = {
            username: this.loginForm.username,
            password: this.loginForm.password
          };
          // 调用axios登录接口
          await this.$api
            .Login(loginParams)
            .then(res => {
              // debugger;
              // console.log(res);
              let { code, msg } = res.data;
              let headers = res.headers
              let token = headers.token
              // console.log(token)
              if (code === '200') {
                // elementui中提示组件
                this.$message({
                  type: "success",
                  message: msg
                });
                // 登陆成功，用户信息就保存在sessionStorage中
                // console.log("success");
                sessionStorage.setItem("token", JSON.stringify(token));
                sessionStorage.setItem("username", JSON.stringify(loginParams.username));
                // console.log("letsgo");
                // 跳转到后台主页面
                this.$router.push({ path: "/" });
              } else {
                this.$message({
                  type: "error",
                  message: msg
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!");
          return false;
        }
      }
    }
  };