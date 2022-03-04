<template>
  <div class="container">
    <div class="left-box">
      <div class="titleBox">
        <div class="title">章节结构树</div>
        <el-button @click="newSection" class="addSection" type="text"
          ><el-icon><plus /></el-icon>新增大章</el-button
        >
      </div>
      <div class="tree">
        <el-tree
          :data="tree"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        >
          <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>{{ node.label }}</span>
              <span>
                <a style="color: #409eff" @click="append(data)"> 添加小节 </a>
                <a style="color: #409eff" @click="remove(node, data)"> 删除 </a>
              </span>
            </span>
          </template>
        </el-tree>
      </div>
    </div>
    <div class="separator"></div>
    <div class="right-box" v-if="appear">
      <div class="titleBox2">
        <div class="title2">{{ Title }}</div>
      </div>
      <div class="operationBox" style="margin-top: 30px">
        <div class="operationTitle">视频文件上传：</div>
        <el-button type="primary">视频上传</el-button>
      </div>
      <div class="operationBox">
        <div class="operationTitle">文档文件上传：</div>
        <el-upload
          class="upload-demo"
          action="http://localhost:9090/file/upload"
          :data="fileData"
          :show-file-list="false"
          :on-success="uploadSuccess"
          :on-error="uploadFail"
        >
          <el-button type="primary">文档上传</el-button>
        </el-upload>
      </div>
      <div class="operationBox">
        <div class="operationTitle">布置作业：</div>
        <el-button type="primary" @click="addTask">新建题目</el-button>
      </div>
      <div class="table">
        <el-table
          :data="taskList"
          style="width: 100%"
          highlight-current-row
          border
        >
          <el-table-column
            type="index"
            width="70"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="text"
            label="题干"
            width="150"
            align="center"
          />
          <el-table-column prop="a" label="A选项" width="120" align="center" />
          <el-table-column prop="b" label="B选项" width="120" align="center" />
          <el-table-column prop="c" label="C选项" width="120" align="center" />
          <el-table-column prop="d" label="D选项" width="120" align="center" />
          <el-table-column
            prop="correct"
            label="正确答案"
            width="120"
            align="center"
          />
          <el-table-column label="操作" align="center" width="180">
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
    </div>
    <!-- 新增大章弹框 -->
    <el-dialog
      v-model="newBigSectionDialog"
      title="新增大章"
      center
      width="30%"
    >
      <div>
        <div class="content-box">
          <div class="text">大章名称</div>
          <el-input
            size="large"
            class="input2"
            v-model="addBigParams.node"
          ></el-input>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="newBigSectionDialog = false">取消</el-button>
          <el-button type="primary" @click="saveBigSection">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新增小节弹框 -->
    <el-dialog
      v-model="newSmallSectionDialog"
      title="新增小节"
      center
      width="30%"
    >
      <div>
        <div class="content-box">
          <div class="text">小节名称</div>
          <el-input
            size="large"
            class="input2"
            v-model="addSmallParams.node"
          ></el-input>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="newSmallSectionDialog = false">取消</el-button>
          <el-button type="primary" @click="saveSmallSection">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新建作业的弹框 -->
    <el-dialog v-model="addTaskDialogVisible" title="单选题" center width="30%">
      <div class="taskContainer">
        <div class="taskBox">
          <div class="taskTitle">题干</div>
          <el-input
            type="textarea"
            class="input"
            v-model="addTaskParams.text"
          ></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">A.</div>
          <el-input
            type="textarea"
            class="input"
            v-model="addTaskParams.a"
          ></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">B.</div>
          <el-input
            type="textarea"
            class="input"
            v-model="addTaskParams.b"
          ></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">C.</div>
          <el-input
            type="textarea"
            class="input"
            v-model="addTaskParams.c"
          ></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">D.</div>
          <el-input
            type="textarea"
            class="input"
            v-model="addTaskParams.d"
          ></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">正确答案</div>
          <el-input
            type="text"
            class="input"
            v-model="addTaskParams.correct"
          ></el-input>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addTaskDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveTask">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 编辑作业的弹框 -->
    <el-dialog
      v-model="editTaskDialogVisible"
      title="单选题"
      center
      width="30%"
    >
      <div class="taskContainer">
        <div class="taskBox">
          <div class="taskTitle">题干</div>
          <el-input
            type="textarea"
            class="input"
            v-model="editTaskParams.text"
          ></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">A.</div>
          <el-input
            type="textarea"
            class="input"
            v-model="editTaskParams.a"
          ></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">B.</div>
          <el-input
            type="textarea"
            class="input"
            v-model="editTaskParams.b"
          ></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">C.</div>
          <el-input
            type="textarea"
            class="input"
            v-model="editTaskParams.c"
          ></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">D.</div>
          <el-input
            type="textarea"
            class="input"
            v-model="editTaskParams.d"
          ></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">正确答案</div>
          <el-input
            type="text"
            class="input"
            v-model="editTaskParams.correct"
          ></el-input>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editTaskDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editTask">确定</el-button>
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
      defaultProps: {
        children: "childrenList",
        label: "node",
      },
      newBigSectionDialog: false,
      newSmallSectionDialog: false,
      addTaskDialogVisible: false,
      editTaskDialogVisible: false,
      addBigParams: {
        lessonName: "",
        lessonId: null,
        parentId: 0,
        node: "",
      },
      addSmallParams: {
        lessonName: "",
        lessonId: null,
        parentId: 0,
        node: "",
      },
      appear: false,
      Title: "",
      currentNodeId: null,
      currentLessonId: null,
      addTaskParams: {
        nodeId: null,
        text: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
      },
      editTaskParams: {
        taskId: null,
        nodeId: null,
        text: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
      },
      fileList: [],
      fileData: {
        nodeId: null,
        lessonId: null,
      },
    };
  },
  methods: {
    // 新增大章弹框
    newSection() {
      this.newBigSectionDialog = true;
    },
    //确认添加大章按钮
    saveBigSection() {
      console.log(this.addBigParams);
      this.$store.dispatch("addSection", this.addBigParams).then((res) => {
        if ((res.data = true)) {
          this.newBigSectionDialog = false;
          this.addBigParams.node = "";
          this.$store.dispatch("getTree", {
            lessonId: this.addBigParams.lessonId,
          });
          this.$message.success("添加成功！");
        } else {
          this.$message.error("添加失败！");
        }
      });
    },
    //新增小节弹窗
    append(val) {
      console.log(val);
      if (val.parentId == 0) {
        this.newSmallSectionDialog = true;
        this.addSmallParams.parentId = val.nodeId;
      }
    },
    //确认添加小节
    saveSmallSection() {
      console.log(this.addSmallParams);
      this.$store.dispatch("addSection", this.addSmallParams).then((res) => {
        if (res.data) {
          this.newSmallSectionDialog = false;
          this.addSmallParams.node = "";
          this.$store.dispatch("getTree", {
            lessonId: this.addSmallParams.lessonId,
          });
          this.$message.success("添加成功！");
        } else {
          this.$message.error("添加失败！");
        }
      });
    },
    remove(node, val) {
      console.log(val.nodeId);
      this.$store.dispatch("delNode", { nodeId: val.nodeId }).then((res) => {
        if (res.data) {
          this.$store.dispatch("getTree", {
            lessonId: this.addBigParams.lessonId,
          });
          this.$message.success("删除成功！");
        } else {
          this.$message.error("删除失败！");
        }
      });
    },
    //处理树节点点击按钮
    handleNodeClick(val) {
      console.log(val);
      if (val.parentId != 0) {
        this.appear = true;
        this.Title = val.node;
        this.addTaskParams.nodeId = val.nodeId;
        this.currentNodeId = val.nodeId;
        this.fileData.nodeId = val.nodeId;
        this.fileData.lessonId = this.currentLessonId;
        console.log(this.fileData);
        this.$store.dispatch("getTask", { nodeId: val.nodeId });
      }
    },
    //文件上传成功
    uploadSuccess() {
      this.$message.success("文件上传成功!");
    },
    //文件上传失败
    uploadFail() {
      this.$message.success("文件上传失败!");
    },
    //新增作业弹窗
    addTask() {
      this.addTaskDialogVisible = true;
    },
    //确认添加作业按钮
    saveTask() {
      console.log(this.addTaskParams);
      this.$store.dispatch("saveOrEditTask", this.addTaskParams).then((res) => {
        if (res.data) {
          this.addTaskDialogVisible = false;
          this.$store.dispatch("getTask", { nodeId: this.currentNodeId });
          this.addTaskParams.text = "";
          this.addTaskParams.a = "";
          this.addTaskParams.b = "";
          this.addTaskParams.c = "";
          this.addTaskParams.d = "";
          this.addTaskParams.correct = "";
          this.$message.success("作业添加成功！");
        } else {
          this.$message.error("作业添加失败！");
        }
      });
    },
    //编辑作业弹窗
    handleEdit(row) {
      this.editTaskDialogVisible = true;
      this.editTaskParams.text = row.text;
      this.editTaskParams.a = row.a;
      this.editTaskParams.b = row.b;
      this.editTaskParams.c = row.c;
      this.editTaskParams.d = row.d;
      this.editTaskParams.correct = row.correct;
      this.editTaskParams.taskId = row.taskId;
      this.editTaskParams.nodeId = row.nodeId;
    },
    //确认编辑按钮
    editTask() {
      console.log(this.editTaskParams);
      this.$store
        .dispatch("saveOrEditTask", this.editTaskParams)
        .then((res) => {
          if (res.data) {
            this.editTaskDialogVisible = false;
            this.$store.dispatch("getTask", { nodeId: this.currentNodeId });
            this.$message.success("作业修改成功！");
          } else {
            this.$message.error("作业修改失败！");
          }
        });
    },
    //删除作业
    handleDelete(row) {
      console.log(row.taskId);
      this.$store.dispatch("delTask", { taskId: row.taskId }).then((res) => {
        if (res.data) {
          this.$store.dispatch("getTask", { nodeId: this.currentNodeId });
          this.$message.success("删除成功！");
        } else {
          this.$message.error("删除失败！");
        }
      });
    },
  },
  mounted() {
    // console.log(this.$route.params);
    let params = this.$route.params;
    this.currentLessonId = params.id * 1;
    this.addBigParams.lessonName = params.lessonname;
    this.addBigParams.lessonId = params.id * 1;
    this.addSmallParams.lessonName = params.lessonname;
    this.addSmallParams.lessonId = params.id * 1;
    this.$store.dispatch("getTree", { lessonId: params.id });
  },
  computed: {
    ...mapState({
      tree: (state) => state.final.tree,
      taskList: (state) => state.final.taskList,
    }),
  },
  components: {
    Plus,
  },
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: row;
  // border: 1px solid red;
  .left-box {
    // border: 1px solid blue;
    width: 400px;
    height: 500px;
    display: flex;
    flex-direction: column;
    .titleBox {
      // border: 1px solid red;
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 18px;
        font-weight: bold;
      }
      .addSection {
        margin-left: 120px;
      }
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
  .separator {
    margin-left: 10px;
    border: 1px solid rgb(223, 223, 223);
  }
  .right-box {
    // border: 1px solid blue;
    width: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
    .titleBox2 {
      margin-left: 20px;
      display: flex;
      flex-direction: row;
      .title2 {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .operationBox {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      margin-left: 20px;
      .operationTitle {
        width: 150px;
        height: 30px;
        line-height: 30px;
        text-align: right;
        font-weight: bold;
        color: rgb(71, 71, 71);
        // border: 1px solid red;
      }
    }
    .table {
      width: 74%;
      margin-top: 20px;
      margin-left: 30px;
    }
  }
  .taskContainer {
    // border: 1px solid red;
    display: flex;
    flex-direction: column;
    align-items: center;
    .taskBox {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      .taskTitle {
        // border: 1px solid blue;
        font-size: 16px;
        text-align: right;
        padding-inline: 10px;
        width: 70px;
      }
      .input {
        width: 300px;
      }
    }
  }
  .content-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    margin-left: 50px;
    .text {
      font-size: 16px;
      text-align: right;
      padding-inline: 10px;
      width: 70px;
    }
    .input2 {
      width: 300px;
    }
  }
}
</style>