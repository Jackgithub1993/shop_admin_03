<template>
  <el-container class="index">
    <el-header>
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <div class="title">
        <h1>电商后台管理系统</h1>
      </div>
      <div class="logout">
        欢迎光临~
        <a @click="logout" href="javascript:;">退出</a>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!--  -->
        <el-menu
          router
          unique-opened
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <!-- 标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- 展开的内容 -->
            <!-- 解析时，会将配置的路径，当成绝对路径使用，写的是user -->
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <!-- 展开的内容 -->
            <el-menu-item index="roles">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>

            <el-menu-item index="rights">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      // 退出前先询问一下
      // this.$confirm(提示内容，提示标题，配置对象).then(...).catch(...)
      // 确认，走.then
      // 取消，走.catch
      this.$confirm('确定要退出本系统吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 同时销毁本地的token
          localStorage.removeItem('toke')
          // 跳转到登陆 this.$router.push()
          this.$router.push('/login')
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}
</script>

<style lang="less">
.index {
  height: 100%;
  .el-header {
    background-color: #d8d8d8;
    display: flex;
    .logo {
      width: 180px;
      img {
        height: 40px;
        margin: 10px;
      }
    }
    .title {
      flex: 1;
      text-align: center;
      h1 {
        height: 60px;
        line-height: 60px;
        color: #545c64;
      }
    }
    .logout {
      width: 180px;
      text-align: right;
      height: 60px;
      line-height: 60px;
      font-weight: 700;
      a {
        color: orange;
      }
    }
  }
  .el-aside {
    background-color: #545c64;
    .el-menu {
      border: none;
    }
  }
  .el-main {
    background-color: #ecf0f1;
  }
}
</style>
