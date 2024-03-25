export interface Record {
  id: string
  username: string // 用户名
  realName: string // 真实姓名
  userType: number // 用户类型（0：普通账号；1：超级管理员）
  email: string // 用户邮箱
  phone: string // 手机号码
  gender: number // 用户性别（1：男；2：女；0：未知）
  avatar: string // 头像路径
  enabled: number // 帐号状态（0：禁用；1：正常）
  delFlag: number // 是否删除（0：有效；1：删除）
  loginIp: string // 最后登陆IP
  loginDate: number // 最后登陆时间
  createBy: null | string
  createTime: number
  updateBy: string
  updateTime: number
  remark: null | string // 备注
}

export interface IUserListData {
  records: Record[]
  total: number
  size: number
  current: number
  orders: any[]
  optimizeCountSql: boolean
  searchCount: boolean
  countId: null
  maxLimit: null
  pages: number
}

// 用户列表接口【请求】
export interface IUserList {
  current: number
  size: number
  username?: string
  realName?: string
  email?: string
  phone?: string
  gender?: string
  enabled?: string
  unitId?: string
}

// 用户列表接口【返回】
export interface IUserListRes {
  code: string
  msg: string
  data: IUserListData
}

// 机构列表接口【返回】
export interface IUnitListData {
  address: string
  code: string
  codeseq: string
  contact: string
  createBy: string
  createTime: number
  delFlag: number
  email: string
  enabled: number
  id: string
  leaderId: string | null
  mobile: string
  name: string
  parentId: string
  system: number
  updateBy: string | null
  updateTime: number | null
  web: string,
  children: IUnitListData[]
}

export interface IUnitListRes {
  code: string
  msg: string
  data: IUnitListData[]
}

// 岗位列表接口【返回】
export interface IPostListData {
  id: string // 岗位ID
  postName: string // 岗位名称
  postCode: string // 岗位编码
  sort: number // 排序
  enabled: number // 是否启用（1：启用；0：禁用）
  remark: string | null // 备注
  createBy: string | null
  createTime: string | null
  updateBy: string | null
  updateTime: string | null
}

export interface IPostListRes {
  code: string
  msg: string
  data: {
    records: IPostListData[]
    total: number
    size: number
    current: number
    orders: any[]
    optimizeCountSql: boolean
    searchCount: boolean
    countId: string | null
    maxLimit: number | null
    pages: number
  }
}

// 角色列表接口【返回】
export interface IRoleListData {
  id: string
  roleName: string
  rolePerm: string
  unitId: string
  dataPrivileges: number
  enabled: number
  createBy: string | null
  createTime: number | null
  updateBy: string | null
  updateTime: number | null
  descript: string | null
}

export interface IRoleListRes {
  code: string
  msg: string
  data: {
    records: IRoleListData[]
    total: number
    size: number
    current: number
    orders: any[]
    optimizeCountSql: boolean
    searchCount: boolean
    countId: string | null
    maxLimit: number | null
    pages: number
  }
}

// 添加用户接口【请求】
export interface IUserAdd {
  username?: string // 用户名
  password?: string // 密码
  realName?: string // 真实姓名
  email?: string | null // 邮箱
  gender?: string // 用户性别（1：男；2：女；0：未知）
  avatar?: string | null // 头像
  remark?: string | null // 备注
  phone?: string // 手机号
  enabled?: string // 帐号状态（0：禁用；1：正常）
  roleIds?: string[] // 角色
  postIds?: string[] // 岗位
  unitId?: string // 机构ID
}

// 添加用户接口【返回】
export interface IUserAddRes {
  code: string
  msg: string
  data: null
}

// 删除用户接口【返回】
export interface IUserDelRes {
  code: string
  msg: string
  data: null
}

// 获取用户详情接口【返回】
export interface IUserInfoData {
  id: string
  username: string
  realName: string
  userType: string
  email: string
  phone: string
  gender: string
  avatar: string
  enabled: string
  delFlag: string
  loginIp: number
  loginDate: number
  createBy: string
  createTime: number
  updateBy: string
  updateTime: number
  remark: string | null
}

export interface IUserDetailRes {
  code: string
  msg: string
  data: {
    roleIds: string[]
    postIds: string[]
    user: IUserInfoData
  }
}

// 修改用户接口【请求】
export interface IUserUpdate extends IUserAdd {
  id: string
}

// 修改用户接口【返回】
export interface IUserUpdateRes {
  code: string
  msg: string
  data: null
}
