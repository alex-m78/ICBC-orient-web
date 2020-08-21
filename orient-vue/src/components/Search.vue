<template>
  <div id="container">
      <div id="search_top" class="panel">
        <el-row>
          <el-col :span="4" style="float:left">
          <el-input placeholder="请输入股票名称" v-model="input" class="input-with-select" >
            <el-button slot="append" icon="el-icon-search" @click="query" ></el-button>
          </el-input>
        </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="1.5">查询年份：</el-col>
          <el-col :span="10">
            <el-radio-group v-model="year" @change="changeYear">
              <el-radio-button label="2020年"></el-radio-button>
              <el-radio-button label="2019年"></el-radio-button>
              <el-radio-button label="2018年"></el-radio-button>
              <el-radio-button label="2017年"></el-radio-button>
            </el-radio-group>
          </el-col>
          <el-col :span="1.5">查询季度：</el-col>
          <el-col :span="10">
            <el-radio-group v-model="quarter" @change="changeQuarter" >
              <el-radio-button label="第一季度"></el-radio-button>
              <el-radio-button label="第二季度"></el-radio-button>
              <el-radio-button label="第三季度"></el-radio-button>
              <el-radio-button label="第四季度"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
      </div>
    <div id="search_main" class="panel">
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
      <stockData ref="stockData"></stockData>
    </div>
    </div>
  </div>

</template>

<script>
import bus from "../utils/bus";
import stockData from "../components/Search/datachart"

export default {
name: "Search",
  data(){
  return{
    input:"华东医药",
    year: "2019年",
    quarter: "第三季度",
    sql_year: 2019,
    sql_quarter: 3,
  }
  },

  components: {
    stockData,
  },
  mounted() {
    this.changeHeaderStatus()
    this.getRowData()
  },
  methods:{
    getRowData: async function () {
      let param = {
        name:this.input,
        year: this.sql_year,
        quarter: this.sql_quarter,
      };
      this.setLoading();
      await this.$store.dispatch("row_data", param);
      this.$store.commit("LOADING", false);
    },
    setLoading: function () {
      this.$store.commit("LOADING", true);
    },
    changeYear: function () {
      this.sql_year = Number(this.year.slice(0, 4));
    },
    changeQuarter() {
      if (this.quarter === "第一季度") {
        this.sql_quarter = 1;
      } else if (this.quarter === "第三季度") {
        this.sql_quarter = 3;
      } else if (this.quarter === "第二季度") {
        this.sql_quarter = 2;
      } else {
        this.sql_quarter = 4;
      }
    },
    changeHeaderStatus: function () {
      bus.$emit("isShowStatus", false);
    },
    query:function (){
      this.getRowData()
    }
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