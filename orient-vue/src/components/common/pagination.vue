<template>
    <el-pagination layout="prev, pager, next" :page-size="pageSize" :total="total"></el-pagination>
</template>
<script>
export default {
    data(){
        return {
            total:50,
            pageSize:5
        }
    }
}
</script>