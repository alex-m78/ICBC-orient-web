import $axios from "./server.util";

export const Login = data => {
    return $axios({
        url: '/login',
        methods: 'get',
        params: data
    })
};

const GetCar = data => {
    return $axios({
        url: "/car",
        methods: "get",
        params: data
    })
};

const GetStockHold = data => {
    return $axios({
        url: "/stockHolds",
        methods: "get",
        params: data
    })
};

const GetIndustry = data =>{
    return $axios({
        url: "/industries",
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
export const getRealResult = data => {
    return $axios({
        url:"/modelResults",
        methods:"get",
        params: data
    })
};
export const getPreResult = data => {
    return $axios({
        url:"/kafkaResults",
        methods:"get",
        params: data
    })
};
const getUser = data => {
    return $axios({
        url: "/userInfo",
        methods: "get",
        params: data
    })
};
const editUserRole = data => {
    return $axios({
        url: "/userRole",
        methods: "get",
        params: data
    })
};
const deleteUser = data => {
    return $axios({
        url: "/userDelete",
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
        methods:"get",
        params:data
    })
}


const getStockQuarter = data =>{
    return $axios({
        url: "/seasonShare",
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
export const getRowData = data =>{
    return $axios({
        url: '/metaData',
        methods: "get",
        params: data
        }
    )
}

const getFeedBacks=()=>{
    return $axios({
        url:'/feedBacks',
        methods:'get',
    })
}
const deleteFeedBacks=(data)=>{
    return $axios({
        url:'/feedBack',
        methods:'delete',
        params:data

    })
}
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
    // getRealResult,
    getPreResult,
    getUser,
    editUserRole,
    deleteUser,
    signUp,
    getStockQuarter,
    getFeedBacks,
    deleteFeedBacks,
    feedBack,
    getRowData
}
