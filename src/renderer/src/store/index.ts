import { defineStore, createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import { useUserStore } from './useUserStore'
import { useGlobalStore } from './useGlobalStore'
import { useMenuStore } from './useMenuStore'
import { useTagStore } from './useTagStore'

const store = createPinia()

store.use(piniaPluginPersist)

export const useStore = defineStore('storeId', {
  state: () => ({
    user: useUserStore(), // 用户模块
    global: useGlobalStore(), // 全局模块
    menu: useMenuStore(), // 菜单模块
    tag: useTagStore() // 标签模块
  })
})

export default store
