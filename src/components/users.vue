<template>
  <div class="users">
    <el-table :data="userList">
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <!-- 作用域插槽  分发内容时使用到组件内的作用域 使用作用域插槽 -->
        <template v-slot:default="obj">
          <!-- 让每一行的数据进行和每一个表格双向数据绑定 -->
          <el-switch v-model="obj.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button plain size="small" icon="el-icon-edit" type="primary"></el-button>
        <el-button plain size="small" icon="el-icon-delete" type="danger"></el-button>
        <el-button plain size="small" icon="el-icon-check" type="success">分配角色</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// 引入ajax请求
import axios from 'axios'
export default {
  // created: 会将data中的数据注入到当前实例上, 此时实例上已经有数据了
  created () {
    // 接收数据后就调用一次
    this.getUseList()
  },
  data () {
    return {
      userList: [],
      query: '',
      pagenum: 1,
      pagesize: 4
    }
  },
  methods: {
    getUseList () {
      // 发送ajax获取数据  储存到userlist中
      // axios.post（url,data,config).then(...).catch(...),data指的是
      // 在请求体中的数据  put patch同post
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        },
        // 配置请求头
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        // 对象进行解构
        const { meta, data } = res.data
        // 判断当前数据状态是否等于200。如果等于200
        // 就让当前数据等于data数据里的users
        if (meta.status === 200) {
          this.userList = data.users
          console.log(this.userList)
        } else {
          // 错误就返回错误的信息提示
          this.userList.error(meta.msg)
        }
      })
    }
  }
}
</script>

<style>
</style>
