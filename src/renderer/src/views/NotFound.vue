<script setup lang="ts">
  import ImageUrl from '@/assets/kun.jpg'
</script>

<template>
   <el-result title="404" sub-title="页面跑丢了哦!">
    <template #icon>
      <el-image :src="ImageUrl"/>
    </template>
    <template #extra>
      <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
    </template>
  </el-result>
</template>

<style scoped lang="scss"></style>
