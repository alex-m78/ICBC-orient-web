 <template>
   <div>
    <el-table :data="targetCompared.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              :span-method="targetComparedSpanMethod">
      <el-table-column width="90" prop="target" label="指标" align="center"></el-table-column>
      <el-table-column prop="feature" width="170" label="子指标" align="center"></el-table-column>
      <el-table-column label="新进重仓股" prop="heavyStock" align="center">
        <el-table-column prop="mean1" label="均值" align="center"></el-table-column>
        <el-table-column prop="std1" label="标准差" align="center"></el-table-column>
        <el-table-column prop="len1" label="有效样本" align="center"></el-table-column>
      </el-table-column>
      <el-table-column label="非新进重仓股" prop="nonHeavyStock" align="center">
        <el-table-column prop="mean2" label="均值" align="center"></el-table-column>
        <el-table-column prop="std2" label="标准差" align="center"></el-table-column>
        <el-table-column
          prop="len2"
          label="有效样本"
          align="center"
        ></el-table-column>
      </el-table-column>
      <el-table-column width="60" prop="corr" label="相关性" align="center"></el-table-column>
    </el-table>
     <div class="pagination-name" style="margin-top:5px;">
       <el-pagination align='center'
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="currentPage"
                      :page-sizes="[3,4,5,6]"
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
      pageSize: 5// 每页的数据条数
    };
  },
  mounted() {
    // this.getNetStockInfo();
    this.targetComparedResult();
    this.setPageSize()
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
        for (let data of result) {
          for (let i = 0; i < data.length; i++) {
            this.targetCompared.push(data[i]);
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
      // console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    setPageSize(){
      let width=window.innerWidth
      if(width<=1280){
        this.pageSize=4
      }else if(width<=1600){
        this.pageSize=5
      }else{
        this.pageSize=6
      }
    }
  },
};
</script>
<style scoped>
.el-table {
  flex: 1 1 60%;
  font-size: 12px;
  border-radius: 5px;
  border-left: none;
  border-right: none;
}
.el-table--border::after, .el-table--group::after, .el-table::before{
  background: none;
}
.el-table--border th{
  border-right: none;
}

</style>