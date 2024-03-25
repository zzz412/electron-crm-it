// 角色接口[参数]
export interface IRole {
  current: number
  size: number
  roleName?: string
  rolePerm?: string
  enabled?: string
}

export interface Role {
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

// 角色接口[返回]
export interface IRoleRes {
  code: string
  msg: string
  data: {
    records: Role[]
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

// 角色权限树接口[返回]
export interface IRoleMenuItem {
  id: string
  name: string
  parentId: string
  sort: number
  path: string
  query: any
  component: string
  cache: number
  type: number
  visible: number
  redirect: string
  enabled: number
  perms: string
  icon: string
  remark: string | null
  createBy: string | null
  createTime: string | null
  updateBy: string | null
  updateTime: string | null
  children?: IRoleMenuItem[]
}

export interface IRoleTreeRes {
  code: string
  msg: string
  data: {
    records: IRoleMenuItem[]
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
}

// 角色添加接口[参数]
export interface IRoleAdd {
  id?: string | undefined
  roleName: string
  rolePerm: string
  enabled: string
  descript: string
  permissionIds: string[]
}

// 角色添加接口[返回]
export interface IRoleAddRes {
  code: string
  msg: string
  data: null
}

// 角色删除接口[返回]
export interface IRoleDelRes {
  code: string
  msg: string
  data: null
}

// 角色详情接口[返回]
export interface IRoleDetail {
  role: {
    id: string
    roleName: string
    rolePerm: string
    unitId: string
    dataPrivileges: string
    enabled: string
    createBy: null
    createTime: number
    updateBy: null
    updateTime: null
    descript: string | null
  }
  permissions: string[]
}

export interface IRoleDetailRes {
  msg: string
  code: string
  data: IRoleDetail
}
