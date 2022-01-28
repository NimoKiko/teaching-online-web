<template>
  <div class="container">
    <el-tabs type="border-card" v-model="activeName" class="eltabs">
      <el-tab-pane
        label="详情"
        name="first"
        class="eltabspan"
      >
        <detail></detail>
      </el-tab-pane>
      <el-tab-pane
        label="章节划分"
        name="second"
        class="eltabspan"
      >
        <sections></sections>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import detail from "./detail.vue";
import sections from "./section.vue";
export default {
  data () {
    return {
      activeName:"first"
    }
  },
  components: {
    detail,
    sections
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 95%;
  margin-top: 42.179px;
  background: white;
}
</style>