import { defineStore } from "pinia";

export const useGlobalStore = defineStore('globalId', {
  state: () => ({
    theme: '',
    language: 'zh-cn',
    token: ''
  }),
  getters: {},
  actions: {},
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['theme', 'language', 'token'] }]
  }
})
