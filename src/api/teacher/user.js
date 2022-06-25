import request from '@/utils/request'

export default {
    addUser(ruleform) {
        return request({
            url:`/zushiye/college/addUser`,
            method:'post',
            data:ruleform,
        })

    },
    queryCollegeByName(name){
        return request({
            url:`/zushiye/college/queryCollageByName/${name}`,
            method:'get',
        })
    }
}
