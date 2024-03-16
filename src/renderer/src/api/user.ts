import { IMenuData, IUserData } from '@/interface/user'
import http from '@/utils/request'

// * 获取用户信息
export const getInfo = () => http.get<IUserData>('/personal/getInfo')

// * 获取路由
export const getUserMenu = (data: string) => http.get<IMenuData>(`/personal/getRouters/${data}`)
