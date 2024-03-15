// 操作localStorage get/set/remove
// 将用户基础信息保存到localStorage

const LocalKey = 'USER_INFO' // 用户基础信息的 key

export function getUserStorage() {
  return JSON.parse(localStorage.getItem(LocalKey))
}

// 设置cookie，第三个参数的意思是所有页面都能用这个cookie
export function setUserStorage(info) {
  localStorage.setItem(LocalKey, JSON.stringify(info))
}

export function removeUserStorage() {
  localStorage.removeItem(LocalKey)
}
