<template>
  <div class="container">
    <div class="topBox">
      <div class="inputBox">
        <div class="text">课程名称</div>
        <el-input
          type="text"
          class="input"
          v-model="queryParams.lessonname"
          size="large"
          placeholder="请输入"
          clearable
        ></el-input>
      </div>
      <div class="inputBox">
        <div class="text">教师名称</div>
        <el-input
          type="text"
          class="input"
          v-model="queryParams.teaname"
          size="large"
          placeholder="请输入"
        ></el-input>
      </div>
      <div class="btnBox">
        <el-button type="primary" @click="query">查询</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </div>
    </div>
    <div class="middleBox">
      <el-button type="text" @click="addLesson"
        ><el-icon><plus /></el-icon>新增课程</el-button
      >
    </div>
    <div class="table">
      <el-table :data="lessonList" highlight-current-row border>
        <el-table-column
          prop="id"
          label="课程编号"
          width="100"
          align="center"
        />
        <el-table-column
          prop="lessonname"
          label="课程名称"
          width="180"
          align="center"
        />
        <el-table-column
          prop="teaname"
          label="负责教师"
          width="180"
          align="center"
        />
        <el-table-column
          prop="total"
          label="学生人数"
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
              type="primary"
              @click="gotoDetail(scope.row)"
            >
              详情
            </el-button>
            <el-button
              size="small"
              type="primary"
              @click="handleUpload(scope.row)"
            >
              上传附件
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
    <!-- 新增弹框 -->
    <el-dialog
      v-model="addLessonDialogVisible"
      title="新增课程"
      center
      width="25%"
    >
      <div class="titleBox">
        <div class="titleText">课程名称</div>
        <el-input
          type="text"
          class="inputText"
          v-model="addParams.lessonname"
          size="large"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText">负责教师</div>
        <el-select
          v-model="addParams.teaname"
          class="inputText"
          placeholder="请选择"
          size="large"
        >
          <el-option
            v-for="item in teaOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addLessonDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveLesson">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog
      v-model="editLessonDialogVisible"
      title="编辑"
      center
      width="25%"
    >
      <div class="titleBox">
        <div class="titleText">课程名称</div>
        <el-input
          type="text"
          class="inputText"
          v-model="editParams.lessonname"
          size="large"
        ></el-input>
      </div>
      <div class="titleBox" style="margin-top: 20px">
        <div class="titleText">负责教师</div>
        <el-select
          v-model="editParams.teaname"
          class="inputText"
          placeholder="请选择"
          size="large"
        >
          <el-option
            v-for="item in teaOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editLessonDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editLessonInfo">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { Plus, ElMessage } from "@element-plus/icons";
import { mapState } from "vuex";
import Vue from "vue";
export default {
  data() {
    return {
      addLessonDialogVisible: false,
      editLessonDialogVisible: false,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        lessonname: "",
        teaname: "",
      },
      addParams: {
        lessonname: "",
        teaname: "",
      },
      editParams: {
        id: null,
        lessonname: "",
        teaname: "",
      },
      teaOption: [],
    };
  },
  methods: {
    //查询按钮
    query() {
      this.load();
    },
    //重置按钮
    reset() {
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        lessonname: "",
        teaname: "",
      };
      this.load();
    },
    // 显示新增课程弹框
    addLesson() {
      this.addLessonDialogVisible = true;
      // console.log(this.teaList);
      let list = [];
      for (let item of this.teaList) {
        // console.log(item);
        let temp = {
          label: "",
          value: "",
        };
        temp.label = item.teaname;
        temp.value = item.teaname;
        list.push(temp);
      }
      // console.log(list);
      this.teaOption = list;
    },
    // 保存新增信息
    saveLesson() {
      console.log(this.addParams);
      let params = {
        teaname: this.addParams.teaname,
        lessonName: this.addParams.lessonname,
      };
      this.$store.dispatch("saveOrUpdateLesson", this.addParams).then((res) => {
        if (res.data) {
          this.addLessonDialogVisible = false;
          this.load();
          this.addParams = {
            lessonname: "",
            teaname: "",
          };
          this.$message.success("添加成功！");
        } else {
          this.$message.error("添加失败！");
        }
        this.$store.dispatch("saveTeaLesson", params).then((res) => {
          if (res.data) {
            console.log("入库成功");
          } else {
            console.log("入库失败");
          }
        });
      });
    },
    // 显示编辑弹框
    handleEdit(row) {
      this.editParams.lessonname = row.lessonname;
      this.editParams.teaname = row.teaname;
      this.editParams.id = row.id;
      this.editLessonDialogVisible = true;

      let list = [];
      for (let item of this.teaList) {
        console.log(item);
        let temp = {
          label: "",
          value: "",
        };
        temp.label = item.teaname;
        temp.value = item.teaname;
        list.push(temp);
      }
      // console.log(list);
      this.teaOption = list;
    },
    // 保存编辑信息
    editLessonInfo() {
      console.log(this.editParams);
      let params = {
        lessonId: this.editParams.id,
        lessonName: this.editParams.lessonname,
        teaname: this.editParams.teaname,
      };
      this.$store
        .dispatch("saveOrUpdateLesson", this.editParams)
        .then((res) => {
          if (res.data) {
            this.editLessonDialogVisible = false;
            this.load();
            this.$message.success("修改成功！");
            this.$store.dispatch("updateTeaLesson", params).then((res) => {
              if (res.data) {
                console.log("教师课程表修改成功");
              } else {
                console.log("教师课表修改失败");
              }
            });
          } else {
            this.$message.error("修改失败！");
          }
        });
    },
    // 删除此条
    handleDelete(row) {
      this.$store.dispatch("delLesson", { id: row.id }).then((res) => {
        if (res.data) {
          this.$message.success("删除成功！");
          this.load();
        } else {
          this.$message.error("删除失败！");
        }
      });
    },
    handlePageChange(val) {
      console.log(val);
      this.queryParams.pageNum = val;
      this.load();
    },
    // 打开详情页面
    gotoDetail(row) {
      console.log(row);
      // this.$router.push("/lessonDetail");
      this.$router.push({
        name: "detail",
        path: "/lessonDetail",
        params: {
          id: row.id,
          teaname: row.teaname,
          lessonname: row.lessonname,
        },
      });
    },
    // 处理上传资料
    handleUpload() {},
    // 获取列表
    load() {
      this.$store.dispatch("getLessonList", this.queryParams);
    },
  },
  mounted() {
    this.load();
    let params = {
      pageNum: 1,
      pageSize: 100,
      teaname: "",
      worknum: "",
      dept: "",
      type: "",
    };
    this.$store.dispatch("getTeacherList", params);
  },
  computed: {
    ...mapState({
      lessonList: (state) => state.final.lessonList,
      pagination: (state) => state.final.lessonPage,
      teaList: (state) => state.final.teaList,
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
      height: 40px;
      line-height: 40px;
      width: 100px;
      font-size: 18px;
    }
    /deep/ .el-input--large {
      width: 200px;
    }
    /deep/ .el-input__inner {
      width: 200px;
    }
  }
}
</style>