// import { Parent } from '@/interface/user'
import { useGlobalStore } from '@/store/useGlobalStore'
import { useMenuStore } from '@/store/useMenuStore'
import { RouteLocationNormalized } from 'vue-router'
import router from '@/router'


// * 调整Component字段格式:  () => import(路径)
// * 导入views目录下的所有vue文件【页面文件】
const modules: Record<string, () => Promise<any>> = import.meta.glob('@/views/**/*.vue')
const modulesMap: Record<string, () => Promise<any>> = {}
Object.keys(modules).forEach((key) => {
  const componentName = key.replace('/src/views', '').replace('.vue', '').replace('/index', '').replace('/', '')
  if (key.includes('index')) {
    modulesMap[`${componentName}/index`] = modules[key]
  }
  modulesMap[componentName] = modules[key]
})

export const beforeEach = (to: RouteLocationNormalized) => {
  // 判断是否为登录页
  if (to.path === '/login') return
  // 判断是否登录过，没有登录则跳转至login页
  if (!useGlobalStore().token) return '/login'

  // 生成路由表【刷新时只执行一次】
  const menuStore = useMenuStore()
  let hasNewRoutes = false
  if (!menuStore.menuRouter.length) {
    menuStore.createRoutes(modulesMap)
    hasNewRoutes = true
  }

  // console.log('路由值', to.matched.length)
  // 处理生成路由表后，路由匹配跳转问题【刷新匹配空地址】
  // if (to.matched.length === 0) router.push(to.fullPath)
  if (hasNewRoutes) router.push(to.fullPath)

  return true
}

export const afterEach = () => {
  console.log('后置')
}
