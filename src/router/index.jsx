import { createHashRouter, Navigate, useNavigate, useRoutes } from 'react-router-dom'
import { HasTokenRoute, AuthRoute } from './authRoute.jsx'
import Login from '@/views/Login'
import Layout from '@/views/Layout/index.jsx'
import Home from '@/views/Home'
import NotFound from '@/views/ErrorPage/404/index.jsx'
import NotAuthPage from '@/views/ErrorPage/401/index.jsx'
import ProjectTest from '@/views/ProjectTest'

export const layoutRoutes = [
  {
    path: '/project-test',
    element: <ProjectTest></ProjectTest>,
    meta: {
      title: '项目测试页',
      icon: 'menu-project',
      roles: ['admin']
    }
  }
]

const routes = [
  {
    path: '/',
    element: <HasTokenRoute><Layout /></HasTokenRoute>,
    children: [
      {
        index: true, // 注意这里使用了 index 属性, 所以是默认路由
        element: <Navigate to="/home" replace />
      },
      {
        path: '/home',
        element: <Home />,
        meta: {
          title: '首页',
          icon: 'menu-home'
        }
      },
      // 筛选权限路由
      ...AuthRoute(layoutRoutes)
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  },
  {
    path: '/401',
    element: <NotAuthPage></NotAuthPage>
  }
]

// createBrowserRouter || createHashRouter
const router = createHashRouter(routes)
export default router