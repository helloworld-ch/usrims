import request from '@/utils/request'

export function login(username,password,) {
    return request({
        url: '/zushiye/user/login',
        method: 'post',
        data: {
            username,
            password,
        }
    })
}

export function getInfo(token){
    return request({
        url:`/zushiye/rem-user/getInfo/${token}`,
        method:'get',
    })
}

export function faceLogin(img){
    return request({
        url:`/zushiye/user/searchFace`,
        method:'post',
        data:img
    })
}


