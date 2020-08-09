<template>
  <div>
    <el-table id="cell-class-name" :data="stockData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              style="width: 100%" border >
      <el-table-column prop="ts_code" label="重仓股代码" align="center"></el-table-column>
      <el-table-column prop="stockName" label="重仓股名称" align="center"></el-table-column>
      <el-table-column prop="pb" label="市净率" align="center"></el-table-column>
      <el-table-column prop="roe" label="净资产收益率" align="center"></el-table-column>
      <el-table-column prop="pettm" label="市盈率" align="center" min-width="95"></el-table-column>
      <el-table-column prop="netAssert" label="每股净资产" align="center"></el-table-column>
      <el-table-column prop="totalWorth" label="总市值" align="center"></el-table-column>
    </el-table>
  <!--   分页器 -->
      <div class="pagination-name" style="margin-top:15px;">
        <el-pagination align='center'
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[1,5,10,20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="stockData.length">
        </el-pagination>
      </div>
  </div>
</template>
<script>
export default {
    name: "stockInfo",
  mounted() {
  },
    data(){
        return{
            stockData:this.$store.state.moduleDetail.stockDataDetail,
            currentPage: 1, // 当前页码
            total: 20, // 总条数
            pageSize: 7 // 每页的数据条数
          }
    },
  methods: {
    changeTableData: function (stockData) {
      console.log("enter")
      this.stockData = stockData;
      console.log(this.stockData)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  }
}
</script>