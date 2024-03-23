<script setup lang="ts">
  import { ref, reactive, onBeforeMount } from 'vue'
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
  import { UserRuleForm } from '@/interface/login'
  import { captchaImage, logonByJson } from '@/api/login'
  import { Decrypt, Encrypt } from '@u/aes'
  import useLogin from '@/hooks/useLogin'
  import useMemoPassword from '@/hooks/useMemoPassword'

  // 记住密码
  const { memoVal, onMemoPassword, setMemoPassword, loadMemoPassword } = useMemoPassword()

  // 表单逻辑
  const formRef = ref<FormInstance>()
  const form = reactive<UserRuleForm>({
    // username: 'admin',
    // password: 'abc123456',
    username: '',
    password: '',
    key: '',
    captcha: ''
  })
  const rules: FormRules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  }

  // 验证码
  const captchaUrl = ref('')
  const getCaptcha = async () => {
    const key = new Date().getTime().toString()
    form.key = key
    const res = await captchaImage({ key })
    const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
    const imgUrl = URL.createObjectURL(blob)
    captchaUrl.value = imgUrl
  }

  onBeforeMount(() => {
    // 读取密码
    const { username, password } = loadMemoPassword()
    form.username = Decrypt(username)
    form.password = Decrypt(password)

    getCaptcha()
  })

  // 登录
  const isLogin = ref(false)
  const login = async () => {
    if (!formRef.value) return
    try {
      await formRef.value.validate()
      isLogin.value = true
      // 处理加密参数值
      const cryptForm = { username: Encrypt(form.username), password: Encrypt(form.password) }
      const res = await logonByJson({ ...form, ...cryptForm })
      // 调用hooks
      useLogin(res)
      // 记住密码
      setMemoPassword(cryptForm)
      isLogin.value = false
    } catch (error) {
      ElMessage.warning('请填写正确内容')
    }
    return
  }
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="0" size="large">
    <el-form-item prop="username">
      <el-input v-model="form.username" prefix-icon="user" clearable :placeholder="$t('login.userPlaceholder')"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" prefix-icon="user" show-password clearable :placeholder="$t('login.PWPlaceholder')"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <div class="box-code">
        <el-input v-model="form.captcha" prefix-icon="CircleCheck" clearable :placeholder="$t('login.codePlaceholder')"></el-input>
        <el-image class="code" :src="captchaUrl" @click="getCaptcha"></el-image>
      </div>
    </el-form-item>
    <div class="remember">
      <div><el-checkbox v-model="memoVal" :label="$t('login.forgetPassword2')" @change="onMemoPassword"></el-checkbox></div>
      <div>
        <router-link to="">{{ $t('login.forgetPassword') }}</router-link>
      </div>
    </div>
    <el-form-item>
      <el-button type="primary" round style="width: 100%" @click="login" :loading="isLogin">{{ $t('login.signIn') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">
  .box-code {
    display: flex;
    align-items: center;
    width: 100%;
    .code {
      margin-left: 10px;
      width: 100px;
      height: 40px;
      cursor: pointer;
    }
  }
  .remember {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 14px;
  }
</style>
