// 字典相关类型和接口定义
type DictsItem = {
  id: string
  typeId: string
  k: string
  v: string
  sort: number
  remark: string
  createBy: string
  createTime: number
  updateBy: string | null
  updateTime: number | null
}

export type Dicts = Record<string, DictsItem[]>
