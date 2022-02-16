<template>
  <div class="container">
    <div class="topBox">
      <div class="inputBox">
        <div class="text">学生姓名</div>
        <el-input
          type="text"
          class="input"
          v-model="queryParams.stdname"
          size="large"
          placeholder="请输入"
          clearable
        ></el-input>
      </div>
      <div class="inputBox">
        <div class="text">学生学号</div>
        <el-input
          type="text"
          class="input"
          v-model="queryParams.stdnum"
          size="large"
          placeholder="请输入"
          clearable
        ></el-input>
      </div>
      <div class="inputBox">
        <div class="text" style="width: 80px">所属院系</div>
        <el-select
          v-model="queryParams.dept"
          placeholder="请选择院系"
          size="large"
          clearable
        >
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
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="middleBox">
      <el-button type="text" @click="addStudent"
        ><el-icon><plus /></el-icon>添加学生</el-button
      >
    </div>
    <div class="table">
      <el-table
        :data="stdList"
        highlight-current-row
        border
      >
        <el-table-column
          prop="stdname"
          label="学生姓名"
          width="180"
          align="center"
        />
        <el-table-column
          prop="stdnum"
          label="学号"
          width="180"
          align="center"
        />
        <el-table-column prop="sex" label="性别" width="100" align="center" />
        <el-table-column
          prop="dept"
          label="所属院系"
          width="200"
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
      v-model="addStudentDialogVisible"
      title="新增学生"
      center
      width="25%"
    >
      <div class="titleBox">
        <div class="titleText">学生姓名</div>
        <el-input
          type="text"
          class="inputText"
          v-model="addParams.stdname"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="text-align: right">学号</div>
        <el-input
          type="text"
          class="inputText"
          v-model="addParams.stdnum"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="width: 75px">所属院系</div>
        <el-select
          v-model="addParams.dept"
          placeholder="请选择院系"
          size="large"
        >
          <el-option
            v-for="item in options"
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
    >
      <div class="titleBox">
        <div class="titleText">学生姓名</div>
        <el-input
          type="text"
          class="inputText"
          v-model="editParams.stdname"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="text-align: right">学号</div>
        <el-input
          type="text"
          class="inputText"
          v-model="editParams.stdnum"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText" style="width: 75px">所属院系</div>
        <el-select
          v-model="editParams.dept"
          placeholder="请选择院系"
          size="large"
        >
          <el-option
            v-for="item in options"
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
          <el-button @click="editStudentDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editStudentInfo">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { Plus } from "@element-plus/icons";
import { mapState } from "vuex";
import Vue from "vue";
export default {
  data() {
    return {
      addStudentDialogVisible: false,
      editStudentDialogVisible: false,
      lessonName: "",
      tableData: [],
      total: 0,
      pageNum: 1,
      options: [
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
      ],
      value: "",
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        stdname: "",
        stdnum: "",
        dept: "",
      },
      addParams: {
        stdname: "",
        stdnum: null,
        dept: null,
        sex: "男",
        type: "学生",
      },
      editParams: {
        id: null,
        stdname: "",
        stdnum: null,
        dept: null,
        sex: "男",
        type: "学生",
      },
    };
  },
  methods: {
    // 查询按钮
    query() {
      console.log(this.queryParams);
      this.load();
    },
    // 处理重置按钮
    reset() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        stdname: "",
        stdnum: "",
        dept: "",
      };
      this.load();
    },
    // 处理编辑
    handleEdit() {},
    // 打开详情页面
    gotoDetail() {
      this.$router.push("/lessonDetail");
    },
    // 处理上传资料
    handleUpload() {},
    // 删除此条
    handleDelete(row) {
      console.log(row);
      this.$store.dispatch("deleteStudent", { id: row.id }).then((res) => {
        console.log(res);
        if (res.data == true) {
          this.load();
        }
      });
    },
    //数据处理函数
    dataOperation(params) {
      if (params.dept == "1") {
        params.dept = "计算机与信息工程学院";
      } else if (params.dept == "2") {
        params.dept = "经管学院";
      } else if (params.dept == "3") {
        params.dept = "文理学部";
      }
      return params;
    },
    // 显示新增课程弹框
    addStudent() {
      this.addStudentDialogVisible = true;
    },
    // 保存新增信息
    saveStudent() {
      let params = this.dataOperation(this.addParams);
      // console.log(params);
      this.$store.dispatch("saveOrUpdate", params).then((res) => {
        if (res.data == true) {
          this.addStudentDialogVisible = false;
          this.load();
        }
      });
    },
    // 显示编辑弹框
    handleEdit(val) {
      this.editStudentDialogVisible = true;
      console.log(val);
      this.editParams.stdname = val.stdname;
      this.editParams.stdnum = val.stdnum;
      if (val.dept == "计算机与信息工程学院") {
        this.editParams.dept = "1";
      } else if (val.dept == "经管学院") {
        this.editParams.dept = "2";
      } else if (val.dept == "文理学部") {
        this.editParams.dept = "3";
      }
      this.editParams.sex = val.sex;
      this.editParams.id = val.id;
    },
    // 保存编辑信息
    editStudentInfo() {
      let params = this.dataOperation(this.editParams);
      // console.log(params);
      this.$store.dispatch("saveOrUpdate", params).then((res) => {
        if (res.data == true) {
          this.editStudentDialogVisible = false;
          this.load();
        }
      });
    },
    //处理分页
    handlePageChange(val) {
      console.log(val);
      this.queryParams.pageNum = val;
      this.load();
    },
    //获取列表数据的接口
    load() {
      let params = {
        pageNum: this.pageNum,
        pageSize: 10,
      };
      this.$store.dispatch("getStudnetList", this.queryParams);
    },
  },
  mounted() {
    this.load();
  },
  computed: {
    ...mapState({
      stdList: (state) => state.final.stdList,
      pagination: (state) => state.final.stdPage,
    }),
  },
  components: {
    Plus,
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
      /deep/ .el-input {
        height: fit-content;
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

    .page {
      margin-left: 300px;
      margin-top: 50px;
    }
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
    // /deep/ .el-input {
    //   height: fit-content;
    // }
  }
}
</style>