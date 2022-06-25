<template>
  <div id = 'user'>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户号" prop="id">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="高校id" prop="collage_id">
        <span><el-input v-model="ruleForm.college_id"></el-input></span>
        <div class = 'tip'>
          <span class = "search" @click="resetQuery"><el-link :underline="false" style="font-size: 18px;font-weight: bold;color: #00ffb7">帮助</el-link></span>
          <el-card class="box-card" shadow="always">
            <div slot="header" class="clearfix">
              <el-input v-model="query.collage_name" placeholder="请输入查找的高校名"></el-input>
              <span class = 'search'><el-button icon="el-icon-search" circle @click="queryCollageByName"></el-button></span>
            </div>
            <div>
              {{query.collage_name}} : {{query.collage_id}}
            </div>
          </el-card>
        </div>
      </el-form-item>

      <el-form-item label="用户身份" prop="type">
        <el-select v-model="ruleForm.type" placeholder="请选择用户类型">
          <el-option label="学生" value="0"></el-option>
          <el-option label="导师" value="1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学生年级" prop="type" v-if="ruleForm.type === '0'">
        <el-select v-model="ruleForm.grade" placeholder="年级">
          <el-option :value=1 label="大一"/>
          <el-option :value=2 label="大二"/>
          <el-option :value=3 label="大三"/>
          <el-option :value=4 label="大四"/>
        </el-select>
      </el-form-item>

      <el-form-item label="导师身份" prop="type" v-if="ruleForm.type === '1'">
        <el-select v-model="ruleForm.iden" placeholder="教师身份">
          <el-option :value="2" label="讲师"/>
          <el-option :value="3" label="教授"/>
          <el-option :value="4" label="副教授"/>
          <el-option :value="5" label="助教"/>
        </el-select>
      </el-form-item>

      <el-form-item label="人物简介" prop="desc">
        <el-input type="textarea" v-model="ruleForm.info"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit(ruleForm)">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import user from "@/api/teacher/user";
export default {
  data() {
    return {
      query:{
        collage_id:'',
        collage_name:'',
      },
      ruleForm: {
        name: '',
        type: '',
        id:'',
        info: '',
        grade:1,
        iden:'',
        password:'',
        college_id:'',
      },
      rules: {
        id: [
          { required: true, message: '请输入用户号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择用户身份', trigger: 'change' }
        ],
        iden:[
          { required: true, message: '请选择用户身份', trigger: 'change' }
        ],
        grade: [
          { required: true, message: '请选择用户身份', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 1, max: 30, message: '长度1~30个字符', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '请填写简介', trigger: 'blur' }
        ],
        password: [
          {required:true,message:'请填写密码',trigger:'blur'},
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        college_id:[
          {required:true,message:'请填写高校id',trigger:'blur'},
          { min: 3, max: 3, message: '长度为3个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submit(ruleform) {
      // console.log(ruleform)
      user.addUser(ruleform).then(response=>{
        //提示信息
        this.$message({
          type: response.data.flag,
          message: response.message,
        });
        //回到列表页面 路由跳转
        if(response.data.flag === "success"){
          this.$router.push({path:'/home/user'})
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    queryCollageByName(){
      //先重置高校
      user.queryCollegeByName(this.query.collage_name).then(response=>{
        this.query.collage_id = response.data.collage_id
      })
    },
    resetQuery(){
      this.query.collage_id=''
      this.query.collage_name = ''
    }
  }
}
</script>

<style scoped>
/*#collage{*/
/*  width: 80%;*/
/*  display: inline-block;*/
/*}*/
.search{
  display: inline-block;
  position: absolute;
  right: 5px;
}
.box-card{
  visibility: hidden;
  width: 20%;
  height: 500%;
  position: absolute;
  right: 5%;
  top:30%;
  z-index: 11;
  font-size: 14px;
}
.tip:hover .box-card{
  visibility: visible;
}
</style>

