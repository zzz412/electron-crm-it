import { defineStore } from 'pinia'

export const useUserStore = defineStore('userId', {
  state: () => ({
    token: '原始值',
    userName: '张三'
  }),
  getters: {},
  actions: {},
  persist: {
    enabled: true, // 开启持久化
    strategies: [
      {
        storage: localStorage, // 持久化存储的介质
        paths: ['token']       // 需要持久化的字段
      }
    ]
  }
})
