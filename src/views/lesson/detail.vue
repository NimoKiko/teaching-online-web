<template>
  <div class="container">
    <div class="textBox">
      <div class="text">课程名称</div>
      <div type="text" class="content">&nbsp;&nbsp;&nbsp;数据库设计与分析</div>
    </div>
    <div class="textBox" style="margin-top: 40px">
      <div class="text">任课教师</div>
      <div type="text" class="content">&nbsp;&nbsp;&nbsp;张三</div>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        highlight-current-row
        border
      >
        <el-table-column
          label="序号"
          prop="id"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          label="姓名"
          prop="name"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: "张三",
        },
        {
          id: 2,
          name: "李四",
        },
        {
          id: 3,
          name: "王五",
        },
        {
          id: 4,
          name: "钱六",
        },
      ],
    };
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