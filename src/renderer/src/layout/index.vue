<script setup lang="ts">
  import { Parent } from '@/interface/user'
  import { useMenuStore } from '@/store/useMenuStore'
  import { storeToRefs } from 'pinia'
  import { onBeforeMount, ref, watch } from 'vue'
  import NavMenu from './components/NavMenu.vue'
  import TopBar from './components/TopBar.vue'
  import UserBar from './components/UserBar.vue'
  import TagBar from './components/TagBar.vue'
  import { useRoute } from 'vue-router'
  const route = useRoute()

  // 一级菜单列表
  const { menu } = storeToRefs(useMenuStore())
  // 当前选中菜单
  const pMenu = ref<Parent>({})
  // 二级菜单列表
  const nextMenu = ref<Parent[] | undefined>([])

  // 切换一级菜单
  const switchMenu = (item: Parent) => {
    pMenu.value = item
    nextMenu.value = item.children
  }

  // 设置默认菜单
  const routesPath = () => {
    // 当前路由值[用于默认菜单显示]
    const currentRoute = (route.meta.breadcrumb as Parent[])[0]
    // 设置一级菜单
    pMenu.value = currentRoute
    // 设置二级菜单
    nextMenu.value = currentRoute.children
  }

  // 监听路由变化
  watch(
    route,
    () => {
      routesPath()
    },
    { immediate: true }
  )

  onBeforeMount(() => {
    window.electron.ipcRenderer.invoke('resize-window')
  })

  // 菜单展开收起
  const menuIsCollapse = ref(false)
  const toggle_menuIsCollapse = () => {
    menuIsCollapse.value = !menuIsCollapse.value
  }
</script>

<template>
  <section class="aminui-wrapper">
    <!-- 1级菜单 -->
    <div class="aminui-side-split">
      <!-- 顶部Logo -->
      <div class="aminui-side-split-top">
        <router-link to="/">
          <img class="logo" src="@/assets/images/logo-r.png" />
        </router-link>
      </div>
      <!-- 菜单项 -->
      <div class="adminui-side-split-scroll">
        <el-scrollbar>
          <ul>
            <li v-for="item in menu" :key="item.id" :class="{ active: item.path === pMenu.path }" @click="switchMenu(item)">
              <el-icon><component :is="item.meta?.title === '小鹿线' ? 'House' : item.meta?.icon.replace('el-icon-', '')" /></el-icon>
              <p>{{ item.name }}</p>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
    <!-- 2级菜单 -->
    <div class="aminui-side" :class="{ isCollapse: menuIsCollapse }">
      <!-- 标题 -->
      <div v-if="!menuIsCollapse" class="adminui-side-top">
        <h2>{{ pMenu.name }}</h2>
      </div>
      <!-- 菜单项 -->
      <div class="adminui-side-scroll">
        <el-scrollbar>
          <el-menu router :default-active="$route.path" :collapse="menuIsCollapse" :collapse-transition="false">
            <NavMenu :next-menu="nextMenu!" />
          </el-menu>
        </el-scrollbar>
      </div>
      <!-- 伸缩图标 -->
      <div class="adminui-side-bottom" @click="toggle_menuIsCollapse">
        <el-icon>
          <el-icon-expand v-if="menuIsCollapse" />
          <Fold v-else />
        </el-icon>
      </div>
    </div>
    <!-- 右侧组件 -->
    <div class="aminui-body">
      <TopBar><UserBar /></TopBar>
      <TagBar />
      <el-scrollbar>
        <div class="aminui-main">
          <router-view></router-view>
        </div>
      </el-scrollbar>
    </div>
  </section>
</template>

<style scoped lang="scss">
  .aminui-wrapper {
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    .aminui-side-split {
      display: flex;
      flex-direction: column;
      width: 65px;
      // flex-basis: 65px;
      flex-shrink: 0;
      height: 100vh;
      overflow: hidden;
      background: #222b45;
      .aminui-side-split-top {
        height: 49px;
        -webkit-app-region: drag;
      }
      .aminui-side-split-top a {
        display: inline-block;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .aminui-side-split-top .logo {
        height: 30px;
        vertical-align: bottom;
      }
      .adminui-side-split-scroll {
        overflow: auto;
        overflow-x: hidden;
        height: 100%;
        flex: 1;
      }
      li {
        cursor: pointer;
        width: 65px;
        height: 65px;
        color: #fff;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      li i {
        font-size: 18px;
      }
      li p {
        margin-top: 5px;
        font-size: 12px;
      }
      li:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      li.active {
        background: #409eff;
      }
    }
    .aminui-side {
      display: flex;
      flex-flow: column;
      width: 210px;
      flex-shrink: 0;
      flex-basis: 210px;
      height: 100vh;
      background: #fff;
      box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
      border-right: 1px solid #e6e6e6;
      transition: width 0.1s;
      .adminui-side-top {
        -webkit-app-region: drag;
        border-bottom: 1px solid #ebeef5;
        height: 49px;
        line-height: 50px;
      }
      .adminui-side-top h2 {
        padding: 0 20px;
        font-size: 17px;
        color: #3c4a54;
      }
      .adminui-side-scroll {
        overflow: auto;
        overflow-x: hidden;
        flex: 1;
      }
      .adminui-side-bottom {
        border-top: 1px solid #ebeef5;
        height: 51px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .adminui-side-bottom i {
        font-size: 16px;
      }
      .adminui-side-bottom:hover {
        color: var(--el-color-primary);
      }
    }
    .aminui-side.isCollapse {
      width: 65px;
      flex-basis: 65px;
    }
    .aminui-body {
      display: flex;
      flex-direction: column;
      flex: 1;
      overflow: auto;
      .aminui-main {
        overflow: auto;
        flex: 1;
      }
    }
  }
  .el-menu {
    border-right: 0px;
  }
</style>
