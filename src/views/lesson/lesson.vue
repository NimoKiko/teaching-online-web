<template>
  <div class="container">
    <div class="topBox">
      <div class="inputBox">
        <div class="text">课程名称</div>
        <el-input
          type="text"
          class="input"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="inputBox">
        <div class="text">教师名称</div>
        <el-input
          type="text"
          class="input"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="btnBox">
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
      </div>
    </div>
    <div class="middleBox">
      <el-button type="text" @click="addLesson">新增课程</el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        highlight-current-row
        border
      >
        <el-table-column
          type="selection"
          width="70"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="lessonName"
          label="课程名称"
          width="180"
          align="center"
        />
        <el-table-column
          prop="teacherName"
          label="负责教师"
          width="180"
          align="center"
        />
        <el-table-column prop="stdNum" label="学生人数" align="center" />
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="gotoDetail(scope.row)"
            >
              详情
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleUpload(scope.row)"
            >
              上传附件
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="addLessonDialogVisible"
      title="新增课程"
      center
      width="25%"
      :before-close="handleClose"
    >
      <div class="titleBox">
        <div class="titleText">课程名称</div>
        <el-input
          type="text"
          class="inputText"
          v-model="lessonName"
          size="large"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText">负责教师</div>
        <el-input
          type="text"
          class="inputText"
          v-model="lessonName"
          size="large"
        ></el-input>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addLessonDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveLesson"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog
      v-model="editLessonDialogVisible"
      title="编辑"
      center
      width="25%"
      :before-close="handleClose"
    >
      <div class="titleBox">
        <div class="titleText">课程名称</div>
        <el-input
          type="text"
          class="inputText"
          v-model="lessonName"
          size="large"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText">负责教师</div>
        <el-input
          type="text"
          class="inputText"
          v-model="lessonName"
          size="large"
        ></el-input>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editLessonDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editLessonInfo"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addLessonDialogVisible: false,
      editLessonDialogVisible: false,
      lessonName: "",
      tableData: [
        {
          lessonName: "企业及数据设计",
          teacherName: "Tom",
          stdNum: "5",
        },
        {
          lessonName: "需求分析",
          teacherName: "Kethy",
          stdNum: "5",
        },
        {
          lessonName: "C语言程序设计",
          teacherName: "Alice",
          stdNum: "5",
        },
      ],
    };
  },
  methods: {
    // 处理编辑
    handleEdit() {},
    // 打开详情页面
    gotoDetail() {
      this.$router.push("/lessonDetail");
    },
    // 处理上传资料
    handleUpload() {},
    // 删除此条
    handleDelete() {},
    // 显示新增课程弹框
    addLesson() {
      this.addLessonDialogVisible = true;
    },
    // 显示编辑弹框
    handleEdit(){
      this.editLessonDialogVisible = true;
    },
    // 保存编辑信息
    editLessonInfo(){

    },
    // 保存新增信息
    saveLesson(){

    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 95%;
  margin-top: 42.179px;
  background: white;
  .topBox {
    display: flex;
    flex-direction: row;
    padding-top: 10px;
    .inputBox {
      // border: 1px solid red;
      margin-left: 10px;
      display: flex;
      flex-direction: row;
      .text {
        // border: 1px solid red;
        height: 40px;
        line-height: 40px;
        width: 100px;
        font-size: 18px;
      }
      .input {
        margin-left: 8px;
      }
    }
    .btnBox {
      margin-top: 2px;
      margin-left: 50px;
    }
  }
  .middleBox {
    margin-top: 10px;
    // border: 1px solid red;
    width: fit-content;
    margin-left: 30px;
  }
  .table {
    margin-left: 30px;
    width: 70%;
  }
  .titleBox {
    margin-left: 60px;
    display: flex;
    flex-direction: row;
    .titleText {
      height: 40px;
      line-height: 40px;
      width: 100px;
      font-size: 18px;
    }
    /deep/ .el-input__inner {
      width: 200px;
    }
  }
}
</style>