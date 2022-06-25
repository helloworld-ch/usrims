<template>
  <teacher v-if='this.$route.path ==="/home/user/allTeacher"'></teacher>
  <student v-else-if="this.$route.path === '/home/user/allStudent'"></student>
  <research v-else-if="this.$route.path === '/home/research/allResearch'"></research>
  <AddProject v-else-if="this.$route.path === '/home/project/addProject'"></AddProject>
  <review-project v-else-if="this.$route.path === '/home/project/reviewProject'"></review-project>
  <user v-else-if="this.$route.path === '/home/user/addUser'"></user>
  <issue-project v-else-if="this.$route.path === '/home/project/issueProject'"></issue-project>
  <update-research v-else-if="this.$route.path.substr(0,20) === '/home/research/edit/'"></update-research>
  <add-version v-else-if="this.$route.path === '/home/research/addVersion'"></add-version>
</template>

<script>
import teacher from '@/views/home/user/AllTeacher'
import student from '@/views/home/user/AllStudent'
import research from '@/views/home/research/AllResearch'
import AddProject from "@/views/home/project/addProject";
import ReviewProject from "@/views/home/project/reviewProject";
import user from '@/views/home/user/addUser'
import IssueProject from "@/views/home/project/issueProject";
import UpdateResearch from "@/views/home/research/updateResearch";
import AddVersion from "@/views/home/research/addVersion";
export default {
  name: "index",
  components:{
    AddVersion,
    UpdateResearch,
    IssueProject,
    ReviewProject,
    AddProject,
    teacher,
    student,
    research,
    user
  }
}
</script>

<style scoped>

</style>
