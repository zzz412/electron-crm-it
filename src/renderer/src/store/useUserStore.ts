import { getInfo } from '@/api/user';
import { Role } from './../interface/user';
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userId', {
  state(): { roles: Role[]; rolePerm: string } {
    return {
      roles: [],
      rolePerm: ''
    }
  },
  getters: {},
  actions: {
    async getUserInfo() {
      const res = await getInfo()
      const { permissions, roles, units, userInfo } = res.data

      // 保存角色信息
      this.roles = roles
      this.rolePerm = roles[0].rolePerm
    }
  },
  persist: {
    enabled: true, // 开启持久化
    strategies: [
      {
        storage: localStorage, // 持久化存储的介质
        paths: ['rolePerm'] // 需要持久化的字段
      }
    ]
  }
})
