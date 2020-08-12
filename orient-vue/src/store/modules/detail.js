
import {getPreResult} from "@/requests/server"

const moduleDetail={
    state:{
        industryDataPre:[],
        industryDataReal:[],
        predictStock:[],
        realStock:[],
        stockDataDetail:[]
    },
    getters:{},
    mutations:{
        // RealResult:(state,param)=>{
        //     // state.industryDataPre=param.industryDataPre;
        //
        //
        //     // state.predictStock=param.predictStock
        // },
        PreResult:(state,param)=>{
            // state.stockDataDetail=param.stockDataDetail;
            state.realStock=param.realStock;
            state.predictStock=param.predictStock
            state.industryDataReal=param.industryDataReal;
            state.industryDataPre=param.industryDataPre;
        }

    },
    actions:{
        //  async real_result(context,param){
        //
        //     var res= await getRealResult(param);
        //     let data=res.data.result;
        //     console.log(data)
        //     if(data!==undefined){
        //         context.commit('RealResult',data)
        //     }
        // },
        async pre_result(context,param){
            let res= await getPreResult(param);
            let data = res.data.result;
            console.log(data)
            if (data !== undefined) {
                context.commit('PreResult',data)
            }
        }
    }
}
export default moduleDetail