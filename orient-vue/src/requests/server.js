import $axios from "./server.util";

export const Login = data => {
    return $axios({
        url: '/login',
        methods: 'post',
        params: data
    })
};

const GetCar = data => {
    return $axios({
        url: "/Car",
        methods: "get",
        params: data
    })
};

const GetStockHold = data => {
    return $axios({
        url: "/StockHolds",
        methods: "get",
        params: data
    })
};

const GetIndustry = data =>{
    return $axios({
        url: "/Industries",
        methods: "get",
        params: data
    })
};


const getTargetCompared=data=>{
    return $axios({
        url:"/targetCompared",
        methods:"get",
        params:data
    })
};
export const getModelResult= data =>{
    return $axios({
        url:"/ModelResults",
        methods:"get",
        params: data
    })
};
const getUser = data => {
    return $axios({
        url: "/UserInfo",
        methods: "get",
        params: data
    })
};
const editUserRole = data => {
    return $axios({
        url: "/UserRole",
        methods: "get",
        params: data
    })
};
const deleteUser = data => {
    return $axios({
        url: "/UserDelete",
        methods: "get",
        params: data
    })
};
export const getCellData=()=>{
    return $axios({
        url: "/fiveStockInfo",
        methods: "get",
    })
}

const signUp=data=>{
    return $axios({
        url:"/register",
        methods:"post",
        params:data
    })
}


const getStockQuarter = data =>{
    return $axios({
        url: "/SeasonShare",
        methods: "get",
        params: data
    })
};

const feedBack = data => {
    return $axios({
        url: '/feedBack',
        methods: 'get',
        params: data
    })
};

// const getNewStockInfo = data =>{
//     return $axios({
//         url:"/newStockInfo",
//         methods:"post",
//         params: data
//     })
// }
// export const Login = {
//     async getLogin(params){
//         console.log(params);
//         let res = await axios.post('/user/login', params);
//         res = res.data;
//         return res
//     }
// };

export default {
    Login,
    GetCar,
    GetStockHold,
    GetIndustry,
    // getNewStockInfo,
    getTargetCompared,
    getModelResult,
    getUser,
    editUserRole,
    deleteUser,
    signUp,
    getStockQuarter,
    feedBack
}
