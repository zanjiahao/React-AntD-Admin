// 操作token get/set/remove
import cookie from 'react-cookies'

const TokenKey = 'bk_token' // 自定义修改

export function getToken() {
  return cookie.load(TokenKey)
}

// 设置cookie，第三个参数的意思是所有页面都能用这个cookie
export function setToken(token) {
  return cookie.save(TokenKey, token, { path: '/' })
}

export function removeToken() {
  return cookie.remove(TokenKey)
}
