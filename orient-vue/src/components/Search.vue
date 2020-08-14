<template>
  <div id="container">
    <div id="search">
      <el-row>
        <el-col :span="4">
          <el-input placeholder="请输入股票名称" v-model="input" class="input-with-select" >
            <el-button slot="append" icon="el-icon-search" @click="gogogo"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <div id="search_top" class="panel">
        <el-row>
          <el-col :span="1.5">查询年份：</el-col>
          <el-col :span="15">
            <el-radio-group v-model="year" @change="changeYear">
              <el-radio-button label="2020年"></el-radio-button>
              <el-radio-button label="2019年"></el-radio-button>
              <el-radio-button label="2018年"></el-radio-button>
              <el-radio-button label="2017年"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="1.5">查询季度：</el-col>
          <el-col :span="15">
            <el-radio-group v-model="quarter" @change="changeQuarter">
              <el-radio-button label="第一季度"></el-radio-button>
              <el-radio-button label="第二季度"></el-radio-button>
              <el-radio-button label="第三季度"></el-radio-button>
              <el-radio-button label="第四季度"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-divider></el-divider>
      </div>


    </div>
    <div id="search_main">
      <div id="stockTable" class="panel">
    <div class="title">
      <el-row :gutter="5">
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <img class="tag" src="../../src/assets/images/tag1.png" />
          </div>
        </el-col>
        <el-col :span="15">
          <div class="grid-content bg-purple">预测原始数据</div>
        </el-col>
      </el-row>
    </div>
    <div id="stockData">
      <stockData ref="stockDate"></stockData>
    </div>
  </div>
    </div>
  </div>

</template>

<script>
import bus from "../utils/bus";
import stockData from "../components/Search/datachart.vue"

export default {
name: "Search",
  data(){
  return{
    input:""
  }
  },
  components: {
    stockData,
  },
  mounted() {
  this.changeHeaderStatus()
  },
  methods:{
    changeHeaderStatus: function () {
      bus.$emit("isShowStatus", false);
    },
  }
}
</script>

<style scoped>
@import "../assets/style/search.css";
@media (max-width: 1280px) {
  .el-col-2 {
    width: 25px;
    padding: 5px 0;
  }
}
@media (min-width: 1280px) {
  .el-col-2 {
    width: 25px;
    padding: 5px 0;
  }
}
@media (min-width: 1600px) {
  .el-col-2 {
    width: 35px;
  }
}
@media (min-width: 1920px) {
  .el-col-2 {
    width: 40px;
  }
}
</style>