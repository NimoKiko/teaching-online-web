<template>
  <div class="container">
    <div class="textBox">
      <div class="text">课程名称</div>
      <div type="text" class="content">&nbsp;&nbsp;&nbsp;{{ lessonname }}</div>
    </div>
    <div class="textBox" style="margin-top: 40px">
      <div class="text">任课教师</div>
      <div type="text" class="content">&nbsp;&nbsp;&nbsp;{{ teaname }}</div>
    </div>
    <div class="table">
      <el-table
        :data="lessonStdList"
        style="width: 100%"
        highlight-current-row
        border
      >
        <el-table-column
          label="序号"
          type="index"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          label="学号"
          prop="stdnum"
          align="center"
        ></el-table-column>
        <el-table-column
          label="姓名"
          prop="stdname"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { Plus, ElMessage } from "@element-plus/icons";
import { mapState } from "vuex";
import Vue from "vue";
export default {
  data() {
    return {
      lessonname: "",
      teaname: "",
    };
  },
  mounted() {
    console.log(this.$route.params);
    let params = this.$route.params;
    this.lessonname = params.lessonname;
    this.teaname = params.teaname;

    this.$store.dispatch("getLessonStd", { id: params.id });
  },
  computed: {
    ...mapState({
      lessonStdList: (state) => state.final.lessonStdList,
    }),
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  .textBox {
    // border: 1px solid red;
    width: fit-content;
    height: 50px;
    line-height: 50px;
    display: flex;
    flex-direction: row;
    margin-left: 20px;
    .text {
      width: 80px;
      text-align: center;
      // border: 1px solid rgb(192, 192, 192);
      background-color: rgb(77, 165, 238);
      color: white;
      font-weight: bold;
    }
    .content {
      width: 300px;
      border: 1px solid rgb(192, 192, 192);
    }
  }
  .table {
    width: 300px;
    margin-left: 20px;
    margin-top: 40px;
  }
}
</style>