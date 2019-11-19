// views 폴더에는 해당 경로에서 메인으로 쓰이는 컴포넌트(vue파일)을 정의
// componets 폴더에는 각 경로별 컴포넌트의 자식 컴포넌트(vue파일)를 정의
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

// 경로 설정
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
