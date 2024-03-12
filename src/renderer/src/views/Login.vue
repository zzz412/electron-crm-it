<script setup lang="ts">
  import { useStore } from '@/store'
  import { logonByJson } from '@/api/login'

  const userStore = useStore().user

  const login = async () => {
    const res = await logonByJson({ password: '123', username: '123123', key: '123', captcha: '321' })
    console.log(res)
    userStore.userName = '哈哈哈'
    userStore.token = '策一策'
  }
</script>

<template>
  <div>登录页面</div>
  <h1>用户名: {{ userStore.userName }} token: {{ userStore.token }}</h1>
  <button @click="login">登录</button>
  <button @click="$router.back()">返回</button>
</template>

<style scoped lang="scss"></style>
