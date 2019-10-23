import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '../components/login.vue', component: Login }
  ]
})

export default router
