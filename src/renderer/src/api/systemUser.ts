import http from '@/utils/request'
import { IPostListRes, IRoleListRes, IUnitListRes, IUserAdd, IUserAddRes, IUserDelRes, IUserDetailRes, IUserList, IUserListRes, IUserUpdate, IUserUpdateRes } from './interface/systemUser'

// * 用户列表
export const userPage = (data: IUserList) => {
  return http.get<IUserListRes>('/system/user/page', data)
}

// * 机构列表【新增用户相关】
export const unitList = () => {
  return http.get<IUnitListRes>('/system/unit/tree')
}

// * 岗位列表【新增用户相关】
export const postPage = () => {
  return http.get<IPostListRes>('/system/post/page')
}

// * 角色列表【新增用户相关】
export const rolePage = () => {
  return http.get<IRoleListRes>('/system/role/page', { current: 1, size: 999, enabled: '1' })
}

// * 新增用户
export const userAdd = (data: IUserAdd) => {
  return http.post<IUserAddRes>('/system/user/add', data)
}

// * 删除用户
export const userDel = (data: string) => {
  return http.get<IUserDelRes>(`/system/user/delete/${data}`)
}

// * 用户详情
export const userGet = ( data:string) =>{
	return http.get<IUserDetailRes>(`/system/user/get/${data}`)
}

// * 修改用户
export const userUpdate = ( data: IUserUpdate ) =>{
	return http.post<IUserUpdateRes>('/system/user/update',data)
}
