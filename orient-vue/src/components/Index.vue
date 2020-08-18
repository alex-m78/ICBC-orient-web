<template>
  <div id="container">
    <!-- <div id="welcome"></div> -->
    <div id="top">
      <cell v-for="weekStock in weekStocks" :key="weekStock.index" :weekStock="weekStock"></cell>
    </div>
    <div class="bottom">
      <div class="left">
        <div id="leftChart" class="panel">
          <div class="title">
            <el-row :gutter="20">
              <el-col :span="2">
                <div class="grid-content bg-purple">
                  <img class="tag" src="../../src/assets/images/tag1.png" />
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple">基金重仓股占股票市值比例的数量分布</div>
              </el-col>
            </el-row>
          </div>
          <div id="chart4" class="chart"></div>
        </div>
        <div id="leftMap" class="panel">
          <div class="title">
            <el-row :gutter="20">
              <el-col :span="2">
                <div class="grid-content bg-purple">
                  <img class="tag" src="../../src/assets/images/tag1.png" />
                </div>
              </el-col>
              <el-col :span="20">
                <div class="grid-content bg-purple">基金持有数排名前十重仓股</div>
              </el-col>
            </el-row>
          </div>
          <div id="chart3" class="chart"></div>
        </div>
      </div>
      <div class="right">
        <div id="chartview">
          <div class="panel" id="box1">
            <div class="title">
              <el-row :gutter="20">
                <el-col :span="2">
                  <div class="grid-content bg-purple">
                    <img class="tag" src="../../src/assets/images/tag1.png" />
                  </div>
                </el-col>
                <el-col :span="20" style="display:flex;justify-content:space-between">
                  <div class="grid-content bg-purple">平均超额收益率对比</div>
                  <el-button id="CAAR_Change"  type="text" @click="handleChange">CAR</el-button>
                </el-col>
              </el-row>
            </div>
            <div id="chart1" class="chart"></div>
            <p>发布日：2020.01.01</p>
          </div>
          <div class="panel" id="box2">
            <div class="title">
              <el-row :gutter="20">
                <el-col :span="2">
                  <div class="grid-content bg-purple">
                    <img class="tag" src="../../src/assets/images/tag1.png" />
                  </div>
                </el-col>
                <el-col :span="21">
                  <div class="grid-content bg-purple">新进重仓股所属行业</div>
                </el-col>
              </el-row>
            </div>
            <div id="chart2" class="chart"></div>
            <p>2020年第二季度实际数据</p>
          </div>
        </div>
        <div id="tableview" class="panel">
          <div class="title">
              <el-row :gutter="20">
                <el-col :span="2">
                  <div class="grid-content bg-purple">
                    <img class="tag" src="../../src/assets/images/tag1.png" />
                  </div>
                </el-col>
                <el-col :span="21">
                  <div class="grid-content bg-purple">指标对比</div>
                </el-col>
              </el-row>
            </div>
          <div id="compared_table">
            <initTable></initTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cell from "../components/Index/cell.vue";
