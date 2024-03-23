import { getInfo } from '@/api/user'
import { Role, IUserInfo } from './../interface/user'
import { defineStore } from 'pinia'

export interface IUserStore {
  roles: Role[]
  rolePerm: string
  userInfo: Partial<IUserInfo>
}

export const useUserStore = defineStore('userId', {
  state(): IUserStore {
    return {
      roles: [],
      rolePerm: '',
      userInfo: {}
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

      // 保存用户信息
      this.userInfo = userInfo
    }
  },
  persist: {
    enabled: true, // 开启持久化
    strategies: [
      {
        storage: localStorage, // 持久化存储的介质
        paths: ['rolePerm', 'userInfo'] // 需要持久化的字段
      }
    ]
  }
})
