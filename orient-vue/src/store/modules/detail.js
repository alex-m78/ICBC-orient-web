
import {getModelResult} from "../../requests/server"

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
        MODELRESULT:(state,param)=>{
            console.log(param)
            state.industryDataPre=param.industryDataPre;
            state.industryDataReal=param.industryDataReal;
            state.predictStock=param.predictStock
            state.realStock=param.realStock;
            state.stockDataDetail=param.stockDataDetail;
        }
    },
    actions:{
        async model_result(context,param){
            let res= await getModelResult(param);
            let data=res.data.result;
            context.commit('MODELRESULT',data)
        }
    }
}
export default moduleDetail