import { useGlobalStore } from "@/store/useGlobalStore"
import { RouteLocationNormalized } from "vue-router"

export const beforeEach = (to: RouteLocationNormalized) => {
  console.log(!useGlobalStore().token)
  // 判断是否为登录页
  if (to.path === '/login') return
  // 判断是否登录过，没有登录则跳转至login页
  if (!useGlobalStore().token) return '/login'

  return true
}

export const afterEach = () => {
  console.log('后置')
}
