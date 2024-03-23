import { getUserMenu } from '@/api/user'
import { defineStore } from 'pinia'
import { useUserStore } from './useUserStore'
import { Parent } from '@/interface/user'
import router from '@/router'
import clone from 'rfdc'

export interface Child {
  parentView: string
  path: string
  name: string
  meta: any
  redirect: string
  children?: Child[] | null
  component: any
  id?: string | undefined
  hidden?: boolean | undefined
  alwaysShow?: boolean | undefined
  query?: string | undefined
}

export interface Child extends Omit<Parent, 'children'> {
  children?: Child[] | null
}

export const useMenuStore = defineStore('menuId', {
  state(): { menu: Parent[]; menuRouter: Child[] } {
    return {
      menu: [],
      menuRouter: []
    }
  },
  getters: {},
  actions: {
    // 获取导航菜单项
    async getMenu() {
      const res = await getUserMenu(useUserStore().rolePerm)
      this.menu = res.data
    },
    // 动态生成导航路由表
    createRoutes(modulesMap: Record<string, () => Promise<any>>) {
      const _this = this
      initRouter()

      // 1. 初始化路由 => 将符合权限的路由添加到路由表中
      function initRouter() {
        // 获取菜单信息【未格式化的路由表】
        const menu: Parent[] = useMenuStore().menu
        // 过滤出符合权限的路由
        let menuRouter: Child[] = filterRouter(menu)
        // 扁平化路由表
        menuRouter = flatRoutes(menuRouter)
        // 循环添加路由 【不为layout就添加到根路由中】
        menuRouter.forEach((item: any) => {
          router.addRoute(item.parentView === 'layout' ? 'layout' : '', item)
        })
        _this.menuRouter = menuRouter
      }

      // 2. 格式化路由 => 将菜单信息转化为符合路由表要求的格式
      function filterRouter(menu: Parent[]): Child[] {
        // 定义一个空数组，用来存储符合权限的路由
        const arrRouter: Child[] = []
        // 遍历菜单
        menu.forEach((item: any) => {
          // 映射对应路由信息
          const route: Child = {
            parentView: item.parentView,
            path: item.path,
            name: item.name,
            meta: item.meta,
            redirect: item.redirect,
            // 设置子级路由表  ->  判断是否有子路由
            children: item.children ? filterRouter(item.children) : null,
            component: loadComponent(item.component)
          }
          // 将符合权限的路由添加到路由表中
          arrRouter.push(route)
        })
        // 返回符合权限的路由
        return arrRouter
      }

      // 3. 根据modulesMap[key]返回对应的value值
      function loadComponent(key: string | null): (() => Promise<any>) | undefined {
        if (key) return modulesMap[key]
        return undefined
      }

      // 4. 路由扁平化【用于添加路由】 breadcrumb用于面包屑处理
      function flatRoutes(routes: Child[], breadcrumb: Child[] = []): Child[] {
        // 定义一个空数组，用来扁平化后的路由
        const res: Child[] = []
        // 深度复制对象，并处理循环引用
        const cloneRoutes = clone()(routes)
        // 遍历路由表
        cloneRoutes.forEach((route: Child) => {
          // 浅拷贝路由对象
          const cloneRoute = { ...route }
          // 判断是否有子路由
          if (cloneRoute.children) {
            // 浅拷贝面包屑、路由表，并添加当前路由, 再添加到路由表meta中
            const tmpRoute = { ...route }
            const childrenBreadcrumb = [...breadcrumb]
            childrenBreadcrumb.push(route)
            tmpRoute.meta.breadcrumb = childrenBreadcrumb
            // 删除children字段，防止循环引用
            delete tmpRoute.children
            // 将当前路由添加到扁平化后的路由中
            res.push(tmpRoute)

            // 递归处理子路由【只嵌套了2级, 带上1级面包屑】
            const childrenRoutes = flatRoutes(cloneRoute.children, childrenBreadcrumb)
            res.push(...childrenRoutes)
          } else {
            // 浅拷贝面包屑，并添加当前路由, 再添加到路由表meta中
            const cloneBreadcrumb = [...breadcrumb]
            cloneRoute.meta.breadcrumb = cloneBreadcrumb
            cloneBreadcrumb.push(cloneRoute)
            res.push(cloneRoute)
          }
        })
        return res
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['menu'] }]
  }
})
