import router from "../../router/route"
import {dynamicRouter,routes} from "../../router/route"
const moduleNav={
    state:{
        role:'',
        staticRouterMap:routes,//静态路由
        dynamicRouterMap:[]//要加载的动态路由，会被拼接到静态路由中
    },
    getters:{
        menuList:state=>state.staticRouterMap[1].children
    },
    mutations:{
        SETROUTERS(state,routers){
            state.dynamicRouterMap=routers
            state.staticRouterMap=routes
            // 拼接路由
            state.staticRouterMap=state.staticRouterMap.concat(routers)
        }
        
    },

    actions:{
        generateRoutes(context,role){
            return new Promise(resolve=>{
                const accessedRouter=dynamicRouter;
                // 管理员添加用户列表
                if(role==='user'){
                    accessedRouter[0].children=dynamicRouter[0].children.filter(v=>{
                        return !v.meta
                    })
                }
                context.commit('SETROUTERS',accessedRouter);
                resolve();
        })
    },
    initRoutes(){
        router.addRoutes(this.state.dynamicRouterMap)
        router.options.routes=this.state.staticRouterMap
    }
}
}

export default moduleNav;