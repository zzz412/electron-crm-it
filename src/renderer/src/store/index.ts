import { defineStore, createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import { useUserStore } from './useUserStore'

const store = createPinia()

store.use(piniaPluginPersist)

export const useStore = defineStore('storeId', {
  state: () => ({
    count: 0,
    user: useUserStore() // 用户模块
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    doubleCount2: (state) => state.count * 5
  },
  actions: {
    increment(n: number) {
      console.log(n)
      this.count += n
    }
  }
})

export default store
