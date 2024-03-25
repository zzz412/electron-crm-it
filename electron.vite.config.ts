import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin(), bytecodePlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        // '@renderer': resolve('src/renderer/src'),
        '@': resolve('src/renderer/src'),
        '@s': resolve('src/renderer/src/store'),
        '@r': resolve('src/renderer/src/router'),
        '@v': resolve('src/renderer/src/views'),
        '@u': resolve('src/renderer/src/utils'),
        '@i': resolve('src/renderer/src/api'),
        '@c': resolve('src/renderer/src/components')
      }
    },
    server: {
      port: 8081,
      proxy: {
        '/api': {
          target: 'http://uat.crm.xuexiluxian.cn',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [vue(), AutoImport({ resolvers: [ElementPlusResolver()] }), Components({ resolvers: [ElementPlusResolver()] })]
  }
})
