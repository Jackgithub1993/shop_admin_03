import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.config.productionTip = false
// 只要引入vue的插件 就必须使用vue.use一下
Vue.use(ElementUI)

// axios的配置----------------------------------------------------------------
// 所有的组件都是可复用的vue实例 this.$axios
// 将axios挂载到vue实例原型上 将来所有的实例都可以共享
Vue.prototype.$axios = axios

// 配置axios的基准地址 效果 将来所有的请求 会自动在前面拼上路径
// 配置baseURL基准地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 打印config是一个对象里面有对象的数据
  // console.log(config)
  // 在请求拦截器这边，统一的添加token
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  response = response.data
  // 统一对响应进行处理，如果状态码是401，认为token过期或重新登录
  // 对齐进行拦截到首页
  if (response.meta.status === 401) {
    response.meta.msg = '尊敬的用户，您的登陆状态已过期，请重新登录'
    // 清除无效的token
    localStorage.removeItem('token')
    // 拦截到登陆
    router.push('/login')
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
