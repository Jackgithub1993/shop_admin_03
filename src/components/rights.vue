<template>
  <div class="rights">
    <!-- 面包屑 把面包屑的样式提到app.vue公共样式中 都可以使用到 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="rightsList">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" ></el-table-column>
      <el-table-column prop="path" label="路径" ></el-table-column>
      <el-table-column  label="层级">
        <!-- 想要获取到子组件内的数据 level使用插槽 -->
        <template v-slot:default="{row}">
            <p v-if="row.level=== '0'">一级</p>
            <p v-if="row.level=== '1'">二级</p>
            <p v-if="row.level=== '2'">三级</p>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsList: []
    }
  },
  // 发送ajax请求 获取到数据 渲染到数据表格中
  async created () {
    const { meta, data } = await this.$axios.get('rights/list')
    // console.log(res)
    if (meta.status === 200) {
      // 直接返回数据 此时数据需要提前存一个 进行接受
      this.rightsList = data
    } else {
      this.$message.error(meta.msg)
    }
  }
}
</script>

<style>
</style>