import initTable from "../components/Index/table.vue";
import echarts from "echarts";
import bus from "../utils/bus";
export default {
  name: "index",
  data() {
    return {
      CAAR:{
        dayCount:[],
        newCar:[],
        oldCar:[],
        newAr:[],
        oldAr:[]

      }
    };
  },
  components: {
    cell,
    initTable,
  },
  mounted() {
    this.creatChart();
    this.pieChart();
    this.barchart();
    this.changeHeaderStatus();
    this.getFiveStockData();
    this.getStockQuarter();
  },
  computed: {
    weekStocks() {
      return this.$store.state.modulesIndex.stockWeekInfo;
    },
  },
  methods: {
    creatChart: function () {
      // let token = sessionStorage.getItem("token");
      // console.log(token);
      this.$api.GetCar().then((res) => {
        let data = res.data.result;
        // console.log("create");
        // console.log(data);
        // console.log(data)
        for(let v of data){
          this.CAAR.dayCount.push(v.dayCount);
          this.CAAR.newCar.push(v.newCar);
          this.CAAR.oldCar.push(v.oldCar);
          this.CAAR.newAr.push(v.newAr);
          this.CAAR.oldAr.push(v.oldAr);
        }
        var dom = document.getElementById("chart1");
        var myChart = echarts.init(dom);
        let option = null;
        option = {
          color: [ "#aa26da","#537ec5"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#283b56",
              },
            },
          },
          legend: {
            top: 3,
            data: ["新进重仓股AR", "非重仓股AR"],
          },
          // dataZoom: {
          //   show: false,
          //   start: 0,
          //   end: 100,
          // },
          xAxis: {
            type: "category",
            boundaryGap: true,
            data: this.CAAR.dayCount,
          },
          yAxis: {
            type: "value",
            scale: true,
            name: "AR",
            // boundaryGap: [0.2, 0.2],
            splitLine: {
              show: false,
            },
          },
          series: [
            {
              name: "新进重仓股AR",
              type: "line",
              data: this.CAAR.newAr
            },
            {
              name: "非重仓股AR",
              type: "line",
              data: this.CAAR.oldAr
            },
          ],
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      });
    },
    pieChart: function () {
      this.$api.GetIndustry().then((res) => {
        // console.log(res);
        let data = res.data.result;
        // console.log(data);
        let industry_names = [];
        let industry_value = [];
        for (let i = 0; i < 5; i++) {
          industry_names.push(data[i]["industryName"]);
          industry_value.push({
            value: data[i]["count"],
            name: data[i]["industryName"],
          });
        }
        var dom = document.getElementById("chart2");
        var myChart = echarts.init(dom);
        // var app = {};
        var option = {
          color: ["#ffdc34", "#537ec5", "#aa26da", "#ff6361", "#f08a5d"],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            // orient: 'vertical',
            // top: 'middle',
            type: "scroll",
            icon: "circle",
            bottom: 15,
            left: "center",
            data: industry_names,
          },

          graphic: {
            //图形中间文字
            type: "text",
            left: "center",
            top: "35%",
            style: {
              text: "",
              textAlign: "center",
              fill: "#aaa",
              fontSize: 60,
            },
          },
          series: [
            {
              type: "pie",
              radius: ["40%", "60%"],
              center: ["50%", "40%"],
              selectedMode: "single",
              data: industry_value,
              label: {
                show: false,
              },
              itemStyle: {
                borderWidth: 5,
                borderColor: "#fff",
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                  borderWidth: 0,
                },
              },
            },
          ],
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      });
    },
    barchart: function () {
      // let token = sessionStorage.getItem("token");
      // // console.log(token);
      this.$api.GetStockHold().then((res) => {
        // console.log(res);
        let data = res.data.result;
        // console.log(data);
        let source = [];
        source.push(["被基金持有数", "被基金持有数", "重仓股名称"]);
        let maxCount = 0;
        for (var i = 9; i >= 0; i--) {
          source.push([
            data[i]["count"],
            data[i]["count"],
            data[i]["stockName"],
          ]);
          if (data[i]["count"] > maxCount) {
            maxCount = data[i]["count"];
          }
        }
        var dom = document.getElementById("chart3");
        var myChart = echarts.init(dom);
        // var app = {};
        var option = null;
        option = {
          dataset: {
            source: source,
          },
          grid: {
            bottom: 80,
            containLabel: true,
          },
          xAxis: {
            name: "被基金持有数",
            nameGap: 22,
            nameLocation: "center",
            splitLine: {
              show: false,
            },
          },

          yAxis: { type: "category", name: "重仓股名称" },
          visualMap: {
            orient: "horizontal",
            left: "center",
            bottom: 20,
            min: 0,
            max: maxCount + 5,
            // text: ['High Score', 'Low Score'],
            // Map the score column to color
            dimension: 0,
            inRange: {
              color: ["#ff9234", "#ffcd3c"],
            },
          },
          series: [
            {
              type: "bar",
              barMaxWidth: 25,
              encode: {
                // Map the "amount" column to X axis.
                x: "被基金持有数",
                // Map the "product" column to Y axis
                y: "重仓股名称",
              },
            },
          ],
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      });
    },
    changeHeaderStatus: function () {
      bus.$emit("isShowStatus", true);
    },
    getFiveStockData: function () {
      this.$store.dispatch("stock_week_info");
    },
    getStockQuarter: function () {
      this.$api.getStockQuarter().then((res) => {
        // console.log(res);
        let data = res.data.result;
        // console.log(data);
        let option = null;
        let date = [];
        let value1 = [];
        let value2 = [];
        let value3 = [];
        let value4 = [];
        let value5 = [];
        let value6 = [];
        for (let i = 0; i < 16; i++) {
          date.push(data[i]["endDate"]);
        }
        // console.log(date);
        for (let j = 0; j < 16; j++) {
          value1.push(data[j]["end1"]);
          value2.push(data[j]["end2"]);
          value3.push(data[j]["end3"]);
          value4.push(data[j]["end4"]);
          value5.push(data[j]["end5"]);
          value6.push(data[j]["end6"]);
        }
        // console.log(value1);
        // console.log(value2);
        // console.log(value3);
        var dom = document.getElementById("chart4");
        var myChart = echarts.init(dom);
        /*
        option = {
          color: ["#eebb4d","#ffa931","#d6efc7", "#96bb7c", "#184d47", "#ff6361"],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['(0,5]', '(5,20]', '(20,50]', '(50,100]', '(100,500]','(500,3000]']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value'
          },
          yAxis: {
            type: 'category',
            data: date
          },
          series: [
            {
              name: '(0,5]',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: value1
            },
            {
              name: '(5,20]',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: value2
            },
            {
              name: '(20,50]',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: value3
            },
            {
              name: '(50,100]',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: value4
            },
            {
              name: '(100,500]',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: value5
            },
            {
              name: '(500,3000]',
              type: 'bar',
              stack: '总量',
              label: {
                show: true,
                position: 'insideRight'
              },
              data: value6
            },
          ],
        };
        */
        option = {
          color: [
            "#ffdecf",
            "#ffa931",
            "#d6efc7",
            "#96bb7c",
            "#184d47",
            "#ff6361",
          ],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          legend: {
            type: "scroll",
            top: 3,
            data: [
              "(0,5]",
              "(5,20]",
              "(20,50]",
              "(50,100]",
              "(100,500]",
              "(500,3000]",
            ],
            icon: "roundRect",
          },
          grid: {
            x: "50",
            y: "50",
            // left: '3%',
            // right: '4%',
            // bottom: '3%',
            // containLabel: true
          },
          xAxis: {
            type: "category",
            data: date,
            splitLine: {
              show: false,
            },
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: false,
            },
          },
          series: [
            {
              name: "(0,5]",
              type: "bar",
              barWidth: "80%",
              stack: "总量",
              // label: {
              //   show: true,
              //   position: 'insideRight'
              // },
              data: value1,
            },
            {
              name: "(5,20]",
              type: "bar",
              stack: "总量",
              // label: {
              //   show: true,
              //   position: 'insideRight'
              // },
              data: value2,
            },
            {
              name: "(20,50]",
              type: "bar",
              stack: "总量",
              // label: {
              //   show: true,
              //   position: 'insideRight'
              // },
              data: value3,
            },
            {
              name: "(50,100]",
              type: "bar",
              stack: "总量",
              // label: {
              //   show: true,
              //   position: 'insideRight'
              // },
              data: value4,
            },
            {
              name: "(100,500]",
              type: "bar",
              stack: "总量",
              // label: {
              //   show: true,
              //   position: 'insideRight'
              // },
              data: value5,
            },
            {
              name: "(500,3000]",
              type: "bar",
              stack: "总量",
              // label: {
              //   show: true,
              //   position: 'insideRight'
              // },
              data: value6,
            },
          ],
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      });
    },
    handleChange:function(){
      let text=$('#CAAR_Change').text();
       var myChart = echarts.init(document.getElementById("chart1"));
      if(text==='CAR'){
        $('#CAAR_Change').text('AR')

        myChart.setOption({
          legend: {
            data: ["新进重仓股CAR", "非重仓股CAR"],
          },
          series:[
            {
              name: "新进重仓股CAR",
              data: this.CAAR.newCar
            },
            {
              name: "非重仓股CAR",
              data: this.CAAR.oldCar
            },
          ],
        })
      }else{
        $('#CAAR_Change').text('CAR')
        myChart.setOption({
          legend: {
            data: ["新进重仓股AR", "非重仓股AR"],
          },
          series:[
            {
              name: "新进重仓股AR",
              data: this.CAAR.newAr
            },
            {
              name: "非重仓股AR",
              data: this.CAAR.oldAr
            },
          ],
        })
      }
      // console.log(text)
    }
  },
};
</script>
<style scoped>
@import "../assets/style/index.css";
.el-row {
  display: flex;
  justify-content: center;
}
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