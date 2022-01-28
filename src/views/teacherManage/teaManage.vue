<template>
  <div class="container">
    <div class="topBox">
      <div class="inputBox">
        <div class="text">教师姓名</div>
        <el-input
          type="text"
          class="input"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="inputBox">
        <div class="text">教师工号</div>
        <el-input
          type="text"
          class="input"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="inputBox">
        <div class="text" style="width: 125px">所属院系/部门</div>
        <el-select
          v-model="department"
          placeholder="请选择院系/部门"
          size="large"
        >
          <el-option
            v-for="item in departmentList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="inputBox">
        <div class="text" style="width: 80px">教师类型</div>
        <el-select v-model="teacherType" placeholder="请选择类型" size="large">
          <el-option
            v-for="item in teacherTypeList"
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
      <el-button type="text" @click="addTeacher">添加教师</el-button>
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
          label="教师姓名"
          width="180"
          align="center"
        />
        <el-table-column
          prop="id"
          label="教师工号"
          width="180"
          align="center"
        />
        <el-table-column
          prop="dept"
          label="所属院系/部门"
          width="180"
          align="center"
        />
        <el-table-column
          prop="type"
          label="教师类型"
          width="180"
          align="center"
        />
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
      v-model="addTeacherDialogVisible"
      title="新增教师"
      center
      width="25%"
      :before-close="handleClose"
    >
      <div class="titleBox">
        <div class="titleText">教师姓名</div>
        <el-input
          type="text"
          class="inputText"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="text-align: right">教师工号</div>
        <el-input
          type="text"
          class="inputText"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px;margin-left:45px">
        <div class="titleText" style="width: 90px">所属院系/部门</div>
        <el-select v-model="department" placeholder="请选择院系/部门" size="large">
          <el-option
            v-for="item in departmentList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="width: 75px">教师类型</div>
        <el-select v-model="teacherType" placeholder="请选择院系" size="large">
          <el-option
            v-for="item in teacherTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addTeacherDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveTeacher">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog
      v-model="editTeacherDialogVisible"
      title="编辑"
      center
      width="25%"
      :before-close="handleClose"
    >
      <div class="titleBox">
        <div class="titleText">教师姓名</div>
        <el-input
          type="text"
          class="inputText"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="text-align: right">教师工号</div>
        <el-input
          type="text"
          class="inputText"
          v-model="lessonName"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px;margin-left:45px">
        <div class="titleText" style="width: 90px">所属院系/部门</div>
        <el-select v-model="department" placeholder="请选择院系/部门" size="large">
          <el-option
            v-for="item in departmentList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="width: 75px">教师类型</div>
        <el-select v-model="teacherType" placeholder="请选择院系" size="large">
          <el-option
            v-for="item in teacherTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editTeacherDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editTeachertInfo">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addTeacherDialogVisible: false,
      editTeacherDialogVisible: false,
      lessonName: "",
      tableData: [
        {
          id: 1,
          name: "Tom",
          dept: "计算机与信息工程学院",
          type: "教师",
        },
        {
          id: 2,
          name: "Marry",
          dept: "经管学院",
          type: "辅导员",
        },
        {
          id: 3,
          name: "Danny",
          dept: "教务处",
          type: "教师",
        },
      ],
      departmentList: [
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
        {
          value: "4",
          label: "教务处",
        },
      ],
      teacherTypeList: [
        {
          value: "1",
          label: "教师",
        },
        {
          value: "2",
          label: "辅导员",
        },
      ],
      teacherType: "",
      department: "",
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
    addTeacher() {
      this.addTeacherDialogVisible = true;
    },
    // 显示编辑弹框
    handleEdit() {
      this.editTeacherDialogVisible = true;
    },
    // 保存编辑信息
    editTeachertInfo() {},
    // 保存新增信息
    saveTeacher() {},
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
      text-align: right;
      // border: 1px solid red;
      height: 40px;
      line-height: 40px;
      padding-inline: 10px;
      width: 100px;
      font-size: 14px;
    }
    /deep/ .el-input__inner {
      width: 200px;
    }
  }
}
</style>