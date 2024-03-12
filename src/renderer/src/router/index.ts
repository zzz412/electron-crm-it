import { createWebHashHistory, createRouter } from 'vue-router'
import { appRoutes } from './routes'
import { afterEach, beforeEach } from './guards'

const router = createRouter({
  history: createWebHashHistory(), // Hash路由模式
  routes: appRoutes // 路由配置
})

router.beforeEach(beforeEach)

router.afterEach(afterEach)

export default router
