<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="科研号" prop="name">
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>
      <el-form-item label="版本名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <Editer></Editer>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleForm)">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Editer from "@/components/Editer"
export default {
  name: "addVersion",
  components:{
    Editer
  },
  data(){
    return{
      ruleForm: {
        id: '',
        name: '',
        info:"",
      },
      rules: {
        id: [
          { required: true, message: '请输入科研号', trigger: 'blur' },
          { min: 14, max: 14, message: '长度为 14 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入版本标题', trigger: 'blur' },
          { min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '请填写简介', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
