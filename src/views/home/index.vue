<template>
  <div class = "home">
    <el-container>
      <el-header>
        <div class = "title_box">
          <div id = "title">
            欢迎使用科研管理系统
            <div style="float: right;width: 100px;height: 40px;background-color:greenyellow;font-size: 14px;border-radius: 20px;margin-top: 2px;line-height: 40px">退出登录</div>
          </div>

          <el-divider></el-divider>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="24">
              <h3 style="font-weight: bold;color: #00ffb7;text-align: center">交互操作</h3>
              <el-menu
                  style="text-align: center"
                  default-active="2"
                  class="el-menu-vertical-demo"
                  background-color="#2c3e50"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  router>
                <el-menu-item index="1" route="/home/research/allResearch">
                  <i class="el-icon-menu"></i>
                  <span slot="title">科研项目</span>
                </el-menu-item>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1" route="/home/user/allStudent">学生管理</el-menu-item>
                    <el-menu-item index="2-2" route="/home/user/allTeacher">导师管理</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-notebook-2"></i>
                    <span>项目审核</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1" route="/home/project/reviewProject">审核项目</el-menu-item>
                    <el-menu-item index="3-2" route="/home/project/addProject">添加项目</el-menu-item>
                    <el-menu-item index="3-3" route="/home/project/issueProject">版本发布</el-menu-item>
                    <el-menu-item index="3-4" route="/home/research/addVersion">添加版本</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="4" route="/home/user/addUser">
                  <i class="el-icon-setting"></i>
                  <span slot="title">添加用户</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <main_table></main_table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import main_table from '@/components/MainTable'
export default {
  name: "index",
  components:{
    main_table
  }
}
</script>

<style scoped>
.el-header{
  background-color: #54e350;
}
.el-container{
  background-color: #d0d9d9;
  height: 580px;
}
.el-aside{
  background: #2c3e50;
  height: 580px;
}
.title_box{
  text-align: center;
  line-height: 50px;
}
.el-divider{
  margin: 0;
}
#title{
  font-size: 28px;
}


</style>
