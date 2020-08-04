import Vue from 'vue';
import Vuex from 'vuex';
import moduleNav from './modules/nav'
import modulesIndex from './modules/index'
import moduleDetail from './modules/detail'



Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        moduleNav,
        modulesIndex,
        moduleDetail,
    }
})

