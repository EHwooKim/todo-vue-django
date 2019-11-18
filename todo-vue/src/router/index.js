import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// views 폴더에는 해당 경로에서 메인으로 쓰이는 컴포넌트(vue파일)을 정의
// componets 폴더에는 각 경로별 컴포넌트의 자식 컴포넌트(vue파일)를 정의
Vue.use(VueRouter)

// 경로 설정
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
