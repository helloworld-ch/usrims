import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {
          path:"/",
          redirect:"/login",
        },
        {
            path:"/login",
            component:()=>import("@/views/login"),
            // name:"登录",
            meta:{show:false},
        },{
            path:"/join",
            component:()=>import("@/views/join"),
            // name:"登录",
            meta:{show:false},
        }, {
            path:"/home",
            component:()=>import("@/views/home"),
            redirect:'/home/research/allResearch',
            meta:{show:false},
            children:[{
                path:"/home/user",
                redirect:"/home/user/allTeacher",
                children:[{
                    path:"/home/user/allTeacher",
                },{
                    path:"/home/user/allStudent",
                }]
            },{
                path:"/home/research",
                redirect:'/home/research/allResearch',
                children:[{
                    path: '/home/research/edit/:id',
                },{
                    path:"/home/research/allResearch",
                },{
                    path: "/home/research/addVersion"
                }]
            },{
                path:"/home/project",
                redirect:"/home/project/reviewProject",
                children:[{
                    path:"/home/project/reviewProject",
                },{
                    path:"/home/project/addProject",
                },{
                    path:"/home/project/issueProject"
                }]
            },{
                path:"/home/user/addUser"
            }]
        }]

})





