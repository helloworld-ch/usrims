import request from '@/utils/request'

export default {
    getTeacherListPage(current,limit,query) {
        return request({
            url: `/zushiye/research/getPageById/${current}/${limit}`,
            method: 'post',
            data:query
        })
    },
    addResearch(ruleform){
        return request({
            url:`/zushiye/research/addResearch`,
            method:'post',
            data:ruleform,
        })
    }
}

