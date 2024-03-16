import { useStore } from '@/store'
import axios, { AxiosResponse } from 'axios'

const request = axios.create({
  baseURL: '/api'
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 添加token
    const globalStore = useStore().global
    config.headers['Authorization'] = globalStore.token || ''
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
)

// 封装http请求
const http = {
  get<T>(url: string, params?: any, config?: Record<string, any>): Promise<T> {
    return new Promise((resolve, reject) => {
      request
        .get<T>(url, { params, ...config })
        .then((res: AxiosResponse<T>) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  post<T>(url: string, data?: any, config?: Record<string, any>): Promise<T> {
    return new Promise((resolve, reject) => {
      request
        .post<T>(url, data, config)
        .then((res: AxiosResponse<T>) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default http
