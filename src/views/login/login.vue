<template>
  <div class="container">
    <div class="login-wrap">
      <div class="systemTitle">后台管理</div>
      <div class="separator"></div>
      <div class="content-box">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
        >
          <el-form-item class="formItem" label="账号" label-width="60px" prop="account" style="margin-top:30px">
            <el-input v-model="ruleForm.account" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item class="formItem" label="密码" label-width="60px" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item class="formItem" label-width="0px">
            <el-button class="login-btn" type="primary" @click="submitForm(ruleForm)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        account: "",
        password: "",
      },
      rules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(val){
      console.log(val);
      self.location = "/lesson";
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
  .login-wrap {
    // border: 1px solid white;
    background-color: rgba(255, 255, 255, 0.4);
    width: 350px;
    height: 300px;
    margin-bottom: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .systemTitle {
      // border: 1px solid red;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: white;
      font-size: 24px;
      font-weight: bold;
    }
    .separator {
      border: 1px solid rgba(255, 255, 255, 0.5);
      width: 90%;
    }
     .formItem {
      // border: 1px solid red;
      display: flex;
      flex-direction: row;
      justify-content: center;
      .login-btn{
        width: 100px;
        margin-top: 20px;
        margin-left: 80px;
        // border: 1px solid red;
      }
    }
  }
}
</style>