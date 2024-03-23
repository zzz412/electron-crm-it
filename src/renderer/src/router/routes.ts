import { RouteRecordRaw } from 'vue-router'

export const appRoutes: RouteRecordRaw[] = [
  { path: '/', name: 'layout', redirect: '/dashboard', component: () => import('@/layout/index.vue'), children: [] },
  { path: '/login', component: () => import('@/views/login/Login.vue') },
  // 将匹配所有内容并将其放在 `$route.params.pathMatch` 下
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
]
