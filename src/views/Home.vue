<template>
  <el-container class="container">
    <el-header class="header">
      <div class="title">后台管理</div>
      <div class="pageTitle">{{ pageTitle }}</div>
      <el-dropdown class="personal" trigger="click">
        <span class="el-dropdown-link">
          admin
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>
    <el-container class="mainContainer">
      <el-aside class="aside">
        <el-menu class="el-menu-vertical-demo" @select="handleSelect">
          <el-menu-item index="1">
            <span>课程管理</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>学生管理</span>
          </el-menu-item>
          <el-menu-item index="3">
            <span>教师管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  ArrowDown,
  CircleCheck,
  Check,
  CirclePlus,
  CirclePlusFilled,
  Plus,
} from '@element-plus/icons-vue'
export default {
  data() {
    return {
      pageTitle: "课程管理",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key);
      if (key == 1) {
        this.$router.push("/lesson");
        this.pageTitle = "课程管理";
      }
      if (key == 2) {
        this.$router.push("/stdManage");
        this.pageTitle = "学生管理";
      }
      if (key == 3) {
        this.$router.push("/teaManage");
        this.pageTitle = "教师管理";
      }
    },
    logout(){
      self.location = "/login";
    }
  },
  components: {
    ArrowDown
  }
};
</script>

<style scoped lang="less">
body {
  margin: 0;
}
.container {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  // border: 1px solid red;

  .header {
    // border: 1px solid red;
    padding: 0;
    height: 80px;
    line-height: 80px;
    // background-color: #b3c0d1;
    background-color: white;
    display: flex;
    position: relative;
    // border: 1px solid red;
    .title {
      // border: 1px solid red;
      width: 10%;
      height: 80px;
      text-align: center;
      font-size: 32px;
      color: white;
      font-weight: bold;
      background-color: #304156;
    }
    .pageTitle {
      font-size: 30px;
      font-weight: bold;
      margin-left: 50px;
      // margin-left: 300px;
      // border: 1px solid red;
    }
    .personal {
      position: absolute;
      right: 30px;
      top: 35px;
    }
  }
  .mainContainer {
    // border: 1px solid green;
    height: 80vh;
    display: flex;
    .aside {
      background-color: #304156;
      width: 10%;
      height: 92vh;
      // border: 1px solid red;
      /deep/ .el-menu {
        // display: none;
        list-style-type: none;
        background-color: #304156;
        padding: 0;
        margin: 0;

        li {
          // border: 1px solid red;
          height: 50px;
          line-height: 50px;
          color: white;
          cursor: pointer;
          span {
            margin-left: 30px;
          }
        }
        li:hover {
          background-color: #2a3a4c;
        }
      }
    }
    .main {
      padding: 0;
      background-color: #f3f3f3;
      width: 90%;
      height: 90vh;
      // border: 1px solid blue;
    }
  }
}
</style>