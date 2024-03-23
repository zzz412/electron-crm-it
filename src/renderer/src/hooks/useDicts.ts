// 全局字典Hooks

import { queryDictsBatch } from '@/api/dicts'
import { Dicts } from '@/interface/dicts'
import { onBeforeMount, ref } from 'vue'

const useDicts = (data: string[]) => {
  // 字典数据
  const dicts = ref<Partial<Dicts>>({})

  // 获取字典数据
  const getDicts = async (data: string[]) => {
    const res = await queryDictsBatch(data)
    dicts.value = res.data
  }

  onBeforeMount(() => {
    getDicts(data)
  })

  return { dicts, getDicts }
}

export default useDicts
