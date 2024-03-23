<script setup lang="ts">
  import { computed, onBeforeMount } from 'vue'
  // import DragTool from './components/DragTool.vue'
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import en from 'element-plus/dist/locale/en.mjs'

  import { useStore } from './store'
  const globalStore = useStore().global
  const locale = computed(() => (globalStore.language === 'zh-cn' ? zhCn : en))

  onBeforeMount(() => {
    // 1. 加载默认主题样式
    const htmlDOM = document.querySelector('html')
    if (htmlDOM) htmlDOM.className = globalStore.theme
  })
</script>

<template>
  <el-config-provider :locale="locale">
    <!-- <drag-tool> -->
      <router-view></router-view>
    <!-- </drag-tool> -->
  </el-config-provider>
</template>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: #333;
  }
</style>
