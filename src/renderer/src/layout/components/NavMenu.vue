<script setup lang="ts">
  import { Parent } from '@/interface/user'
  import { PropType } from 'vue'

  defineProps({
    nextMenu: {
      type: Object as PropType<Parent[]>,
      required: true
    }
  })
</script>

<template>
  <div v-if="nextMenu.length <= 0">没有子级菜单</div>
  <el-menu-item v-for="item in nextMenu" :key="item.id" :index="item.path" >
    <el-icon><component :is="item.meta?.icon.replace('el-icon-', '') || 'user'" /></el-icon>
    <template #title>
      <span>{{ item.name }}</span>
    </template>
  </el-menu-item>
</template>

<style scoped lang="scss"></style>
