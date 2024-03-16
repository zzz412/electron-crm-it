import { getUserMenu } from '@/api/user'
import { defineStore } from 'pinia'
import { useUserStore } from './useUserStore'
import { Parent } from '@/interface/user'

export const useMenuStore = defineStore('menuId', {
  state(): { menu: Parent[] } {
    return {
      menu: []
    }
  },
  getters: {},
  actions: {
    // 获取导航菜单项
    async getMenu() {
      const res = await getUserMenu(useUserStore().rolePerm)
      this.menu = res.data
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['menu'] }]
  }
})
