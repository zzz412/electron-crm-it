// 字典API 接口规范

import { Dicts } from '@/interface/dicts'

// * 查询字典【返回】
export interface IDictsRes {
  code: string
  msg: string
  data: Dicts
}
