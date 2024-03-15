import { useEffect } from 'react'
import './index.scss'
import { useImmer } from 'use-immer'
import useGlobalStore from '@/store/global'
import useUserStore from '@/store/user'
import SvgIcon from '@/components/SvgIcon'
import { useNavigate, useLocation } from 'react-router-dom'
import router from '@/router'
import { Menu } from 'antd'
import {
  HomeFilled,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined
} from '@ant-design/icons'

const items = [
  {
    label: '首页',
    key: '/home',
    icon: <SvgIcon name="menu-home" />
  },
  {
    label: '项目测试页',
    key: '/project-test',
    icon: <SvgIcon name="menu-project" />
  },
  {
    label: 'Option 2',
    key: '2',
    icon: <DesktopOutlined />
  },
  {
    label: 'Option 3',
    key: '4',
    icon: <ContainerOutlined />
  },
  {
    label: 'Navigation Two',
    key: 'sub2',
    icon: <AppstoreOutlined />,
    children: [
      {
        label: 'Option 9',
        key: '9'
      },
      {
        label: 'Option 10',
        key: '10'
      },
      {
        label: 'Submenu',
        key: 'sub3',
        children: [
          {
            label: 'Option 11',
            key: '11'
          },
          {
            label: 'Option 12',
            key: '12'
          }
        ]
      }
    ]
  }
]

const LayoutMenu = (props) => {
  console.log('router==========', router)
  const { routes } = router
  const { isCollapse } = useGlobalStore()
  // const { isCollapse } = useUserStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [initData, setInitData] = useImmer({
    menuItems: []
  })

  // 路由转menu组件item项的相关处理
  function routeToMenuItem(routeArr = []) {
    const res = []
    routeArr.forEach(route => {
      const tmp = { ...route }
      if (tmp.children) {
        tmp.children = routeToMenuItem(tmp.children)
      }
      const { path, meta: { icon, title }, children = undefined } = tmp
      res.push({
        key: path,
        label: title,
        icon: <SvgIcon name={icon} />,
        children
      })
    })

    return res
  }

  useEffect(() => {
    console.log('router=========>', router)
    const { routes } = router
    const [layoutRoutes] = routes.filter(item => item.path === '/')
    console.log('layoutRoutes==============', layoutRoutes.children)
    const layoutChildren = layoutRoutes.children.filter(item => item.path && item)
    console.log('layoutChildren==============', layoutChildren)
    setInitData(state => {
      state.menuItems = routeToMenuItem(layoutChildren)
    })
  }, [])

  // 导航选中项跳转处理
  function onMenuClick(route) {
    navigate(route.key)
  }

  // 设置导航选中项高亮
  const selectKeys = location.pathname

  return (
    <>
      <Menu
        selectedKeys={selectKeys}
        mode="inline"
        theme="dark"
        inlineCollapsed={isCollapse}
        items={initData.menuItems}
        className='layout-menu'
        onClick={onMenuClick}
      />
    </>
  )
}

export default LayoutMenu