<template>
  <div class="container">
    <div class="topBox">
      <div class="inputBox">
        <div class="text">教师姓名</div>
        <el-input
          type="text"
          class="input"
          v-model="queryParams.teaname"
          size="large"
          placeholder="请输入"
          clearable
        ></el-input>
      </div>
      <div class="inputBox">
        <div class="text">教师工号</div>
        <el-input
          type="text"
          class="input"
          v-model="queryParams.worknum"
          size="large"
          placeholder="请输入"
          clearable
        ></el-input>
      </div>
      <div class="inputBox">
        <div class="text" style="width: 125px">所属院系/部门</div>
        <el-select
          v-model="queryParams.dept"
          placeholder="请选择院系/部门"
          size="large"
          clearable
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
        <el-select
          clearable
          v-model="queryParams.type"
          placeholder="请选择类型"
          size="large"
        >
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
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="middleBox">
      <el-button type="text" @click="addTeacher"
        ><el-icon><plus /></el-icon>添加教师</el-button
      >
    </div>
    <div class="table">
      <el-table :data="teaList" highlight-current-row border>
        <el-table-column
          prop="teaname"
          label="教师姓名"
          width="180"
          align="center"
        />
        <el-table-column
          prop="worknum"
          label="教师工号"
          width="180"
          align="center"
        />
        <el-table-column prop="sex" label="性别" width="180" align="center" />
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
      <el-pagination
        class="page"
        background
        layout="prev, pager, next, total"
        @current-change="handlePageChange"
        :total="pagination.total"
        :page-size="10"
      >
      </el-pagination>
    </div>
    <!-- 新增的弹框 -->
    <el-dialog
      v-model="addTeacherDialogVisible"
      title="新增教师"
      center
      width="25%"
    >
      <div class="titleBox">
        <div class="titleText">教师姓名</div>
        <el-input
          type="text"
          class="inputText"
          v-model="addParams.teaname"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="text-align: right">教师工号</div>
        <el-input
          type="text"
          class="inputText"
          v-model="addParams.worknum"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px; margin-left: 45px">
        <div class="titleText" style="width: 90px">所属院系/部门</div>
        <el-select
          v-model="addParams.dept"
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
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="width: 75px">教师类型</div>
        <el-select
          v-model="addParams.type"
          placeholder="请选择类型"
          size="large"
        >
          <el-option
            v-for="item in teacherTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="width: 75px">性别</div>
        <div>
          <el-radio v-model="addParams.sex" label="男" size="large"
            >男</el-radio
          >
          <el-radio v-model="addParams.sex" label="女" size="large"
            >女</el-radio
          >
        </div>
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
    >
      <div class="titleBox">
        <div class="titleText">教师姓名</div>
        <el-input
          type="text"
          class="inputText"
          v-model="editParams.teaname"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="text-align: right">教师工号</div>
        <el-input
          type="text"
          class="inputText"
          v-model="editParams.worknum"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px; margin-left: 45px">
        <div class="titleText" style="width: 90px">所属院系/部门</div>
        <el-select
          v-model="editParams.dept"
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
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="width: 75px">教师类型</div>
        <el-select
          v-model="editParams.type"
          placeholder="请选择院系"
          size="large"
        >
          <el-option
            v-for="item in teacherTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="width: 75px">性别</div>
        <div>
          <el-radio v-model="editParams.sex" label="男" size="large"
            >男</el-radio
          >
          <el-radio v-model="editParams.sex" label="女" size="large"
            >女</el-radio
          >
        </div>
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
import { ElMessage, Plus } from "@element-plus/icons";
import { mapState } from "vuex";
export default {
  data() {
    return {
      addTeacherDialogVisible: false,
      editTeacherDialogVisible: false,
      lessonName: "",
      departmentList: [
        {
          value: "计算机与信息工程学院",
          label: "计算机与信息工程学院",
        },
        {
          value: "经管学院",
          label: "经管学院",
        },
        {
          value: "文理学部",
          label: "文理学部",
        },
        {
          value: "教务处",
          label: "教务处",
        },
      ],
      teacherTypeList: [
        {
          value: "教师",
          label: "教师",
        },
        {
          value: "辅导员",
          label: "辅导员",
        },
      ],
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        teaname: "",
        worknum: "",
        dept: "",
        type: "",
      },
      addParams: {
        teaname: "",
        worknum: "",
        dept: null,
        sex: "男",
        type: "教师",
      },
      editParams: {
        id: null,
        teaname: "",
        worknum: "",
        dept: null,
        sex: "男",
        type: "教师",
      },
      teacherType: "",
      department: "",
    };
  },
  methods: {
    // 查询
    query() {
      console.log(this.queryParams);
      this.load();
    },
    // 重置
    reset() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        teaname: "",
        worknum: "",
        dept: "",
        type: "",
      };
      this.load();
    },
    // 显示新增课程弹框
    addTeacher() {
      this.addTeacherDialogVisible = true;
    },
    // 保存新增信息
    saveTeacher() {
      console.log(this.addParams);
      this.$store.dispatch("saveOrUpdateTea", this.addParams).then((res) => {
        console.log(res);
        if (res.data == true) {
          this.$message.success("添加成功！");
          this.addTeacherDialogVisible = false;
          this.addParams = {
            teaname: "",
            worknum: "",
            dept: null,
            sex: "男",
            type: "教师",
          };
          this.load();
        } else {
          this.$message.error("添加失败！");
        }
      });
    },
    // 显示编辑弹框
    handleEdit(row) {
      this.editTeacherDialogVisible = true;
      this.editParams.id = row.id;
      this.editParams.teaname = row.teaname;
      this.editParams.worknum = row.worknum;
      this.editParams.dept = row.dept;
      this.editParams.sex = row.sex;
      this.editParams.type = row.type;
    },
    // 保存编辑信息
    editTeachertInfo() {
      console.log(this.editParams);
      this.$store.dispatch("saveOrUpdateTea", this.editParams).then((res) => {
        console.log(res);
        if (res.data == true) {
          this.$message.success("修改成功!");
          this.editTeacherDialogVisible = false;
          this.load();
        } else {
          this.$message.error("修改失败！");
        }
      });
    },
    // 删除此条
    handleDelete(row) {
      this.$store.dispatch("deleteTeacher", { id: row.id }).then((res) => {
        console.log(res);
        if (res.data == true) {
          this.$message.success("删除成功！");
          this.load();
        } else {
          this.$message.error("删除失败！");
        }
      });
    },
    //处理分页
    handlePageChange(val) {
      console.log(val);
      this.queryParams.pageNum = val;
      this.load();
    },
    // 获取教师列表
    load() {
      this.$store.dispatch("getTeacherList", this.queryParams);
    },
  },
  mounted() {
    this.load();
  },
  computed: {
    ...mapState({
      teaList: (state) => state.final.teaList,
      pagination: (state) => state.final.teaPage,
    }),
  },
  components: {
    Plus,
  },
};
</script>

<style lang="less" scoped>
.container {
  // border: 1px solid red;
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
    // border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 30px;
    width: 70%;

    .page {
      margin-top: 20px;
    }
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