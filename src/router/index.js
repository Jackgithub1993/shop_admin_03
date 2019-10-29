import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Index from '../components/index.vue'
import Users from '../components/users.vue'
import Roles from '../components/roles.vue'
import Rights from '../components/rights.vue'
Vue.use(VueRouter)
// 创建路由实例
const routes = [
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    component: Index,
    children: [
      { path: '/users', component: Users },
      { path: '/roles', component: Roles },
      { path: '/rights', component: Rights }
    ]
  },
  { path: '/login', component: Login }
]
const router = new VueRouter({
  routes
})

// 所有的路由在被访问时，都会先经过全局前置守卫  只有前置守卫放行了，才能真正显示匹配的
// 路由  from从哪里来 to到哪去  next()放行  next('/login')拦截到登陆
// 如果有token 放行 ，如果去登陆，放行，其他情况，拦截到登陆页
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})
export default router
// 本接口会将token认证信息返回 请于请求于携带进行认证
// 前段
// 1.将token存储到本地
// 2。请求时携带
