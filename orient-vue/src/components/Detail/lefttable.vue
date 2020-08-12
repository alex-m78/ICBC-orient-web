<template>
    <el-table id="cell-class-name" :data="tableData"
               :span-method="objectSpanMethod"
              height="100%" border
              :header-cell-style="tableHeaderCellStyle"
              >
        <el-table-column
                prop="period"  label="预测季度"  align="center">
        </el-table-column>
        <el-table-column prop="predictStock" label="预测新进重仓股"  align="center">
        </el-table-column>
        <el-table-column prop="realStock" label="实际新进重仓股" align="center">
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "lefttable",
        data() {
            return {
                tableData: [{
                    period: "2020年第一季度",
                    predictStock: '股票1',
                    realStock: '股票2'
                }],
                spanLength: 1
            }
        },
        methods: {
            changePeriod: function(year, quarter){
              console.log(this.tableData)
              // if (this.tableData == null){
              //   this.tableData.push()
              // }
              this.tableData[0]["period"]= year + quarter
              console.log(this.tableData)
            },
            changeTableData: function(pre, real){
              console.log("left")
              let lengthPre = 0
              let lengthReal = 0
              if (pre !== undefined) {
                lengthPre = pre.length
              }
              if (real !== undefined) {
                lengthReal = real.length
              }
                let len = Math.max(lengthPre, lengthReal)
              console.log(len)
                let periodData = this.tableData[0]["period"]
                this.tableData.splice(0,this.tableData.length)
                let tempPre = "";
                let tempReal = "";
                for(let i=0; i<len; i++){
                    if (i < lengthPre){
                        tempPre=pre[i]["name_predicted"]
                    }
                    else {
                        tempPre=""
                    }
                    if (i < lengthReal) {
                        tempReal=real[i]["name_real"]
                    }
                    else {
                        tempReal=""
                    }
                    this.tableData.push({"period": periodData, "predictStock": tempPre, "realStock": tempReal})
                }
                console.log(tempPre)
                console.log(tempReal)
                this.spanLength = len
            },
            objectSpanMethod({rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if (rowIndex === 0) {
                        return {
                            rowspan: this.spanLength,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },
          // 修改 table cell边框的背景色
          //   tableCellStyle () {
          //     return 'border-color: #838383;'
          //   },
            // 修改 table header cell的背景色
            tableHeaderCellStyle () {
              return 'border-color: #ebecf1; color: #606266;'
          }
        }
    }
</script>

<style scoped>
#cell-class-name {
    border-color: #ebecf1;
    width: 100%;
}
.el-table--cell-class-name {
  border-color: #cccccc;
}
</style>