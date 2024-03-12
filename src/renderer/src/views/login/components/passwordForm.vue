<script setup lang="ts">
  import { ref, reactive, onBeforeMount } from 'vue'
  import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
  import { UserRuleForm } from '@/interface/login'
  import { captchaImage, logonByJson } from '@/api/login'
  import { Encrypt } from '@u/aes'

  // 表单逻辑
  const formRef = ref<FormInstance>()
  const form = reactive<UserRuleForm>({
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
    getCaptcha()
  })

  // 登录
  const login = async () => {
    if (!formRef.value) return
    try {
      await formRef.value.validate()
      const res = await logonByJson({ ...form, username: Encrypt(form.username), password: Encrypt(form.password) })
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
    <el-form-item prop="username">
      <el-input v-model="form.username" prefix-icon="user" clearable placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" prefix-icon="user" show-password clearable placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="captcha">
      <div class="box-code">
        <el-input v-model="form.captcha" prefix-icon="CircleCheck" clearable placeholder="请输入验证码"></el-input>
        <el-image class="code" :src="captchaUrl" @click="getCaptcha"></el-image>
      </div>
    </el-form-item>
    <div class="remember">
      <div><el-checkbox label="记住密码"></el-checkbox></div>
      <div><router-link to="">忘记密码?</router-link></div>
    </div>
    <el-form-item>
      <el-button type="primary" round style="width: 100%" @click="login">登录</el-button>
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
