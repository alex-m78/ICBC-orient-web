<template>
  <div :id="cellchart" class="cellchart" ref="cellchart"></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "cellchart",
  data() {
    return {};
  },
  computed: {
    cellchart() {
      return "cellchart" + Math.random() * 100000;
    },
    weekStock() {
      // console.log(this.$attrs)
      return this.$attrs.weekStock;
    },
  },
  mounted() {
    this.creatChart();
  },
  methods: {
    creatChart: function () {
      let date = [],
        value = [];
      for (let v of this.weekStock) {
        date.push(v.tradeDate);
        value.push(v.close);
      }
      date = date.reverse();
      value = value.reverse();
      var cellChart = echarts.init(document.getElementById(this.cellchart));
      var celloption = {
        color: ["#5B86E5"],
        aria: {
          show: true,
        },
        tooltip: {
          show: true,
          confine: true,
          backgroundColor: "#fff",
          padding: [10, 15],
          textStyle: {
            color: "#000",
            fontFamily: "Microsoft YaHei",
          },
          extraCssText: "box-shadow: 0 0 3px rgba(150, 150, 150, 0.5);",
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#283b56",
            },
          },
        },
        grid: {
          x: 0,
          y: 50,
          x2: 0,
          y2: 0,
        },
        xAxis: {
          show: false,
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          show: false,
          type: "value",
          min: "dataMin",
        },
        series: [
          {
            data: value,
            type: "line",
            lineStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#7F7FD5",
                },
                {
                  offset: 0.5,
                  color: "#86A8E7",
                },
                {
                  offset: 1,
                  color: "#91EAE4",
                },
              ]),
              width: 3,
            },
            smooth: true,
            symbolSize: 1,
            showSymbol: true,
            // markPoint: {
            //   data: [
            //     {
            //       type: "max",
            //     },
            //   ],
            //   symbol: "pin"
            // },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0,
                    color: "#7F7FD5",
                  },
                  {
                    offset: 0.5,
                    color: "#86A8E7",
                  },
                  {
                    offset: 1,
                    color: "#91EAE4",
                  },
                ]),
                opacity: 0.5,
              },
            },
          },
        ],
      };
      cellChart.setOption(celloption, true);
    },
  },
};
</script>
<style scoped>
.cellchart {
  width: 100%;
  height: 100%;
  /* padding: 1px; */
}
</style>