<script setup lang="ts">
  import { ITagRoute } from '@/interface/tag'
  import { useTagStore } from '@/store/useTagStore'
  import { storeToRefs } from 'pinia'
  import { watch } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const tagStore = useTagStore()
  const { viewTags } = storeToRefs(tagStore)
  const route = useRoute()
  const router = useRouter()

  // 删除tag
  const removeTag = (tag: ITagRoute) => {
    const index = viewTags.value.findIndex((item) => item.path === tag.path)
    tagStore.removeViewTags(tag)
    // 判断是否为激活的标签 -> 设置上一个
    if (tag.path === route.path) {
      const leftTag = viewTags.value[index - 1]
      // 没有上一个标签，则跳转到首页
      router.push(leftTag ? leftTag.path : '/')
    }
  }

  // 监听路由跳转 ——> 添加标签
  watch(
    route,
    () => {
      if (!route.name) return
      const currentRoute = { name: route.name, path: route.path, affix: route.meta.affix }
      tagStore.pushViewTags(currentRoute as ITagRoute)
    },
    { immediate: true }
  )
</script>

<template>
  <div class="adminui-tags">
    <ul>
      <li v-for="item in viewTags" :key="item.path" :class="{ active: item.path === $route.path }">
        <router-link :to="item.path">
          <span>{{ item.name }}</span>
          <!-- 如果标签不是固定标签，则显示关闭图标 -->
          <el-icon v-if="!item.affix" @click.prevent.stop="removeTag(item)">
            <el-icon-close />
          </el-icon>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .adminui-tags {
    height: 35px;
    background: #fff;
    border-bottom: 1px solid #e6e6e6;
    ul {
      display: flex;
      overflow: hidden;
      li {
        font-size: 12px;
        cursor: pointer;
        display: inline-block;
        float: left;
        height: 34px;
        line-height: 34px;
        position: relative;
        flex-shrink: 0;
        &::after {
          content: ' ';
          width: 1px;
          height: 100%;
          position: absolute;
          right: 0px;
          background-image: linear-gradient(#fff, #e6e6e6);
        }
        &:hover {
          background: #ecf5ff;
        }
        &.active {
          background: #409eff;
          a {
            color: #fff;
          }
        }
        a {
          display: inline-block;
          padding: 0 10px;
          width: 100%;
          height: 100%;
          color: #999;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        i {
          margin-left: 10px;
          border-radius: 3px;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            background: rgba(0, 0, 0, 0.2);
            color: #fff;
          }
        }
      }
    }
  }
</style>
