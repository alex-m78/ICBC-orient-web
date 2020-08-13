import {getCellData} from '../../requests/server'
const moduleIndex={
    state:{
        newStockInfo:[
            {
                symbol: "2020-07-14",
                stockName: "王瑞璞",
                count: "湖北省武汉市樱花大厦"
            },
        ],
        stockWeekInfo:[]
    },
    getters:{
        newStockInfoSize:state=>state.newStockInfo.length
    },
    mutations:{
        // 预测前五股票七日曲线
        WEEKINFO:(state,param)=>{
            state.stockWeekInfo=param.result
        },
        // 新进股信息
        NEWSTOCKINFO:(state,param)=>{
            state.newStockInfo=param.result
        }

    },

    actions:{
        async stock_week_info(context){
            let res=await getCellData()
            let data=res.data.result;
            let result=[];
            for(let index in data){
                result.push(data[index])
            }
            context.commit('WEEKINFO',{result:result})
        }
    }
}
export default moduleIndex;
