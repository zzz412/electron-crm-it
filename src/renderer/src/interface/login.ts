// 账号登录
export interface UserRuleForm {
  username: string
  password: string
  key: string
  captcha: string
}

// 验证码登录
export interface PhoneRuleForm {
  mobile: string
  captcha: string
}

// 发送验证码
export interface PhoneCodeForm {
  mobile: string
}

