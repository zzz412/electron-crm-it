import axios from 'axios'

const request = axios.create({
  baseURL: '/api'
})

// 请求拦截器
request.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  (res) => res.data,
  (error) => Promise.reject(error)
)

export default request
