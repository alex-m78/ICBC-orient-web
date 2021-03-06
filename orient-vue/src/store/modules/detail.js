
import {getPreResult} from "@/requests/server"

const moduleDetail={
    state:{
        industryDataPre:[],
        industryDataReal:[],
        predictStock:[],
        realStock:[],
        stockDataDetail:[],
        accuracy:0,
        precisionTop30:0,
    },
    mutations:{
        PreResult:(state,param)=>{
            state.stockDataDetail=param.stockDataDetail;
            state.realStock=param.realStock;
            state.predictStock=param.predictStock
            state.industryDataReal=param.industryDataReal;
            state.industryDataPre=param.industryDataPre;
            state.accuracy=(param.accuracy*100).toFixed(2);
            state.precisionTop30=(param.precisionTop30*100).toFixed(2);
        }

    },
    actions:{
        async pre_result(context,param){
            console.log(param)
            let res= await getPreResult(param);
            console.log(res)
            let data = res.data.result;
            if (data !== undefined) {
                context.commit('PreResult',data)
            }
        }
    }
}
export default moduleDetail