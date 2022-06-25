import axios from 'axios'
import router from "@/router";
export function request(config) {
    // 创建axios的实例
    const instance = axios.create({
        baseURL: "/api",
        timeout: 5000
    })
    // 请求拦截器配置
    instance.interceptors.request.use(config => {
            // config.headers.Authorization = window.sessionStorage.getItem('token')
            return config
        }, error => {
            return Promise.error(error)
        }
    )
    // 响应拦截器配置
    instance.interceptors.response.use(response => {
        return response.data
    }, error => {
        switch (error.response.status) {
            case 401:
                console.log("无权访问")
                router.push({path: '/login'})
                break
            case 403:
                console.log("token过期啦")
                router.push({path: '/login'})
                break
            case 404:
                console.log("404啦")
                router.push({path: '/404'})
                break
            default:
                return Promise.reject(error)
        }
        return Promise.reject(error)
    })
    // 发送真正的网络请求
    return instance(config);
}
export default request
