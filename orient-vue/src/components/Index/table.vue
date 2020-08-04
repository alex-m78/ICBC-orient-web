 <template>
   <div>
    <el-table :data="targetCompared.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              :span-method="targetComparedSpanMethod">
      <el-table-column prop="target" label="指标" header-align="center"></el-table-column>
      <el-table-column prop="subTarget" width="105" label="子指标" header-align="center"></el-table-column>
      <el-table-column label="新进重仓股" prop="heavyStock" header-align="center">
        <el-table-column prop="heavyStock.mean" label="均值" header-align="center"></el-table-column>
        <el-table-column prop="heavyStock.sd" label="标准差" header-align="center"></el-table-column>
        <el-table-column prop="heavyStock.validSample" label="有效样本" header-align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="非新进重仓股" prop="nonHeavyStock" header-align="center">
        <el-table-column prop="nonHeavyStock.mean" label="均值" header-align="center"></el-table-column>
        <el-table-column prop="nonHeavyStock.sd" label="标准差" header-align="center"></el-table-column>
        <el-table-column
          prop="nonHeavyStock.validSample"
          label="有效样本"
          header-align="center"
        ></el-table-column>
      </el-table-column>
      <el-table-column prop="meanT" label="均值检验t值" header-align="center"></el-table-column>
    </el-table>
     <div class="pagination-name" style="margin-top:5px;">
       <el-pagination align='center'
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[1,5,10,20]"
                      :page-size="pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="targetCompared.length">
       </el-pagination>
     </div>
   </div>
</template>

  <script>
export default {
  data() {
    return {
      // newStockInfo: this.$store.state.modulesIndex.newStockInfo,
      targetCompared: [],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10 // 每页的数据条数
    };
  },
  mounted() {
    // this.getNetStockInfo();
    this.targetComparedResult();
  },
  computed: {
    spanArr: function () {  //判断跨行
      let len = this.targetCompared.length;
      let pos;
      let spanArr = [];
      for (let i = 0; i < len; i++) {
        if (i === 0) {
          spanArr.push(1);
          pos = 0;
        } else {
          // 判断当前元素与上一个是否相同
          if (
            this.targetCompared[i].target === this.targetCompared[i - 1].target
          ) {
            spanArr[pos] += 1;
            spanArr.push(0);
          } else {
            spanArr.push(1);
            pos = i;
          }
        }
      }
      return spanArr;
    },
  },
  methods: {
    targetComparedResult: function () {
      this.$api.getTargetCompared().then((res) => {
        // 获取表格数据
        var result = res.data.result;
        this.targetCompared = [];
        console.log("123")
        console.log(result);
        for (let data of result) {
          for (let i = 0; i < data.subTarget.length; i++) {
            let obj = new Object();
            obj.meanT = data.meanT;
            obj.target = data.target;
            obj.subTarget = data.subTarget[i];
            obj.heavyStock = data.heavyStock[i];
            obj.nonHeavyStock = data.nonHeavyStock[i];
            this.targetCompared.push(obj);
          }
        }
      });
    },
    targetComparedSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
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
  },
};
</script>
<style scoped>
.el-table {
  flex: 1 1 60%;
}
</style>