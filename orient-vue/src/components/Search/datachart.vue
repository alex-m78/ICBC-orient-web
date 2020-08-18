<template>
  <div>
    <el-table
        :data="metaData"
        border
        style="width: 100%">
      <el-table-column fixed  prop="tsCode"  label="股票代码"></el-table-column>
      <el-table-column  prop="name"  label="股票名称"> </el-table-column>
      <el-table-column  prop="area"  label="所在地域"> </el-table-column>
      <el-table-column  prop="industry"  label="所属行业"> </el-table-column>
      <el-table-column  prop="market"  label="市场类型"> </el-table-column>
      <el-table-column  prop="listDate"  label="上市日期"> </el-table-column>
      <el-table-column  prop="setupDate"  label="公司成立时间"> </el-table-column>
      <el-table-column  prop="employees"  label="员工人数"> </el-table-column>
      <el-table-column  prop="qeps"  label="每股收益(单季度)"> </el-table-column>
      <el-table-column  prop="eps" label="每股收益"></el-table-column>
      <el-table-column  prop="revenuePs"  label="每股营业收入"> </el-table-column>
      <el-table-column  prop="capitalResePs"  label="每股资本公积"> </el-table-column>
      <el-table-column  prop="surplusResePs"  label="每股盈余公积"> </el-table-column>
      <el-table-column  prop="currentRatio"  label="流动比率"> </el-table-column>
      <el-table-column  prop="quickRatio"  label="速动比率"> </el-table-column>
      <el-table-column  prop="invTurn"  label="存货周转率"> </el-table-column>
      <el-table-column  prop="arTurn"  label="应收账款周转率"> </el-table-column>
      <el-table-column  prop="caTurn"  label="流动资产周转率"> </el-table-column>
      <el-table-column  prop="assetsTurn"  label="总资产周转率"> </el-table-column>
      <el-table-column  prop="bps"  label="每股净资产"> </el-table-column>
      <el-table-column  prop="cfps"  label="每股现金流"> </el-table-column>
      <el-table-column  prop="profitToGr"  label="净利润/营业总收入"> </el-table-column>
      <el-table-column  prop="qprofitToGr"  label="净利润/营业总收入(单季度)"> </el-table-column>
      <el-table-column  prop="opOfGr"  label="营业利润/营业总收入"> </el-table-column>
      <el-table-column  prop="qopToGr"  label="营业利润/营业总收入(单季度)"> </el-table-column>
      <el-table-column  prop="roe"  label="净资产收益率"> </el-table-column>
      <el-table-column  prop="qroe"  label="净资产收益率(单季度)"> </el-table-column>
      <el-table-column  prop="roeWaa"  label="邮加权平均净资产收益率编"> </el-table-column>
      <el-table-column  prop="debtToAssets"  label="资产负债率"> </el-table-column>
      <el-table-column  prop="roaDp"  label="总资产净利率(杜邦分析)"> </el-table-column>
      <el-table-column  prop="undistProfitPs"  label="每股未分配利润"> </el-table-column>
      <el-table-column  prop="taxToEbt"  label="所得税/利润总额"> </el-table-column>
      <el-table-column  prop="revenue"  label="营业收入"> </el-table-column>
      <el-table-column  prop="totalProfit"  label="利润总额"> </el-table-column>
      <el-table-column  prop="incomeTax"  label="所得税"> </el-table-column>
      <el-table-column  prop="accountsReceiv"  label="应收账款"> </el-table-column>
      <el-table-column  prop="fixAssets"  label="固定资产"> </el-table-column>
      <el-table-column  prop="totalCurLiab"  label="流动负债"> </el-table-column>
      <el-table-column  prop="ocfToOpincome"  label="净现比"> </el-table-column>
      <el-table-column  prop="basicEpsYoy"  label="每股收益同比增长率"> </el-table-column>
      <el-table-column  prop="cfpsYoy"  label="每股现金流同比增长率"> </el-table-column>
      <el-table-column  prop="orYoy"  label="营业收入同比增长率"> </el-table-column>
      <el-table-column  prop="qsalesYoy"  label="营业收入同比增长率(单季度)"> </el-table-column>
      <el-table-column  prop="qprofitYoy"  label="净利润同比增长率(单季度)"> </el-table-column>
      <el-table-column  prop="equityYoy"  label="净资产同比增长率"> </el-table-column>
      <el-table-column  prop="label"  label="是否为基金重仓股"> </el-table-column>
      <el-table-column  prop="high"  label="季最高价"> </el-table-column>
      <el-table-column  prop="low"  label="季最低价"> </el-table-column>
      <el-table-column  prop="vol"  label="季成交量"> </el-table-column>
      <el-table-column  prop="pctChg0"  label="月涨跌幅(复权)_0"> </el-table-column>
      <el-table-column  prop="pctChg1"  label="月涨跌幅(复权)_1"> </el-table-column>
      <el-table-column  prop="pctChg2"  label="月涨跌幅(复权)_2"> </el-table-column>
      <el-table-column  prop="turnoverRateMean"  label="换手率_mean"> </el-table-column>
      <el-table-column  prop="peTtmAmin"  label="最小市盈率TTM"> </el-table-column>
      <el-table-column  prop="peTtmAmax"  label="平均市盈率TTM"> </el-table-column>
      <el-table-column  prop="peTtmMean"  label="最大市盈率TTM"> </el-table-column>
      <el-table-column  prop="pbAmin"  label="最小市净率"> </el-table-column>
      <el-table-column  prop="pbAmax"  label="平均市净率"> </el-table-column>
      <el-table-column  prop="pbMean"  label="最大市净率"> </el-table-column>
      <el-table-column  prop="psTtmAmin"  label="最小市销率（TTM）"> </el-table-column>
      <el-table-column  prop="psTtmAmax"  label="平均市销率（TTM）"> </el-table-column>
      <el-table-column  prop="psTtmMean"  label="最大市销率（TTM）"> </el-table-column>
      <el-table-column  prop="dvTtmMean"  label="股息率TTM_mean"> </el-table-column>
      <el-table-column  prop="totalShareMean"  label="总股本(万)"> </el-table-column>
      <el-table-column  prop="totalMvMean"  label="总市值(万)"> </el-table-column>
      <el-table-column  prop="floatShareMean"  label="流通股本(万)"> </el-table-column>
      <el-table-column  prop="circMvMean"  label="流通市值(万)"> </el-table-column>
      <el-table-column  prop="closeStd"  label="波动率"> </el-table-column>
    </el-table>
  </div>

</template>

<script>
export default {
  name: "stockDate",
  data() {
    return{
      metaData:this.$store.state.moduleRowData.stockRowData,
    }
  },
  // computed: {
  //   stockData() {
  //     return this.$store.state.moduleRowData.stockRowData
  //   },
  // },

}
</script>

<style scoped>

</style>