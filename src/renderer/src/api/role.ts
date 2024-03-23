import http from '@/utils/request'
import { IRole, IRoleAdd, IRoleAddRes, IRoleDelRes, IRoleRes, IRoleTreeRes } from './interface/role'

// * 获取角色列表
export const rolePage = (data: IRole) => {
  return http.get<IRoleRes>('/system/role/page', data)
}

// * 获取角色菜单权限树
export const menuTree = () => {
  return http.get<IRoleTreeRes>('/system/menu/tree')
}

// * 新增角色
export const roleAdd = (data: IRoleAdd) => {
  return http.post<IRoleAddRes>('/system/role/add', data)
}

// * 删除角色
export const roleDelete = (data: string) => {
  return http.get<IRoleDelRes>(`/system/role/delete/${data}`)
}
