/*
 * 用来存放一些模拟用户的数据
 * */

// import Mock from 'mockjs'
// const users = [{
//         id: 1,
//         username: 'hsj',
//         password: '123456',
//         email: '18210720061@fudan.edu.cn',
//         name: '何思婕'
//     },
//     {
//         id: 2,
//         username: 'admin',
//         password: '123456',
//         email: 'lhr_cecil@163.com',
//         name: '李浩然'
//     }
// ];
//
// export { users }
/*
 * 用户管理模块
 */

// 保存
export function save() {
    return {
        url: 'http://localhost:8080/user/save',
        type: 'post',
        data: {
            "code": 200,
            "msg": null,
            "data": 1
        }
    }
}// 删除
export function del() {
    return {
        url: 'http://localhost:8080/user/delete',
        type: 'post',
        data: {
            "code": 200,
            "msg": null,
            "data": 1
        }
    }
}
// 分页查询
export function findPage() {
    return {
        url: 'http://localhost:8080/user/findPage',
        type: 'post',
        data: findPageData
    }
}