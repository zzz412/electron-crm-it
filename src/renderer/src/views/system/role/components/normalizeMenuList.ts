import { IRoleMenuItem } from '@/api/interface/role'

// 格式化权限列表 ->  树结构
const normalizeMenuList = (list: IRoleMenuItem[]): IRoleMenuItem[] => {
  const menuMap = new Map(list.map((item) => [item.id, item]))
  const result: IRoleMenuItem[] = []

  list.forEach((menu) => {
    if (menu.parentId === '-1') return result.push(menu)
    const parent = menuMap.get(menu.parentId)
    parent && parent.children?.push(menu)
    return
  })

  sortMenuList(result)
  return result
}

function sortMenuList(list: IRoleMenuItem[]) {
  list.sort((a, b) => a.sort - b.sort)
  list.forEach((item) => {
    if (Array.isArray(item.children) && item.children.length > 1) sortMenuList(item.children)
  })
}

export default normalizeMenuList
