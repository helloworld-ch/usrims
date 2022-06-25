<template>
  <div id = "research">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.id" placeholder="科研号"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="科研名"/>
      </el-form-item>

      <el-form-item>
        <el-input v-model="teacherQuery.teacher" placeholder="带队老师"/>
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
        :data="list"
        border
        fit
        highlight-current-row>

      <el-table-column
          label="科研号"
          width="150"
          align="center"
          prop="id">
      </el-table-column>

      <el-table-column prop="name" label="科研名" width="220" align="center"/>

      <el-table-column prop="type" label="类型" width="180" align="center"/>

      <el-table-column prop="teacher" label="带队老师" width="180" align="center"/>

      <el-table-column prop="number" label="学生人数" width="150" align="center"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/home/research/edit/'+scope.row.id">
            <el-button type="danger" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="primary" size="mini" icon="el-icon-view" @click="getResearchInfo(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
        :current-page="page"
        :page-size="limit"
        :total="total"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="getList"
    />

    <el-drawer
        :title="name"
        :visible.sync="drawer"
        :direction="direction"
        :with-header="false"
        size="60%"
        style="background-color:#54e350;"
    >
      <div class = "info_title">
        <div class = "title" style="font-size: 28px;line-height: 70px">
          {{name}}
        </div>
      </div>
      <div class = "info_body">
        <div class = "teacher_info">
          <div class = "person_header">
            <span style="font-size: 20px;font-weight: bold">指导老师</span>
          </div>
          <div class="a_box">
            <div class="th_list" v-for="item in teachers" :key="name"><label class="_ha">{{ item }}</label></div>
          </div>
        </div>
        <div class = "info_center">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in infos" :key="item.image">
              <el-image :src="item.image"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class = "student_info">
          <div class = "person_header">
            <span style="font-size: 20px;font-weight: bold">研究成员</span>
          </div>
          <div class="a_box">
            <div class="th_list" v-for="item in students" :key="name"><label class="_ha">{{ item}}</label></div>
          </div>
        </div>
        <div class = "info_footer">
          <div id = "title">{{ info_title }}</div>
          <el-divider></el-divider>
        </div>
      </div>
    </el-drawer>
  </div>

</template>

<script>
import research from "@/api/project/research";
import teacher from "@/api/teacher/teacher";
import student from "@/api/teacher/student";
export default {
  data() {
    return {
      info_title:"机场比婚礼殿堂见过了更多真挚的亲吻，医院的墙比教堂聆听了更多的祷告，课桌上刻着比海深的情话！",
      drawer: false,
      direction:"ttb",
      list:null,//查询之后接口返回集合
      page:1,//当前页
      limit:6,//每页记录数
      total:0,//总记录数
      teacherQuery:{}, //条件封装对象
      infos:[{
        image:"https://pic4.zhimg.com/v2-e24855e2d87577bd7cff4eefcbc58973_r.jpg",
      },{
        image:"https://pic4.zhimg.com/v2-701f6e4cdf8ddaa3a40b05899705dedf_r.jpg",
      },{
        image:"https://pic1.zhimg.com/v2-065f8751a6e8b2200a84243b399ff118_r.jpg"
      },{
        image:"https://pic1.zhimg.com/v2-af16da70cb8e243abd76406cc4c52df4_r.jpg",
      },],
      name:'hhh',
      number:2,
      students:[],
      teachers:[],
    }
  },
  methods:{
    getList(page=1) {
      this.page = page
      research.getTeacherListPage(this.page,this.limit,this.teacherQuery)
          .then(response =>{//请求成功
            this.list = response.data.rows
            this.total = response.data.total
          }).catch(err=>{
        console.log(err)
      })
    },
    resetData(){
      //1.将表单清空
      this.teacherQuery = {}
      //2.显示所有页面
      this.getList()
    },
    getResearchInfo(row){
      this.drawer = true
      this.name = row.name
      teacher.getTeacherByResearchId(row.id).then(response=>{
        this.teachers = response.data.list
      })
      student.getStudentByResearchId(row.id).then(response=>{
        this.students = response.data.list
      })
    }
  },
  created(){
    this.getList()
  },
  mounted(){

  }
}
</script>

<style scoped>
.info_title{
  width: 100%;
  height: 20%;
  background-color: #54e350;
}
.person_header{
  background-color: greenyellow;
  height: 60px;
  line-height: 60px;
}
#research{
  text-align: center;
}
.el-table{
  height: 380px;
}
.el-drawer{
  text-align: center;
}
.info_body{
  width: 100%;
  height: 80%;
  text-align: center;
  position: relative;
}
.info_center{
  top:0;
  left: 25%;
  width: 50%;
  height: 80%;
  background-color: #efefee;
  position: absolute;
  box-shadow: 0 0 10px 5px rgba(105, 105, 105, 0.58);
  /*z-index: 11;*/
}
.teacher_info{
  top:0;
  left: 5%;
  width: 19%;
  height: 80%;
  background-color: #efefee;
  position: absolute;
  box-shadow: 0 0 10px 5px rgba(105, 105, 105, 0.58);
  /*z-index: 11;*/
}
.student_info{
  top:0;
  left: 76%;
  width: 19%;
  height: 80%;
  background-color: #efefee;
  position: absolute;
  box-shadow: 0 0 10px 5px rgba(105, 105, 105, 0.58);
}
.info_footer{
  top:81%;
  left: 10%;
  width: 80%;
  height: 19%;
  background-color: rgba(0, 255, 204, 0.13);
  position: absolute;
  line-height: 200%;
}
#title{
  font-size: 18px;
}
.el-divider{
  margin: 0;
}
.a_box {
  border-left: 1px solid rgb(83, 82, 82);
  border-right:1px solid rgb(83, 82, 82);
  width: 200px;
  height: 160px;
  margin-left: 10px;
  display: inline-block;
}

.a_box .th_list {
  border-radius: 2px;
  /* background-color: rgb(223, 221, 221); */
}
.a_box ul::-webkit-scrollbar {
  display: none;
}
._ha {
  display: inline-block;
  width: 200px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  color: rgb(68, 67, 67);
}



</style>
