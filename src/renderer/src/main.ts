import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './locales'

const app = createApp(App)

// icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
import 'element-plus/theme-chalk/index.css'
import '@/assets/css/styles.scss'


app.use(router)
app.use(store)
app.use(i18n as any)

app.mount('#app')
