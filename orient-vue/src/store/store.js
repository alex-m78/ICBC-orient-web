import Vue from 'vue';
import Vuex from 'vuex';
import moduleNav from './modules/nav'
import modulesIndex from './modules/index'
import moduleDetail from './modules/detail'
import moduleRowData from "./modules/search";



Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        isLoading:false
    },
    mutations:{
        LOADING(state,loading){
            state.isLoading=loading
        }
    },
    modules:{
        moduleNav,
        modulesIndex,
        moduleDetail,
        moduleRowData,
    }
})

