<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
   </el-breadcrumb>
   <!-- 搜索框 -->
    <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
      <el-button @click= "searchUser" slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button class="addBtn" plain type="success">添加用户</el-button>

  <!-- 表格 -->
    <el-table :data="userList">
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <!-- 作用域插槽  分发内容时使用到组件内的作用域 使用作用域插槽 -->
        <template v-slot:default="obj">
          <!-- 让每一行的数据进行和每一个表格双向数据绑定 -->
          <el-switch @change="changeState(obj.row.id,obj.row.mg_state)" v-model="obj.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <!-- 删除功能 1点击第二个按钮注册点击事件 通过获取id一项 发送ajax请求 重新渲染页面
      获取当前id 要使用到作用域插槽-->
      <el-table-column label="操作">
        <template v-slot:default="obj">
          <el-button plain size="small" icon="el-icon-edit" type="primary"></el-button>
          <el-button
            @click="delUsers(obj.row.id)"
            plain
            size="small"
            icon="el-icon-delete"
            type="danger"
          ></el-button>
          <el-button plain size="small" icon="el-icon-check" type="success">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page=" pagenum"
      :page-sizes="[2,4,6,8]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
// 引入ajax请求
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
      pagesize: 2,
      total: 0
    }
  },
  methods: {
    async getUseList () {
      // 改造后
      const { meta, data } = await this.$axios.get('users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      //  const { meta, data } = res
      if (meta.status === 200) {
        this.userList = data.users
        this.total = data.total
        // console.log(data)
        // console.log(this.userList)
      } else {
        // 错误就返回错误的信息提示
        this.$message.error(meta.msg)
      }
      // 发送ajax获取数据  储存到userlist中
      // axios.post（url,data,config).then(...).catch(...),data指的是
      // 在请求体中的数据  put patch同post
      // this.$axios.get('users', {
      //   params: {
      //     query: this.query,
      //     pagenum: this.pagenum,
      //     pagesize: this.pagesize
      //   }
      // }).then(res => {
      //   // 对象进行解构
      //   const { meta, data } = res
      //   // 判断当前数据状态是否等于200。如果等于200
      //   // 就让当前数据等于data数据里的users
      //   if (meta.status === 200) {
      //     this.userList = data.users
      //     this.total = data.total
      //     // console.log(data)
      //     // console.log(this.userList)
      //   } else {
      //     // 错误就返回错误的信息提示
      //     this.$message.error(meta.msg)
      //   }
      // })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      // 修改当前页数
      this.pagenum = val
      // 重新渲染到页面上
      this.pagesize = 1
      this.getUseList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      // 修改当前页
      this.pagesize = val
      // 重新渲染页面
      this.getUseList()
    },
    // 删除数据
    async delUsers (id) {
      // 这里需要使用到try catch，如果失败了直接抛出错误
      try {
        await this.$confirm('亲,确定要删除吗？', '温馨提示', {
          type: 'warning'
        })
        // 到这里点击确定 发送ajax
        const { meta } = await this.$axios.delete(`users/${id}`)
        //  const { meta } = res
        if (meta.status === 200) {
          this.$message.success('删除成功')
          // 如果当前页只有一条, 删除了仅有的一条后, 当前页-1
          if (this.userList.length === 1 && this.pagenum > 1) {
            this.pagenum--
          }
          // 重新渲染页面
          this.getUseList()
        } else {
          this.$message.error(meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
      // 弹出一个提示框
      // this.$confirm('亲,确定要删除吗？', '温馨提示', {
      //   type: 'warning'
      // }).then(() => {
      //   this.$axios.delete(`users/${id}`, {
      //   }).then(res => {
      //     const { meta } = res
      //     if (meta.status === 200) {
      //       this.$message.success('删除成功')
      //       // 如果当前页只有一条, 删除了仅有的一条后, 当前页-1
      //       if (this.userList.length === 1 && this.pagenum > 1) {
      //         this.pagenum--
      //       }
      //       // 重新渲染页面
      //       this.getUseList()
      //     } else {
      //       this.$message.error(meta.msg)
      //     }
      //   }).catch(() => {
      //     this.$message('取消成功')
      //   })
      // })
    //  发送ajax请求
    },
    // 搜索用户
    searchUser () {
      // 无论在哪个页面进行搜索，让当前搜索开始从第一页进行搜索
      this.pagenum = 1
      // 可以直接调用获取数据时get方法
      this.getUseList()
    },
    // 修改状态
    async changeState (id, flag) {
    // 发送ajax请求
    // 使用async和await一对关键字简写的方式
      const { meta } = await this.$axios.put(`users/${id}/state/${flag}`)
      //  const { meta } = res
      // 成功了进行判断
      if (meta.status === 200) {
        this.$message.success(meta.msg)
        // 渲染数据
        this.getUseList()
      } else {
        this.$message.error(meta.msg)
      }
      // this.$axios.put(`users/${id}/state/${flag}`).then(res => {
      //   // 进行解构
      //   const { meta } = res
      //   console.log({ meta })
      //   // 成功了进行判断
      //   if (meta.status === 200) {
      //     this.$message.success(meta.msg)
      //     // 渲染数据
      //     this.getUseList()
      //   } else {
      //     this.$message.error(meta.msg)
      //   }
      // })
    }
  }
}
</script>

<style lang='less' scoped>
.users {
    .el-breadcrumb  {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
}
.input-with-select{
  width: 300px;
   margin-bottom: 10px;
}
.addBtn{
  margin-left: 10px;
}
}
</style>
