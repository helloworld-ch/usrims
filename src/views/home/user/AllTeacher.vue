<template>
  <div id = "teacher">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.id" placeholder="教师号"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="教师名"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacherQuery.iden" clearable placeholder="教师身份">
          <el-option :value="2" label="讲师"/>
          <el-option :value="3" label="教授"/>
          <el-option :value="4" label="副教授"/>
          <el-option :value="5" label="助教"/>
        </el-select>
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
          label="帐号"
          width="150"
          align="center"
          prop="id">
      </el-table-column>

      <el-table-column prop="name" label="姓名" width="180" align="center"/>

      <el-table-column prop="iden" label="身份" width="180" align="center"/>

      <el-table-column prop="collage" label="学校" width="220" align="center"/>

      <el-table-column prop="number" label="研究数目" width="150" align="center"/>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="danger" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="primary" size="mini" icon="el-icon-view" @click="getResearchInfo(scope.row.id)">查看</el-button>
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
  </div>
</template>

<script>
import teacher from '@/api/teacher/teacher'
export default {
  data() {
    return {
      list:null,//查询之后接口返回集合
      page:1,//当前页
      limit:6,//每页记录数
      total:0,//总记录数
      teacherQuery:{} //条件封装对象
    }
  },
  methods:{
    getList(page=1) {
      this.page = page
      teacher.getTeacherListPage(this.page,this.limit,this.teacherQuery)
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
    getResearchInfo(id){

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
#teacher{
  text-align: center;
}
.el-table{
  height: 380px;
}
</style>
