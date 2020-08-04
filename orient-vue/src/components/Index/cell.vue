<template>
  <div class="cell panel">
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
  }
}
@media(min-width:1280px){
  .cell{
    margin: 15px;
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