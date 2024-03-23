// 字典网络请求API
import http from '@/utils/request'
import { IDictsRes } from './interface/dicts'

// * 查询字典项【批量】
export const queryDictsBatch = (data: string[]) => {
  return http.post<IDictsRes>('/system/dict/item/queryBatch', data)
}
