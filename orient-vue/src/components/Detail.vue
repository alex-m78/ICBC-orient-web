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
        <el-col :span="1.5" style="float:right">
          <el-button type="primary" icon="el-icon-search" @click="query">预测</el-button>
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
      <div id="rightTab">
        <div id="rateChart" class="panel">
          <div class="title">
            <el-row :gutter="5">
              <el-col :span="2">
                <div class="grid-content bg-purple">
                  <img class="tag" src="../../src/assets/images/tag1.png" />
                </div>
              </el-col>
              <el-col :span="15">
                <div class="grid-content bg-purple">预测准确率</div>
              </el-col>
            </el-row>
          </div>
          <div id="precision" class="chart"></div>
        </div>
        <div id="stockTable" class="panel">
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
  </div>
</template>

<script>
import compareTable from "../components/Detail/lefttable.vue";
import echarts from "echarts";
import stockInfo from "../components/Detail/rightTable.vue";
import bus from "../utils/bus";
import {Message} from "element-ui";
// import pagination from "../components/common/pagination"

export default {
  name: "Prediction",
  data() {
    return {
      year: "2019年",
      quarter: "第三季度",
      sql_year: 2019,
      sql_quarter: 3,
    };
  },
  components: {
    compareTable,
    stockInfo,
  },
  computed: {
    accuracy() {
      return this.$store.state.moduleDetail.accuracy;
    },
    precisionTop30() {
      return this.$store.state.moduleDetail.precisionTop30;
    },
  },
  mounted() {
    this.changeHeaderStatus();
    // this.getStockData();
    // this.getRealStockData()
    this.getPreStockData();
  },
  methods: {
    getPreStockData: async function () {
      let param = {
        year: this.sql_year,
        quarter: this.sql_quarter,
      };
      this.setLoading();
      await this.$store.dispatch("pre_result", param);
      await this.$store.dispatch("pre_result", param);
      this.$store.commit("LOADING", false);
      this.precision();
      this.pieChart(
        this.$store.state.moduleDetail.industryDataPre,
        this.$store.state.moduleDetail.industryDataReal
      );
      this.$refs.compareTable.changePeriod(this.year, this.quarter);
      this.$refs.compareTable.changeTableData(this.$store.state.moduleDetail.predictStock, this.$store.state.moduleDetail.realStock)
      // this.$refs.stockInfo.changeTableData(this.$store.state.moduleDetail.stockDataDetail)
    },
    pieChart: function (preindustry, realindustry) {
      // console.log(preindustry)
      let pre_industry_names = [];
      let pre_industry_value = [];
      let real_industry_names = [];
      let real_industry_value = [];
      if (preindustry !== undefined) {
        for (let i = 0; i < preindustry.length; i++) {
          pre_industry_names.push(preindustry[i]["industryName"]);
          pre_industry_value.push({
            value: preindustry[i]["count"],
            name: preindustry[i]["industryName"],
          });
        }
      }
      if (realindustry !== undefined) {
        for (let i = 0; i < realindustry.length; i++) {
          real_industry_names.push(realindustry[i]["industryName"]);
          real_industry_value.push({
            value: realindustry[i]["count"],
            name: realindustry[i]["industryName"],
          });
        }
      }
      let industry_names = pre_industry_names.concat(real_industry_names);
      industry_names = Array.from(new Set(industry_names));
      var dom = document.getElementById("industriesChart");
      var myChart = echarts.init(dom);
      var option = {
        color: [
          "#00b7c2",
          "#6983aa",
          "#537ec5",
          "#709fb0",
          "#0f4c75",
          "#30475e",
          "#dddddd",
          "#84a9ac",
          "#1f4068",
          "#4cbbb9",
          "#3282b8",
          "#6983aa",
          "#1b6ca8",
          "#b4f2e1",
          "#00909e"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          type: "scroll",
          top: 3,
          icon: "circle",
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
            center: ["50%", "45%"],
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
                borderWidth: 0,
              },
            },
            data: pre_industry_value,
          },
          {
            name: "实际新进重仓股行业",
            type: "pie",
            radius: ["50%", "60%"],
            center: ["50%", "45%"],
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
                borderWidth: 0,
              },
            },
            data: real_industry_value,
          },
        ],
        graphic: [
          {
            type: "group",
            left: "center",
            top: "80%",
            children: [
              {
                type: "rect",
                z: 100,
                left: "center",
                top: "middle",
                shape: {
                  width: 290,
                  height: 60,
                  r: [5, 5, 5, 5],
                },
                style: {
                  fill: "#fff",
                  stroke: "#999",
                  lineWidth: 1,
                  shadowBlur: 5,
                  // shadowOffsetX: 3,
                  // shadowOffsetY: 3,
                  shadowColor: "rgba(0,0,0,0.1)",
                },
              },
              {
                type: "text",
                z: 100,
                left: "center",
                top: "middle",
                style: {
                  fill: "#999",
                  text: [
                    "外圈展示实际新进重仓股行业占比",
                    "内圈展示预测新进重仓股行业占比",
                  ].join("\n"),
                  font: "14px Microsoft YaHei",
                },
              },
            ],
          },
        ],
      };
      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
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
    precision: function () {
      var myChart = echarts.init(document.getElementById("precision"));
      myChart.setOption({},true)
      var spirit ="image://data:image/png;base64,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"
      var maxData = 100;
      var option = {
        xAxis: {
          max: maxData,
          splitLine: { show: false },
          offset: 10,
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          axisTick: { show: false },
        },
        yAxis: {
          data: ["准确率", "查准率"],
          inverse: true,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            margin: 20,
            color: "#111",
            fontWeight: 600,
            fontSize: 16,
          },
        },
        grid: {
          top: 10,
          height: 100,
          left: 200,
          right: 200,
        },
        series: [
          {
            // current data
            type: "pictorialBar",
            symbol: spirit,
            symbolRepeat: "fixed",
            symbolMargin: "15",
            symbolClip: true,
            symbolSize: 30,
            symbolBoundingData: maxData,
            data: [this.accuracy, this.precisionTop30],
            z: 10,
          },
          {
            // full data
            type: "pictorialBar",
            itemStyle: {
              normal: {
                opacity: 0.2,
              },
            },
            label: {
              show: true,
              formatter: (params) => params.value + " %",
              position: "right",
              offset: [10, 0],
              color: "rgb(194,53,49)",
              fontSize: 18,
            },
            symbolRepeat: "fixed",
            symbolMargin: "15",
            symbol: spirit,
            symbolSize: 30,
            symbolBoundingData: maxData,
            data: [this.accuracy, this.precisionTop30],
            z: 5,
          },
        ],
      };
      myChart.setOption(option);
    },
    setLoading: function () {
      this.$store.commit("LOADING", true);
    },
    // 查询
    query: function () {
      this.$refs.compareTable.changePeriod(this.year, this.quarter);
      if (this.sql_year === 2020) {
        if (this.sql_quarter === 3 || this.sql_quarter === 4)
        {
          Message.error("数据不足，无法预测")
        }
        else{
          this.getPreStockData();
        }
      }else{
        this.getPreStockData();
      }
      
    },
  },
};
</script>

<style scoped>
@import "../assets/style/detail.css";
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