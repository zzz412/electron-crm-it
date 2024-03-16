import { ILoginRequest, PhoneCodeForm, PhoneRuleForm, UserRuleForm } from '@/interface/login'
import http from '@u/request'

// 用户登录
export const logonByJson = (data: UserRuleForm): Promise<ILoginRequest> => {
  return http.post<ILoginRequest>('/u/loginByJson', data)
}

// 图形验证码
export const captchaImage = (data: { key: string }): Promise<ArrayBuffer> => {
  return http.get<ArrayBuffer>('/captcha/image', data, { responseType: 'arraybuffer' })
}

// 获取动态验证码
export const loginCaptcha = (data: PhoneCodeForm): Promise<ILoginRequest> => {
  return http.get<ILoginRequest>('/captcha/sendRegisterOrLoginCaptcha', data)
}

// 手机验证码登录
export const loginByMobile = (data: PhoneRuleForm): Promise<ILoginRequest> => {
  return http.post<ILoginRequest>('/u/loginByMobile', data)
}
