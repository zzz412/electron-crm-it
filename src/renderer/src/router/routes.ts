import { RouteRecordRaw } from 'vue-router'

export const appRoutes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/login', component: () => import('../views/login/Login.vue') },
]
