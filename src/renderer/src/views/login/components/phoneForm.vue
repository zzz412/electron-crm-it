<script setup lang="ts">
  import { ref, reactive } from 'vue'
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
  import { PhoneRuleForm } from '@/interface/login'
  import { loginByMobile, loginCaptcha } from '@/api/login'
  import { Encrypt } from '@u/aes'

  // 表单逻辑
  const formRef = ref<FormInstance>()
  const form = reactive<PhoneRuleForm>({
    mobile: '',
    captcha: ''
  })
  const validatorTel = (_rule: any, value: string, callback: any) => {
    if (!value) return callback(new Error('请填写手机号'))
    if (!/^1[3456789]\d{9}$/.test(value)) return callback(new Error('请填写正确手机号'))
    callback()
  }
  const rules: FormRules = {
    mobile: [{ validator: validatorTel , trigger: 'blur' }],
    captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  }

  // 验证码
  const time = ref(60)
  const disabled = ref(false)
  const getCode = async () => {
    const validate = await formRef.value?.validateField('mobile', () => null)
    if (!validate) return ElMessage.error('请填写正确手机号')

    const res = await loginCaptcha({ mobile: Encrypt(form.mobile) })
    if (res.code !== '200') return ElMessage.error(res.msg)
    ElMessage.success('发送成功')

    disabled.value = true
    time.value = 60
    const timer = setInterval(() => {
      time.value --
      if (time.value < 1) {
        clearInterval(timer)
        disabled.value = false
        time.value = 0
      }
    }, 1000)

    return
  }

  // 登录
  const isLogin = ref(false)
  const login = async () => {
    if (!formRef.value) return
    try {
      await formRef.value.validate()
      const res = await loginByMobile({
        mobile: Encrypt(form.mobile),
        captcha: Encrypt(form.captcha)
      })
      if (res.code !== '200') return ElMessage.error(res.msg)
      console.log('登录成功')
    } catch (error) {
      ElMessage.warning('请填写正确内容')
    }
    return
  }
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="0" size="large">
    <el-form-item prop="mobile">
      <el-input v-model="form.mobile" prefix-icon="user" clearable placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <div class="login-msg-yzm">
        <el-input v-model="form.captcha" prefix-icon="CircleCheck" clearable placeholder="请输入验证码"></el-input>
        <el-button :disabled="disabled" @click="getCode">获取验证码 <span v-if="disabled">({{ time }})</span></el-button>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" round style="width: 100%" :loading="isLogin" @click="login">登录</el-button>
    </el-form-item>
    <div>
      <router-link to="">忘记密码</router-link>
    </div>
  </el-form>
</template>

<style scoped lang="scss">
  .login-msg-yzm {
    display: flex;
    width: 100%;
    .el-button {
      margin-left: 10px;
    }
  }
</style>
