import request from '@/utils/request'

export default {
    getTeacherListPage(current,limit,query) {
        return request({
            url: `/zushiye/teacher/getPageById/${current}/${limit}`,
            method: 'post',
            data:query
        })
    },
    getTeacherByResearchId(id){{
            return request({
                url:`/zushiye/teacher/getTeacherByResearchId/${id}`,
                method:'get',
            })
        }
    }
}


