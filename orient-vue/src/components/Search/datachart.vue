<template>
  <div>
    <div style="margin:10px;">
      <el-table :data="stockData" style="margin: auto" border>
        <el-table-column fixed align="center" prop="tsCode" label="股票代码" width="120"></el-table-column>
        <el-table-column align="center" prop="name" label="股票名称"></el-table-column>
        <el-table-column align="center" prop="area" label="所在地域"></el-table-column>
        <el-table-column align="center" prop="industry" label="所属行业"></el-table-column>
        <el-table-column align="center" prop="market" label="市场类型"></el-table-column>
        <el-table-column align="center" prop="listDate" label="上市日期"></el-table-column>
        <el-table-column align="center" prop="setupDate" label="公司成立时间"></el-table-column>
        <el-table-column align="center" prop="employees" label="员工人数"></el-table-column>
        <el-table-column align="center" prop="qeps" width="150" label="每股收益(单季度)"></el-table-column>
        <el-table-column align="center" prop="eps" label="每股收益"></el-table-column>
        <el-table-column align="center" prop="revenuePs" label="每股营业收入"></el-table-column>
        <el-table-column align="center" prop="capitalResePs" label="每股资本公积"></el-table-column>
        <el-table-column align="center" prop="surplusResePs" label="每股盈余公积"></el-table-column>
        <el-table-column align="center" prop="currentRatio" label="流动比率"></el-table-column>
        <el-table-column align="center" prop="quickRatio" label="速动比率"></el-table-column>
        <el-table-column align="center" prop="invTurn" label="存货周转率"></el-table-column>
        <el-table-column align="center" prop="arTurn" label="应收账款周转率"></el-table-column>
        <el-table-column align="center" prop="caTurn" label="流动资产周转率"></el-table-column>
        <el-table-column align="center" prop="assetsTurn" label="总资产周转率"></el-table-column>
        <el-table-column align="center" prop="debtToAssets" label="资产负债率"></el-table-column>
      </el-table>
    </div>
    <el-divider>
      <i class="el-icon-s-flag"></i>
    </el-divider>
    <div style="margin:10px">
      <el-table :data="stockData" style="margin: auto" border>
        <el-table-column fixed align="center" prop="tsCode" label="股票代码" width="120"></el-table-column>

        <el-table-column align="center" prop="roaDp" label="总资产净利率(杜邦分析)"></el-table-column>
        <el-table-column align="center" prop="undistProfitPs" label="每股未分配利润"></el-table-column>
        <el-table-column align="center" prop="taxToEbt" label="所得税/利润总额"></el-table-column>
        <el-table-column align="center" prop="revenue" label="营业收入"></el-table-column>
        <el-table-column align="center" prop="totalProfit" label="利润总额"></el-table-column>
        <el-table-column align="center" prop="incomeTax" label="所得税"></el-table-column>
        <el-table-column align="center" prop="accountsReceiv" label="应收账款"></el-table-column>
        <el-table-column align="center" prop="fixAssets" label="固定资产"></el-table-column>
        <el-table-column align="center" prop="totalCurLiab" label="流动负债"></el-table-column>
        <el-table-column align="center" prop="ocfToOpincome" label="净现比"></el-table-column>
        <el-table-column align="center" prop="basicEpsYoy" label="每股收益同比增长率"></el-table-column>
        <el-table-column align="center" prop="cfpsYoy" label="每股现金流同比增长率"></el-table-column>
        <el-table-column align="center" prop="orYoy" label="营业收入同比增长率"></el-table-column>
        <el-table-column align="center" prop="qsalesYoy" label="营业收入同比增长率(单季度)"></el-table-column>
        <el-table-column align="center" prop="qprofitYoy" label="净利润同比增长率(单季度)"></el-table-column>
        <el-table-column align="center" prop="equityYoy" label="净资产同比增长率"></el-table-column>
        <el-table-column align="center" prop="closeStd" label="波动率"></el-table-column>
      </el-table>
    </div>
    <el-divider>
      <i class="el-icon-s-flag"></i>
    </el-divider>
    <div style="margin:10px">
      <el-table :data="stockData" border :cell-style="cellStyle" :header-cell-style="tableHeaderCellStyle" style="margin: auto">
        <el-table-column fixed align="center" prop="tsCode" label="股票代码" width="120"></el-table-column>
        <el-table-column align="center" prop="high" label="季最高价"></el-table-column>
        <el-table-column align="center" prop="low" label="季最低价"></el-table-column>
        <el-table-column align="center" prop="vol" label="季成交量"></el-table-column>
        <el-table-column align="center" prop="pctChg0" label="月涨跌幅(复权)0"></el-table-column>
        <el-table-column align="center" prop="pctChg1" label="月涨跌幅(复权)1"></el-table-column>
        <el-table-column align="center" prop="pctChg2" label="月涨跌幅(复权)2"></el-table-column>
        <el-table-column align="center" prop="turnoverRateMean" label="换手率"></el-table-column>
        <el-table-column align="center" prop="peTtmAmin" label="最小市盈率TTM"></el-table-column>
        <el-table-column align="center" prop="peTtmAmax" label="平均市盈率TTM"></el-table-column>
        <el-table-column align="center" prop="peTtmMean" label="最大市盈率TTM"></el-table-column>
        <el-table-column align="center" prop="pbAmin" label="最小市净率"></el-table-column>
        <el-table-column align="center" prop="pbAmax" label="平均市净率"></el-table-column>
        <el-table-column align="center" prop="pbMean" label="最大市净率"></el-table-column>
        <el-table-column align="center" prop="psTtmAmin" label="最小市销率（TTM）"></el-table-column>
        <el-table-column align="center" prop="psTtmAmax" label="平均市销率（TTM）"></el-table-column>
        <el-table-column align="center" prop="psTtmMean" label="最大市销率（TTM）"></el-table-column>
        <el-table-column align="center" prop="dvTtmMean" label="股息率TTM_mean"></el-table-column>
        <el-table-column align="center" prop="totalShareMean" label="总股本(万)"></el-table-column>
        <el-table-column align="center" prop="totalMvMean" label="总市值(万)"></el-table-column>
        <el-table-column align="center" prop="floatShareMean" label="流通股本(万)"></el-table-column>
        <el-table-column align="center" prop="circMvMean" label="流通市值(万)"></el-table-column>
        <el-table-column fixed="right" align="center" prop="label" label="是否为基金重仓股"></el-table-column>
      </el-table>
    </div>

  </div>

</template>

<script>
export default {
  name: "stockDate",
  data() {
    return {};
  },
  computed: {
    stockData() {
      return this.$store.state.moduleRowData.stockRowData;
    },
  },
  methods: {
    cellStyle({ rowIndex, columnIndex }) {
      if (rowIndex === 0 && columnIndex === 22) {
        return "background: #ffdbc5";
      } else {
        return "";
      }
    },
    tableHeaderCellStyle: function ({columnIndex}) {
          if (columnIndex === 22){
            return 'background: #ffdbc5';
          }
      }
    }
}
</script>
