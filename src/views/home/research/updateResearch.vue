<template>
  <div>
    <div class = "updateStep">
      <el-steps :active="active" simple>
          <el-step title="步骤 1" icon="el-icon-edit"></el-step>
          <el-step title="步骤 2" icon="el-icon-upload"></el-step>
          <el-step title="步骤 3" icon="el-icon-picture"></el-step>
      </el-steps>
      <div>
        <el-button style="margin-top: 12px;float:left;" @click="last">上一步</el-button>
        <el-button style="margin-top: 12px;float:right;" @click="next">下一步</el-button>
      </div>
    </div>
    <div class = "info">
      <div class = "step_one" v-if="this.active === 0">
        <el-divider></el-divider>
        <addProject/>
      </div>
      <div class = "step_two" v-else-if="this.active === 1">

      </div>
      <div class = "step_three" v-else-if="this.active === 2">

      </div>
    </div>
  </div>
</template>

<script>
import addProject from "@/views/home/project/addProject";
export default {
  components:{
    addProject
  },
  data() {
    return {
      active: 0
    };
  },

  methods: {
    next() {
      if (this.active++ > 1) this.active = 0;
    },
    last(){
      if(this.active--<1)this.active = 0;
    }
  }
}
</script>

<style scoped>
.updateStep{
  height: 120px;
  /*background-color: #fff;*/
}
.info{
  background-color: #f8f8f8;
  width: 100%;
  height: 420px;
  border-radius: 40px;
}
.step_one{
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  border-radius: 40px;
}
.el-divider{
  margin-top:0 ;
}
.step_two{
  width: 100%;
  height: 100%;
  background-color: green;
  border-radius: 40px;
}
.step_three{
  width: 100%;
  height: 100%;
  background-color: blue;
  border-radius: 40px;
}

</style>
