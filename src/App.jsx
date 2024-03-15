import { useRoutes, RouterProvider } from 'react-router-dom'
import router from '@/router'
// import { permissionRoutes } from '@/router/authRoute'
import useUserStore from '@/store/user'
import { useEffect } from 'react'

function App () {
  console.log('App进来了')
  // const UserStore = useUserStore()
  // 第1步：在这里做权限
  // ...
  // 第2步：在这里将有权限的layout路由存放到store，便于导航栏使用
  // ...
  useEffect(() => {
    console.log('App进来了useEffect')
    // const { roles, setMenuItems } = useUserStore.getState()
    // console.log('role=========>', roles)
    
    // const menuRoutes = []
    // layoutChildren.forEach(item => permissionRoutes(item, roles) && menuRoutes.push(item))
    // console.log('menuRoutes==============', menuRoutes)
    // setMenuItems(menuRoutes)
    // console.log('useUserStore.getState().menuItems==============', useUserStore.getState().menuItems)

  }, [])

  // const elements = useRoutes(routes)
  // return elements
  return (
    // 路由进行绑定
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
