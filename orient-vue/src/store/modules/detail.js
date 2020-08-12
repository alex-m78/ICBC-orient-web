
import {getRealResult, getPreResult} from "@/requests/server"

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
        RealResult:(state,param)=>{
            state.industryDataReal=param.industryDataReal;
        },
        PreResult:(state,param)=>{
            state.stockDataDetail=param.stockDataDetail;
            state.realStock=param.realStock;
            state.predictStock=param.predictStock
            state.accuracy=(param.accuracy*100).toFixed(2);
            state.precisionTop30=(param.precisionTop30*100).toFixed(2);
            console.log(state)
        }

    },
    actions:{
         async real_result(context,param){
            var res= await getRealResult(param);
            let data=res.data.result;
            if(data!==undefined){
                context.commit('RealResult',data)
            }
        },
        async pre_result(context,param){
            let res= await getPreResult(param);
            let data = res.data.result;
            if (data !== undefined) {
                context.commit('PreResult',data)
            }
        }
    }
}
export default moduleDetail