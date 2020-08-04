import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/components/Home"
import Login from "@/components/Login"
import index from "@/components/Index"
import Detail from "@/components/Detail"
import Manage from "@/components/Manage"
// const role=sessionStorage.getItem("role")

Vue.use(Router);
// 公共路由，所有用户都可以访问

const router = new Router();
export const routes=[{
    path: '/login',
    name: 'login',
    component: Login
}]
router.addRoutes(routes);
router.options.routes=routes
console.log(router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    console.log(location)
    return originalPush.call(this, location).catch(err => err)
}
export default router

// 用户权限，动态路由
export const dynamicRouter=[
    {
        path: '/',
        name: 'home',
        redirect: '/index',
        component: Home,
        children: [
            {
                id:'1',
                path: '/index',
                name: 'index',
                component: index,
                title:'评估分析',
                icon:'el-icon-s-marketing'
            },
            {
                id:'2',
                path: '/detail',
                name: 'detail',
                component: Detail,
                title:'股票详情',
                icon:'el-icon-s-help'
            },{
                id:'3',
                path: '/manage',
                name: 'manage',
                component: Manage,
                title:'用户列表',
                icon:'el-icon-user-solid',
                meta:{
                    role:'admin'
                }
            }
        ]
    }
]