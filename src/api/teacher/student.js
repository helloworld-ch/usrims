import request from '@/utils/request'

export default {
    getTeacherListPage(current,limit,query) {
        return request({
            url: `/zushiye/student/getPageById/${current}/${limit}`,
            method: 'post',
            data:query
        })
    },
    getStudentByResearchId(id){
        return request({
            url:`/zushiye/student/getStudentByResearchId/${id}`,
            method:'get',
        })
    }
}

