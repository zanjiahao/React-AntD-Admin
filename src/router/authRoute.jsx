import { useEffect, useCallback, useMemo } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getToken } from '@/utils/token'
import { getUserStorage, setUserStorage } from '@/utils/userInfo'
import useUserStore from '@/store/user'

// 判断有没有token，没有跳转回登录页
export const HasTokenRoute = ({ children }) => {
  const token = getToken()
  if (token) {
    // 用户信息处理
    UserInfoHandle(token)
    // 将组件自身返回
    return <>{children}</>
  } else {
    return <Navigate to={'/login'} replace></Navigate>
  }
}

// 用户信息处理
export const UserInfoHandle = (token) => {
  const { getInfo, setInfo } = useUserStore()

  useEffect(() => {
    if (token) {
      const userInfo = getUserStorage()
      console.log('userInfo=====', userInfo)
      // 用户信息处理
      if (!userInfo) {
        // 重新获取获取用户信息
        const fetchData = async () => {
          const resData = await getInfo()
          setUserStorage({ ...resData })
        }
        fetchData()
      } else {
        setInfo({ ...userInfo })
      }
    }
  }, [token, getInfo, setInfo])
}

// 路由的权限处理
// export const permissionRoutes = (childRoute, roles) => {
//   const { meta } = childRoute
//   // 添加权限验证逻辑
//   const hasPermission = roles.some(role => {
//     // 判断角色是否符合要求
//     if (role === 'admin') {
//       return true
//     } else if (meta.roles) {
//       return meta.roles.includes(role)
//     } else {
//       // 当没有meta中roles可以认为是不需要权限判断，直接放行
//       return true
//     }
//   })
//   return hasPermission
// }

export const AuthRoute = (layoutRoutes) => {
  // const { roles } = useUserStore()
  console.log('AuthRoute权限进来了 菜单路由列表 ==============>', layoutRoutes)
  const userLocalStorage = getUserStorage()
  // const { roles } = userLocalStorage
  console.log('userLocalStorage===', userLocalStorage)
  if (!userLocalStorage) return []
  const { roles } = userLocalStorage
  console.log('userLocalStorage.roles===', roles)
  // 如果登录用户是admin直接返回路由列表
  if (roles.includes('admin')) return layoutRoutes
  // 非admin情况下需要验证权限
  const authList = layoutRoutes.filter(item => {
    // 添加权限验证逻辑
    const hasPermission = roles.some(role => {
      // 当meta中没有roles属性可以认为是不需要权限判断，直接放行
      if (!item.meta.roles) return true
      else return item.meta.roles.includes(role)
    })
    if (hasPermission) return item
  })
  return authList
}
