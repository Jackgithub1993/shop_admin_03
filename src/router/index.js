import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Index from '../components/index.vue'
Vue.use(VueRouter)
// 创建路由实例
const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index', component: Index },
  { path: '/login', component: Login }
]
const router = new VueRouter({
  routes
})
export default router
