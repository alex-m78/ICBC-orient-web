<template>
  <div id="container">
    <div id="detail_top" class="panel">
      <el-row>
        <el-col :span="1.5">预测年份：</el-col>
        <el-col style="width:350px">
          <el-radio-group v-model="year" @change="changeYear">
            <el-radio-button label="2020年"></el-radio-button>
            <el-radio-button label="2019年"></el-radio-button>
            <el-radio-button label="2018年"></el-radio-button>
            <el-radio-button label="2017年"></el-radio-button>
          </el-radio-group>
        </el-col>
        <el-col :span="1.5">预测季度：</el-col>
        <el-col style="width:400px">
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
import { Message } from "element-ui";
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
      this.$refs.compareTable.changeTableData(
        this.$store.state.moduleDetail.predictStock,
        this.$store.state.moduleDetail.realStock
      );
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
          "#e84a5f",
            "#ff847c",
            "#ff9234",
            "#ffcd3c",

            "#91d18b",
            "#649d66",

            "#18b0A0",
            "#98d6ea",
            "#7f78d2",
            
            "#60c0dd",
            "#d7504b",
            "#c6e579",
            "#f4e001",
            "#f0805a",
            "#26c0c0"
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
      myChart.setOption({}, true);
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
          left: 150,
          right: 150,
        },
        series: [
          {
            name: "bar",
            type: "bar",
            barWidth: 14,
            itemStyle: {
              barBorderRadius: 10,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#14c8d4" },
                { offset: 1, color: "#43eec6" },
              ]),
            },
            label: {
              show: true,
              formatter: (params) => params.value + " %",
              position: "right",
              offset: [10, 0],
              color: "#184d47",
              fontSize: 14,
              fontWeight: 600,
            },
            showBackground: "true",
            backgroundStyle: {
              barBorderRadius: 5,
            },
            data: [this.accuracy, this.precisionTop30],
          },
          // {
          //   name: "line",
          //   type: "bar",
          //   barGap: "-100%",
          //   barWidth: 10,
          //   itemStyle: {
          //     barBorderRadius: 5,
          //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          //       { offset: 0, color: "rgba(20,200,212,0.5)" },
          //       { offset: 0.2, color: "rgba(20,200,212,0.2)" },
          //       { offset: 1, color: "rgba(20,200,212,0.5)" },
          //     ]),
          //   },
          //   z: -12,
          //   data: [maxData, maxData],
          // },
          // {
          //   // full data
          //   type: "pictorialBar",
          //   itemStyle: {
          //     normal: {
          //       opacity: 0.2,
          //     },
          //   },
          //   label: {
          //     show: true,
          //     formatter: (params) => params.value + " %",
          //     position: "right",
          //     offset: [10, 0],
          //     color: "rgb(194,53,49)",
          //     fontSize: 18,
          //   },
          //   symbolRepeat: "fixed",
          //   symbolMargin: "15",
          //   symbol: spirit,
          //   symbolSize: 30,
          //   symbolBoundingData: maxData,
          //   data: [this.accuracy, this.precisionTop30],
          //   z: 5,
          // },
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
        if (this.sql_quarter === 3 || this.sql_quarter === 4) {
          Message.error("数据不足，无法预测");
        } else {
          this.getPreStockData();
        }
      } else {
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