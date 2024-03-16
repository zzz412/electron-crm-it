import { createI18n } from 'vue-i18n'

//自己的包
import zh from './lang/zh-cn'
import en from './lang/en'

const messages = {
  'zh-cn': { ...zh },
  en: { ...en }
}

// 创建国际化
const globalStorage = JSON.parse(localStorage.getItem('globalId') as string)
const i18n = createI18n({
  locale: globalStorage?.language || 'zh-cn', // 初始化配置语言
  messages
})

export default i18n
