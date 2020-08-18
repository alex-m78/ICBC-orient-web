
import {getRowData} from "@/requests/server"

const  moduleRowData={
    state:{
        stockRowData:[],
    },
    mutations:{
        RowData:(state,param)=>{
            state.stockRowData.pop()
            state.stockRowData.push(param);
        }

    },
    actions:{
        async row_data(context,param){
            // console.log(param)
            let res= await getRowData(param);
            // console.log(res)
            let data = res.data.result;
            if (data !== undefined) {
                context.commit('RowData',data)
            }
        }
    }
}
export default  moduleRowData
