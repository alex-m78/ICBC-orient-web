<template>
  <div id="container">
    <div id="detail_top" class="panel">
      <el-row>
        <el-col :span="1.5">预测年份：</el-col>
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
        <el-col :span="1.5">预测季度：</el-col>
        <el-col :span="15">
          <el-radio-group v-model="quarter" @change="changeQuarter">
            <el-radio-button label="第一季度"></el-radio-button>
            <el-radio-button label="第二季度"></el-radio-button>
            <el-radio-button label="第三季度"></el-radio-button>
            <el-radio-button label="第四季度"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </div>
    <div id="detail_main">
      <div id="leftTab" class="panel">
        <div class="title">
          <el-row :gutter="5">
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <img class="tag" src="../../src/assets/images/tag1.png" />
              </div>
            </el-col>
            <el-col :span="15">
              <div class="grid-content bg-purple">行业占比</div>
            </el-col>
          </el-row>
        </div>
        <div id="industriesChart"></div>
        <el-divider></el-divider>
        <div class="title">
          <el-row :gutter="5">
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <img class="tag" src="../../src/assets/images/tag1.png" />
              </div>
            </el-col>
            <el-col :span="15">
              <div class="grid-content bg-purple">预测对比分析</div>
            </el-col>
          </el-row>
        </div>
        <div id="leftPanel">
          <compareTable ref="compareTable"></compareTable>
        </div>
      </div>
      <div id="rightTab" class="panel">
        <div class="title">
          <el-row :gutter="5">
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <img class="tag" src="../../src/assets/images/tag1.png" />
              </div>
            </el-col>
            <el-col :span="15">
              <div class="grid-content bg-purple">新进重仓股</div>
            </el-col>
          </el-row>
        </div>
        <div id="stockInfoTable">
          <stockInfo ref="stockInfo"></stockInfo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import compareTable from "../components/Detail/lefttable.vue";
import echarts from "echarts";
import stockInfo from "../components/Detail/rightTable.vue"
import bus from "../utils/bus"
// import pagination from "../components/common/pagination"

export default {
  name: "Prediction",
  data() {
    return {
      year: "2020年",
      quarter: "第二季度",
      sql_year: 2020,
      sql_quarter: 2,
    };
  },
  components: {
    compareTable,
    stockInfo,
  },
  mounted() {
    this.changeHeaderStatus()
    this.getStockData();
  },
  methods: {
    getStockData: async function(){
      let param={
        year:this.sql_year,
        quarter:this.sql_quarter
      }
      await this.$store.dispatch("model_result",param)
      // this.$api.getModelResult({year:this.sql_year,quarter:this.sql_quarter}).
      // then((res) => {
      //   console.log(res);
      //   let data = res.data.result;
      //   console.log(data);
      this.pieChart(this.$store.state.moduleDetail.industryDataPre,this.$store.state.moduleDetail.industryDataReal)
      this.$refs.compareTable.changeTableData(this.$store.state.moduleDetail.predictStock, this.$store.state.moduleDetail.realStock)
      this.$refs.stockInfo.changeTableData(this.$store.state.moduleDetail.stockDataDetail)
      // })
    },
    pieChart: function (preindustry,realindustry) {

      let pre_industry_names = [];
      let pre_industry_value = [];
      let real_industry_names = [];
      let real_industry_value = [];
      if (preindustry != null){
        for (let i = 0; i < preindustry.length; i++) {
          pre_industry_names.push(preindustry[i]["industryName"]);
          pre_industry_value.push({
            value: preindustry[i]["count"],
            name: preindustry[i]["industryName"]})
        }
      }
      if (realindustry != null) {
        for (let i = 0; i < realindustry.length; i++) {
          real_industry_names.push(realindustry[i]["industryName"]);
          real_industry_value.push({
            value: realindustry[i]["count"],
            name: realindustry[i]["industryName"]
          })
        }
      }
      let industry_names = pre_industry_names.concat(real_industry_names);
      industry_names = Array.from(new Set(industry_names))
        var dom = document.getElementById("industriesChart");
        var myChart = echarts.init(dom);
        var option = {
          color: ["#fc9d9d",
                  "#ffa36c",
                  "#ebdc87",
                  "#80bdab",
                  "#fbc490",
                  "#d291bc",
                  "#fa7d09",
                  "#8bcdcd",
                  "#bac964",
                  "#dbc6eb",
                  "#abc2e8",
                  "#ad6989"],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          legend: {
            type: 'scroll',
            top: 3,
            icon: 'circle',
            orient: "horizontal",
            left: 5,
            data: industry_names,
          },
          series: [
            {
              name: "预测新进重仓股行业",
              type: "pie",
              selectedMode: "single",
              radius: [0, "40%"],
              center: ["50%", "50%"],
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
              itemStyle: {
                // borderWidth: 5,
                borderColor: "#fff",
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                  borderWidth:0
                },
              },
              data: pre_industry_value,

            },
            {
              name: "实际新进重仓股行业",
              type: "pie",
              radius: ["50%", "60%"],
              center: ["50%", "50%"],
              label: {
                show: false,
              },
              itemStyle: {
                // borderWidth: 5,
                borderColor: "#fff",
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                  borderWidth:0
                },
              },
              data:real_industry_value
            },
          ],
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
    },
    changeYear: function () {
      // console.log(this.year);
      this.sql_year = Number(this.year.slice(0, 4));
      // console.log(this.sql_year);
      this.$refs.compareTable.changePeriod(this.year, this.quarter);
      this.getStockData();
    },
    changeQuarter() {
      if(this.quarter === "第一季度"){

        this.sql_quarter = 1;
      }
      if(this.quarter === "第三季度"){
        this.sql_quarter = 3;
      }
      else if(this.quarter === "第二季度"){
        this.sql_quarter = 2;
      }
      else{
        this.sql_quarter = 4;
      }
      console.log(this.sql_quarter)
      this.$refs.compareTable.changePeriod(this.year,this.quarter)
      this.getStockData();
    },
    changeHeaderStatus: function () {
      bus.$emit("isShowStatus", false)
    }
  }
};
</script>

<style scoped>
@import "../assets/style/detail.css";
@media(max-width:1280px){
  .el-col-2{
    width: 25px;
    padding: 5px 0;
  }
}
@media(min-width:1280px){
  .el-col-2{
    width: 25px;
    padding: 5px 0;
  }
}
@media(min-width:1600px){
  .el-col-2{
    width: 35px;
  }
}
@media(min-width:1920px){
  .el-col-2{
    width: 40px;
  }
}
</style>