import Vue from 'vue'
import App from './App.vue'
import './assets/style/normal.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/route'
// import mock from "@/mock/mock";
import echarts from "echarts"
import $service from "./requests/index"
import axios from 'axios'
// mock.init();
Vue.prototype.$ajax = axios;
// axios.defaults.baseURL = '/api'
Vue.prototype.$echarts = echarts

import store from './store/store'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use($service)
Vue.prototype.$goRoute = function(index) {
    this.$router.push(index)
};

router.beforeEach((to, from, next) => {
    // console.log("123")
    let token = sessionStorage.getItem('token');
    let role =JSON.parse( sessionStorage.getItem('role'));
    // console.log(role)
    if (to.path === '/login') {
        next()
    } else {
        if (token === '' || token == null) {
            next('/login');
            
        } else {
            store.dispatch('generateRoutes',role).then(()=>{
                router.addRoutes(store.state.moduleNav.dynamicRouterMap)
                router.options.routes=store.state.moduleNav.staticRouterMap
            })
            // console.log(router)
            next()
            // if (to.path === '/manage') {
            //     alert(role == '"admin"')
            //     if (role == '"admin"'){
            //         next()
            //     }

            // }
            // else {
            //     next()
            // }
        }
    }
});

$(window).resize(function () {location.reload();})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
}).$mount('#app');