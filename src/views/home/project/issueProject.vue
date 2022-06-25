<template>
  <div id = "version">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.id" placeholder="科研号"/>
      </el-form-item>
      <el-form-item>
        <el-input v-model="teacherQuery.v" placeholder="版本"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacherQuery.isIssue" clearable placeholder="是否发布">
          <el-option :value="0" label="未发布"/>
          <el-option :value="1" label="已发布"/>
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
          label="科研号"
          width="150"
          align="center"
          prop="id">
      </el-table-column>

      <el-table-column prop="v" label="版本" width="80" align="center"/>

      <el-table-column prop="teacher" label="带队老师号" width="150" align="center"/>

      <el-table-column prop="teacherName" label="带队老师名" width="120" align="center"/>

      <el-table-column prop="title" label="链接" width="300" align="center"/>

      <el-table-column label="操作" width="290" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="issueProject(scope.row.id,scope.row.v)" v-if="scope.row.isIssue === 0">发布</el-button>
          <el-button type="warning" size="mini" icon="el-icon-view" @click="downProject(scope.row.id,scope.row.v)" v-if="scope.row.isIssue !== 0">下架</el-button>
          <el-button type="danger" size="mini" icon="el-icon-edit" @click="removeProject(scope.row.id,scope.row.v)">删除</el-button>
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
import version from "@/api/project/version";
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
      version.getResultListPage(this.page,this.limit,this.teacherQuery)
          .then(response =>{//请求成功
            this.list = response.data.rows
            this.total = response.data.total
          }).catch(err=>{
        console.log(err)
      })
    },
    issueProject(id,v){
      version.issueProject(id,v).then(response=>{
        //提示信息
        this.$message({
          type: "success",
          message: response.message,
        });
        //刷新页面
        this.getList()
      }).catch(err=>{
        console.log(err)
      })
    },
    removeProject(id,v){
      version.removeProject(id,v).then(response=>{
        //提示信息
        this.$message({
          type: "success",
          message: response.message,
        });
        //刷新页面
        this.getList()
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
    downProject(id,v){
      version.downProject(id,v).then(response=>{
        //提示信息
        this.$message({
          type: "success",
          message: response.message,
        });
        //刷新页面
        this.getList()
      })
    },
    getResearchInfo(id){

    },

  },
  created(){
    this.getList()
  },
  mounted(){

  }
}
</script>

<style scoped>
#version{
  text-align: center;
}
.el-table{
  height: 380px;
}
</style>

