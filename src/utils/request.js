import axios from 'axios'
import { getToken, removeToken } from '@/utils/token'
import { message } from 'antd'
import router from '@/router'

/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status) => {
  // 状态枚举
  const statusEnum = {
    400: '请求失败！请您稍后重试',
    401: '登录失效！请您重新登录',
    403: '当前账号无权限访问！',
    404: '你所访问的资源不存在！',
    405: '请求方式错误！请您稍后重试',
    408: '请求超时！请您稍后重试',
    500: '服务器异常！',
    501: '网络未实现',
    502: '网络错误',
    503: '服务不可用！',
    504: '网络超时！',
    505: 'http版本不支持该请求'
  }

  const content = Object.keys(statusEnum).includes(status.toString()) ? statusEnum[status] : '请求失败！'
  message.error({ content })
}

// Full config:  https://github.com/axios/axios#request-config
const request = axios.create({
  // 默认地址请求地址，可在 .env.** 文件中修改
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30 * 1000, // Timeout
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
  // 跨域时候允许携带凭证
  // withCredentials: true
})

/**
 * @description 请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * token校验(JWT) : 接受服务器返回的 token,存储到 vuex/pinia/本地储存当中
 */
request.interceptors.request.use(
  config => {
    // 在发送请求之前执行处理操作
    const token = getToken()
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  error => {
    // 对请求错误执行处理操作
    return Promise.reject(error)
  }
)

/**
 * @description 响应拦截器
 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
 */
request.interceptors.response.use(
  response => {
    return response.data
  },
  async error => {
    const { response } = error
    // 根据服务器响应的错误状态码，做不同的处理
    if (response) {
      // 清除失效token，跳转登录页
      if (response.status === 401) {
        removeToken()
        router.navigate('/login')
      }
      // 选择报错信息进行提示
      checkStatus(response.status)
    }

    return Promise.reject(error)
  }
)

export default request
