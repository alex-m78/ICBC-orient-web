<template>
  <div class="cell panel">
    <div class="stock_name">{{stockName}}</div>
    <cellchart v-bind="$attrs"></cellchart>
  </div>
</template>
<script>
import cellchart from "@/components/Index/cellchart";
export default {
  name: "cell",
  
  data() {
    return {};
  },
  computed: {
    stockName() {
      return this.$attrs.weekStock.stockName
    },
  },
  components: {
    cellchart
  },
  methods:{}
};
</script>
<style scoped>
.cell {
  flex: 1 1 20%;
  height: 90%;
  margin: 5px 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  /* border: 1px solid green; */
}

@media(min-width:800px){
  .cell{
    margin: 5px;
    position: relative;
  }
  .stock_name{
    position: absolute;
    font-size: 10px;
    left: 10px;
    top: 5px;
    font-weight: 600;
    letter-spacing: 2px;
    color: #6886c5;
  }
}
@media(min-width:1280px){
  .cell{
    margin: 15px;
  }
}
@media(min-width:1600px){
  .stock_name{
    position: absolute;
    font-size: 16px;
    left: 10px;
    top: 5px;
    font-weight: 600;
    letter-spacing: 2px;
    color: #6886c5;
  }
}
/* .chart {
  height: 100%;
  width: 100%;
} */
.icon {
  width: 40px;
  height: 40px;
  /* border: 1px solid blue; */
  margin: 0 30px;
}
.main > p {
  color: #aaa;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
}
.main > span {
  font-weight: bold;
  font-size: 18px;
}
</style>