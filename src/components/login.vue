<template>
  <div class="login">
    <el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
      <img class="logo" src="../assets/avatar.jpg" alt />
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login" type="primary" class="loginBtn">登陆</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入ajax请求
import axios from 'axios'
export default {
  // 引入数据
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['change', 'blur']
          },
          {
            min: 3,
            max: 12,
            message: '用户名长度在 3 到 12 位',
            trigger: ['change', 'blur']
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: ['change', 'blur']
          },
          {
            min: 3,
            max: 12,
            message: '密码长度在 3 到 12 位',
            trigger: ['change', 'blur']
          }
        ]
      }
    }
  },
  // 注册点击事件。利用refs和$refs重置表单
  // 希望获取到form表单组件 调用组件的重置方法（利用refs和$refs())
  methods: {
    reset () {
      this.$refs.form.resetFields()
    },
    login () {
      // 先校验 在发送ajac请求
      // 拿到form表单 组件 调用组件的校验方法
      // 参数1 是否校验成功boolean值
      // 参数2 是一个对象 包含了错误的校验字段
      this.$refs.form.validate(isValid => {
        // 如果校验失败 就直接return
        // if (!isValid)  return
        // 发送ajax请求
        axios({
          method: 'post',
          url: 'http://localhost:8888/api/private/v1/login',
          data: this.form
        }).then(res => {
          const { meta, data } = res.data
          if (meta.status === 200) {
            console.log(meta.msg)
            // 一登陆成功  就会存储到token(字符串)到本地
            localStorage.setItem('token', data.token)
            this.$message({
              // this.$message()
              type: 'success',
              message: meta.msg,
              duration: 1000
            })
            this.$router.push('/index')
          } else {
            this.$message.error(meta.msg)
          }
        })
      })
    }
  }
}
</script >

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
  .el-form {
    background-color: #fff;
    width: 400px;
    padding: 20px;
    padding-top: 70px;
    border-radius: 20px;
    margin: 0 auto;
    margin-top: 200px;
    position: relative;
    .logo {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -75px;
      border-radius: 50%;
      border: 5px solid #fff;
    }
    .loginBtn {
      margin-right: 70px;
    }
  }
}
</style>
