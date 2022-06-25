<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="科研名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="科研类型" prop="region">
        <el-select v-model="ruleForm.type" placeholder="请选择科研类型">
          <el-option label="分布式" value="00000"></el-option>
          <el-option label="智能算法" value="00001"></el-option>
          <el-option label="艺术鉴赏" value="00002"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="带队老师号" prop="name">
        <el-input v-model="ruleForm.teacher"></el-input>
      </el-form-item>
      <el-form-item label="科研简介" prop="desc">
        <el-input type="textarea" v-model="ruleForm.info"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import research from "@/api/project/research";
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        type: '',
        teacher:'',
        info: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入科研名称', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择科研类型', trigger: 'change' }
        ],
        teacher: [
          { required: true, message: '请输入带队老师号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '请填写简介', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(ruleform) {
      research.addResearch(ruleform).then(response=>{
        //提示信息
        this.$message({
          type: response.data.flag,
          message: response.message,
        });
        //回到列表页面 路由跳转
        this.$router.push({path:'/home/research/allResearch'})
      }).catch(err=>{
        console.log(err)
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>

</style>
