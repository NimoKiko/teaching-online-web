<template>
  <div class="container">
    <div class="topBox">
      <div class="inputBox">
        <div class="text">学生姓名</div>
        <el-input
          type="text"
          class="input"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="inputBox">
        <div class="text">学生学号</div>
        <el-input
          type="text"
          class="input"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="inputBox">
        <div class="text" style="width: 80px">所属院系</div>
        <el-select v-model="value" placeholder="请选择院系" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="btnBox">
        <el-button type="primary">查询</el-button>
        <el-button type="info">重置</el-button>
      </div>
    </div>
    <div class="middleBox">
      <el-button type="text" :icon="Plus" @click="addLesson"><el-icon><plus /></el-icon>添加学生</el-button>
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
          prop="name"
          label="学生姓名"
          width="180"
          align="center"
        />
        <el-table-column prop="id" label="学号" width="180" align="center" />
        <el-table-column
          prop="dept"
          label="所属院系"
          width="180"
          align="center"
        />
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增的弹框 -->
    <el-dialog
      v-model="addStudentDialogVisible"
      title="新增学生"
      center
      width="25%"
      :before-close="handleClose"
    >
      <div class="titleBox">
        <div class="titleText">学生姓名</div>
        <el-input
          type="text"
          class="inputText"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="text-align: right">学号</div>
        <el-input
          type="text"
          class="inputText"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="width: 75px">所属院系</div>
        <el-select v-model="value" placeholder="请选择院系" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addStudentDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveStudent">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog
      v-model="editStudentDialogVisible"
      title="编辑"
      center
      width="25%"
      :before-close="handleClose"
    >
      <div class="titleBox">
        <div class="titleText">学生姓名</div>
        <el-input
          type="text"
          class="inputText"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="text-align: right">学号</div>
        <el-input
          type="text"
          class="inputText"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="width: 75px">所属院系</div>
        <el-select v-model="value" placeholder="请选择院系" size="large">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editStudentDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editStudentInfo">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {Plus} from '@element-plus/icons'
export default {
  data() {
    return {
      addStudentDialogVisible: false,
      editStudentDialogVisible: false,
      lessonName: "",
      tableData: [
        {
          id: 1,
          name: "Tom",
          dept: "计算机与信息工程学院",
        },
        {
          id: 2,
          name: "Marry",
          dept: "经管学院",
        },
        {
          id: 3,
          name: "Danny",
          dept: "计算机与信息工程学院",
        },
      ],
      options: [
        {
          value: "1",
          label: "计算机与信息工程学院",
        },
        {
          value: "2",
          label: "经管学院",
        },
        {
          value: "3",
          label: "文理学部",
        },
      ],
      value:""
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
      this.addStudentDialogVisible = true;
    },
    // 显示编辑弹框
    handleEdit() {
      this.editStudentDialogVisible = true;
    },
    // 保存编辑信息
    editStudentInfo() {},
    // 保存新增信息
    saveStudent() {},
  },
  components: {
    Plus
  }
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
      margin-left: 20px;
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
      // border: 1px solid red;
      height: 40px;
      line-height: 40px;
      padding-inline: 10px;
      width: 100px;
      font-size: 18px;
    }
    /deep/ .el-input__inner {
      width: 200px;
    }
  }
}
</style>