<template>
  <div id="container">
    <div id="managetable">
      <div id="userTable" class="panel">
        <el-row>
          <el-col :span="1">
            <img class="tag" src="../../src/assets/images/tag1.png" />
          </el-col>
          <el-col :span="12">
            <div class="title">用户管理</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <div id="userList">
          <el-table :data="tableData" style="width: 100%;">
            <!-- <el-table-column label="ID" width="50">
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
            </el-table-column>-->
            <el-table-column width="150" label="姓名" align="center">
              <template slot-scope="scope">
                <p>{{ scope.row.username }}</p>
              </template>
            </el-table-column>
            <el-table-column label="手机" align="center">
              <template slot-scope="scope">
                <p>{{ scope.row.phone }}</p>
              </template>
            </el-table-column>
            <el-table-column label="角色" align="center">
              <template slot-scope="scope">
                <el-select
                  v-model="tableData[scope.$index]['role']"
                  placeholder="请选择"
                  @change="handleEdit(scope.$index, scope.row)"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div id="opinions" class="panel">
        <el-row>
          <el-col :span="1">
            <img class="tag" src="../../src/assets/images/tag1.png" />
          </el-col>
          <el-col :span="12">
            <div class="title">意见反馈</div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <div id="cards">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>user</span>
            </div>
            <div class="text item">12344</div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>popo</span>
            </div>
            <div class="text item">5678fsfsdefsdfeeafeawefafawfawfwsfdsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss8</div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "../utils/bus";
export default {
  data() {
    return {
      tableData: [
        {
          id: "1",
          username: "admin",
          phone: "15121175350",
          role: "admin",
        },
      ],
      options: [
        { value: "user", label: "user" },
        { value: "admin", label: "admin" },
      ],
      roleTemp: "user",
    };
  },
  mounted() {
    this.getTableData();
    this.changeHeaderStatus();
  },
  methods: {
    handleEdit(index) {
      // console.log(index, row);
      this.$api.editUserRole({
        username: this.tableData[index]["username"],
        role: this.tableData[index]["role"],
      });
    },
    handleDelete(index) {
      // console.log(index);
      // console.log(row);
      // console.log(this.tableData[index]["username"])
      // console.log(JSON.parse(sessionStorage.getItem("username")))
      if (
        this.tableData[index]["username"] ===
        JSON.parse(sessionStorage.getItem("username"))
      ) {
        alert("无法删除");
      } else {
        this.$api
          .deleteUser({ username: this.tableData[index]["username"] })
          .then((res) => {
            console.log(res);
            this.tableData.splice(index, 1);
          });
      }
    },
    changeHeaderStatus: function () {
      bus.$emit("isShowStatus", false);
    },
    getTableData: function () {
      this.$api.getUser().then((res) => {
        let data = res.data.result;
        // console.log(data);
        this.tableData = data;
      });
    },
  },
};
</script>
<style scoped>
@import "../assets/style/manage.css";
@media (min-width: 800px) {
  .el-col-1 {
    width: 25px;
    padding: 2px 5px;
  }
  .el-row {
    padding: 0 20px;
  }
}
@media (min-width: 1280px) {
  .el-col-1 {
    width: 25px;
    padding: 2px 5px;
  }
  .el-row {
    padding: 0 20px;
  }
  .title {
    margin: 0px 10px;
  }
}
@media (min-width: 1600px) {
  .el-col-1 {
    width: 35px;
    padding: 2px 5px;
  }
  .el-row {
    padding: 10px 20px;
  }
}

@media (min-width: 1920px) {
  .el-col-1 {
    width: 50px;
    padding: 2px 5px;
  }
  .el-row {
    padding: 20px 20px;
  }
}
</style>

