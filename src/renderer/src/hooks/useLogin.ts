// 登录操作hooks
import { ILoginRequest } from '@/interface/login'
import router from '@/router'
import { useStore } from '@/store'
import { useMenuStore } from '@/store/useMenuStore'
import { useUserStore } from '@/store/useUserStore'
import { ElMessage, ElNotification } from 'element-plus'
const globalStore = useStore().global

const useLogin = async (res: ILoginRequest) => {
  // 1. 判断是否登录成功
  if (res.code !== '200') return ElMessage.error(res.msg)

  // 2. 存储token
  globalStore.token = res.data as string

  // 3. 获取用户信息
  await useUserStore().getUserInfo()

  // 4. 获取路由
  await useMenuStore().getMenu()

  // 4. 提示
  ElNotification({
    title: '通知:',
    message: '登录成功, 欢迎您回来!',
    type: 'success'
  })

  // 5. 跳转后台管理系统首页
  router.push('/')

  return
}

export default useLogin
