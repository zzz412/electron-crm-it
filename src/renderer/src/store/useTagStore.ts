import { ITagRoute } from '@/interface/tag'
import { defineStore } from 'pinia'

export const useTagStore = defineStore('tagId', {
  state(): { viewTags: ITagRoute[] } {
    return {
      viewTags: []
    }
  },
  getters: {},
  actions: {
    // 添加标签
    pushViewTags(route: ITagRoute) {
      // 查找是否存在
      const target = this.viewTags.find(item => item.path === route.path)
      if (!target) this.viewTags.push(route)
    },
    // 删除标签
    removeViewTags(route: ITagRoute) {
      const index = this.viewTags.findIndex(item => item.path === route.path)
      this.viewTags.splice(index, 1)
    }
  },
  persist: {
    enabled: true, // 开启持久化
    strategies: [
      {
        storage: localStorage, // 持久化存储的介质
        paths: ['viewTags'] // 需要持久化的字段
      }
    ]
  }
})
