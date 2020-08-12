<template>
  <div id="headbar">
    <el-row style="display:flex;justify-content:flex-end">
<!--      <el-col :span="10">-->
<!--        <el-input placeholder="请输入内容" v-model="input" class="input-with-select" >-->
<!--          <el-button slot="append" icon="el-icon-search" @click="gogogo"></el-button>-->
<!--        </el-input>-->
<!--      </el-col>-->
<!--      <el-col :span="2" :offset="9">-->
<!--      <el-badge :value="3" class="news"></el-badge>-->
<!--          <el-avatar src=".../../src/assets/images/photo.png"></el-avatar>-->
<!--      </el-col>-->
      <el-col style="width:80px">
        <el-dropdown @command="Logout">
          <span class="el-dropdown-link">{{username}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">Feedback</el-dropdown-item>
<!--            <el-dropdown-item command="b">Blog Posts</el-dropdown-item>-->
            <el-dropdown-item divided command="c">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="10" id="page-title" v-show="isShow">
            <h1><span>2020第二季度预测概率前五新进重仓股股价</span></h1>
      </el-col>
<!--     <el-col :span="6" :offset="7" id="page-dashboard">-->
<!--       <el-link :underline="false">Dashboard</el-link>-->
<!--     </el-col>-->
    </el-row>
  </div>
</template>

<script>
  import bus from "../../utils/bus"
export default {
  name: "headbar",
  data() {
    return {
      isShow: true,
      input: '',
      select: '',
      username: '',
      feedback:''
      }
    },
  mounted(){
    this.username = JSON.parse(sessionStorage.getItem("username"))
  },
  created(){
    bus.$on("isShowStatus", isShowStatus => {
      this.isShow = isShowStatus
    })
  },
  methods: {
    gogogo: function () {
      this.$router.push({ path: "/manage" })
    },
    Logout: function (command) {
      // console.log(command)
      if (command === "c"){
        sessionStorage.clear()
        // 跳转到登录页
        location.reload();
        // this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }
      if (command === "a"){
          this.$prompt('请输入您的意见', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[\u4E00-\u9FA5]+$/,
            inputErrorMessage: '意见只能是中文'
          }).then(({ value }) => {
            this.$message({
              type: 'success',
              message: '您的意见是: ' + value
            });
            // console.log(value)
            this.feedback = value
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
          this.$api.feedBack({msg:this.feedback})
              .then((res) =>{
                console.log(res)
              })
      }
    }
  }
};
</script>
<style scoped>
#headbar{
    height: 50px;
    background-color: #fff;
    margin-bottom: 30px;
    border-bottom: 1px solid #ccc;
}
#logo {
    height: 50px;
}
.el-select .el-input {
  width: 130px;
}
.input-with-select {
  background-color: #fff;
}
.el-row{
  margin: 0 !important;
  height: 30px;
  line-height: 30px;
  /* padding: 0; */
}
.el-col{
  height: 100% !important;
}
.el-avatar{
  position: absolute;
  margin: 5px 0;

}

#page-title h1 {
  margin-bottom: 50px;
  margin-left: 13px;
  font-size: 18px;
  padding: 14px 0;
  color: #909399;
}
#page-title h1 span {
  font-size: 14px;
  color: #909399;
}
#page-dashboard {
  margin-top: 18px;
  font-size: 14px;
  color: #909399;
  background: transparent;
  float: right;
}

.news{
  left: 50px;
  bottom: 10px;
  z-index: 1;
}

/*#headbar .breadcrumb li a {*/
/*  font-size: 14px;*/
/*  font-family: 'Roboto', sans-serif;*/
/*  display: block;*/
/*}*/

#headbar .el-col-2{
    width:90px;
}
</style>