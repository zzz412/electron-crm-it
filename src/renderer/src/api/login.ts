import { PhoneCodeForm, PhoneRuleForm, UserRuleForm } from '@/interface/login'
import request from '@u/request'

interface ILoginRequest {
  code: string
  msg: string
  data?: string
}

// 用户登录
export const logonByJson = (data: UserRuleForm): Promise<ILoginRequest> => {
  return request({ url: '/u/loginByJson', method: 'post', data })
}

// 图形验证码
export const captchaImage = (params: { key: string }): Promise<ArrayBuffer> => {
  return request({ url: '/captcha/image', responseType: 'arraybuffer', params })
}

// 获取动态验证码
export const loginCaptcha = (data: PhoneCodeForm): Promise<ILoginRequest> => {
  return request({ url: '/captcha/sendRegisterOrLoginCaptcha', params: data })
}

// 手机验证码登录
export const loginByMobile = (data: PhoneRuleForm): Promise<ILoginRequest> => {
  return request({ url: '/u/loginByMobile', method: 'post', data })
}
