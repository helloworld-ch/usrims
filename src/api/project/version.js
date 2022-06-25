import request from "@/utils/request";

export default {
    getResultListPage(current,limit,query) {
        return request({
            url: `/zushiye/result/getPageById/${current}/${limit}`,
            method: 'post',
            data:query
        })
    },
    issueProject(id, ver) {
        return request({
            url:`/zushiye/result/issueProject/${id}/${ver}`,
            method:'get',
        })
    },
    removeProject(id,v){
        return request({
            url:`/zushiye/result/removeProject/${id}/${v}`,
            method:"delete",
        })
    },
    downProject(id,v) {
        return request({
            url:`/zushiye/result/downProject/${id}/${v}`,
            method:'get',
        })

    }
}

