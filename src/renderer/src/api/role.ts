import http from '@/utils/request'
import { IRole, IRoleAdd, IRoleAddRes, IRoleDelRes, IRoleDetailRes, IRoleRes, IRoleTreeRes } from './interface/role'

// * 获取角色列表
export const rolePage = (data: IRole) => {
  return http.get<IRoleRes>('/system/role/page', data)
}

// * 获取角色菜单权限树
// export const menuTree = () => {
//   return http.get<IRoleTreeRes>('/system/menu/tree')
// }

// * 获取角色菜单权限树【按钮权限】
export const menuTree = (data: { current: number; size: number; enabled: string }) => {
  return http.get<IRoleTreeRes>('/system/menu/page', data)
}

// * 新增角色
export const roleAdd = (data: IRoleAdd) => {
  return http.post<IRoleAddRes>('/system/role/add', data)
}

// * 删除角色
export const roleDelete = (data: string) => {
  return http.get<IRoleDelRes>(`/system/role/delete/${data}`)
}

// * 修改角色
export const roleUpdate = (data: IRoleAdd) => {
  return http.post<IRoleAddRes>('/system/role/update', data)
}

// * 获取角色详情
export const roleDetail = (data: string) => {
  return http.get<IRoleDetailRes>(`/system/role/get/${data}`)
}
