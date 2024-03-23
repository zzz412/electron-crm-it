import { Ref, ref } from 'vue'

interface IMemoPassword {
  memoVal: Ref<boolean>
  onMemoPassword: (value: boolean) => void
  setMemoPassword: (form: IUserPwd) => void
  loadMemoPassword: () => IUserPwd
}

interface IUserPwd {
  username: string
  password: string
}

// 记住密码hooks
function useMemoPassword(): IMemoPassword {
  const memoVal = ref<boolean>(localStorage.getItem('memoPassword') === 'true')

  // 记住密码
  const onMemoPassword = (value: boolean) => {
    localStorage.setItem('memoPassword', (memoVal.value = value).toString())
  }

  // 设置记住的密码
  const setMemoPassword = (form: IUserPwd) => {
    if (memoVal.value) {
      // 记住密码
      const userPwd = form
      localStorage.setItem('user-pwd', JSON.stringify(userPwd))
    } else {
      // 取消记住密码
      localStorage.removeItem('user-pwd')
    }
  }

  // 加载记住的密码
  const loadMemoPassword = (): IUserPwd => {
    const userPwd: string | null = localStorage.getItem('user-pwd')
    if (!userPwd) return { username: '', password: '' }
    return JSON.parse(userPwd) as IUserPwd
  }

  return { memoVal, onMemoPassword, setMemoPassword, loadMemoPassword }
}

export default useMemoPassword
