<template>
  <div class="container">
    <div class="left-box">
      <div class="titleBox">
        <div class="title">章节结构树</div>
        <el-button class="addSection" type="text" :icon="Plus"
          ><el-icon><plus /></el-icon>新增大章</el-button
        >
      </div>
      <div class="tree">
        <el-tree
          :data="tree"
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
    <div class="right-box">
      <div class="titleBox2">
        <div class="title2">章节一/第一节</div>
      </div>
      <div class="operationBox" style="margin-top: 30px">
        <div class="operationTitle">视频文件上传：</div>
        <el-button type="primary">视频上传</el-button>
      </div>
      <div class="operationBox">
        <div class="operationTitle">文档文件上传：</div>
        <el-button type="primary">文档上传</el-button>
      </div>
      <div class="operationBox">
        <div class="operationTitle">布置作业：</div>
        <el-button type="primary" @click="addTask">新建题目</el-button>
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
            prop="content"
            label="题干"
            width="150"
            align="center"
          />
          <el-table-column prop="A" label="A选项" width="120" align="center" />
          <el-table-column prop="B" label="B选项" width="120" align="center" />
          <el-table-column prop="C" label="C选项" width="120" align="center" />
          <el-table-column prop="D" label="D选项" width="120" align="center" />
          <el-table-column
            prop="right"
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
    <!-- 新建作业的弹框 -->
    <el-dialog v-model="addTaskDialogVisible" title="单选题" center width="30%">
      <div class="taskContainer">
        <div class="taskBox">
          <div class="taskTitle">题干</div>
          <el-input type="textarea" class="input"></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">A.</div>
          <el-input type="textarea" class="input"></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">B.</div>
          <el-input type="textarea" class="input"></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">C.</div>
          <el-input type="textarea" class="input"></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">D.</div>
          <el-input type="textarea" class="input"></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">正确答案</div>
          <el-input type="text" class="input"></el-input>
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
    <el-dialog v-model="editTaskDialogVisible" title="单选题" center width="30%">
      <div class="taskContainer">
        <div class="taskBox">
          <div class="taskTitle">题干</div>
          <el-input type="textarea" class="input"></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">A.</div>
          <el-input type="textarea" class="input"></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">B.</div>
          <el-input type="textarea" class="input"></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">C.</div>
          <el-input type="textarea" class="input"></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">D.</div>
          <el-input type="textarea" class="input"></el-input>
        </div>
        <div class="taskBox">
          <div class="taskTitle">正确答案</div>
          <el-input type="text" class="input"></el-input>
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
import { Plus } from "@element-plus/icons";
export default {
  data() {
    return {
      addTaskDialogVisible: false,
      editTaskDialogVisible: false,
      flag: true,
      tree: [
        {
          label: "第一章",
          children: [
            {
              label: "1-1",
            },
          ],
        },
        {
          label: "第二章",
          children: [
            {
              label: "2-1",
            },
            {
              label: "2-2",
            },
          ],
        },
        {
          label: "第三章",
          children: [
            {
              label: "3-1",
            },
            {
              label: "3-2",
            },
          ],
        },
      ],
      tableData: [
        {
          id: 1,
          content: "Tom",
          A: "",
          B: "",
          C: "",
          D: "",
          right: "",
        },
        {
          id: 2,
          content: "Tom",
          A: "",
          B: "",
          C: "",
          D: "",
          right: "",
        },
        {
          id: 3,
          content: "Tom",
          A: "",
          B: "",
          C: "",
          D: "",
          right: "",
        },
      ],
    };
  },
  methods: {
    addTask() {
      this.addTaskDialogVisible = true;
    },
    handleEdit(){
      this.editTaskDialogVisible = true;
    },
    saveTask() {},
    editTask() {},
    handleNodeClick() {},
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
      .input{
        width: 300px;
      }
    }
  }
}
</style>