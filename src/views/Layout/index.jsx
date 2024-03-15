import './index.scss'
import React from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Menu, message } from 'antd'
import useUserStore from '@/store/user'
import useGlobalStore from '@/store/global'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import LayoutLogo from './components/LayoutLogo'
import LayoutMenu from './components/LayoutMenu'
import Breadcrumb from './components/Breadcrumb'
import Tabs from './components/Tabs'
import ToolBar from './components/ToolBar'
import Footer from './components/Footer'
import SettingsDrawer from './components/SettingsDrawer'

const Layout = () => {
  console.log('Layout页面')
  const navigate = useNavigate()
  const location = useLocation()
  const { resetToken } = useUserStore()
  const { isCollapse, breadcrumb, tabs, footer, updateGlobal } = useGlobalStore()

  // 改变折叠模式
  const toggleCollapsed = () => {
    updateGlobal({ isCollapse: !isCollapse })
  }

  return (
    <div className='vertical-wrapper'>
      <div className={`left-wrapper ${isCollapse && 'folded-style'}`} >
        <div className="logo-box">
          <LayoutLogo />
        </div>
        <LayoutMenu />
      </div>

      <div className="right-wrapper">
        <header className="app-header">
          <div className="head-left">
            <div className="sidebar-switch flx-center" >
              <div onClick={toggleCollapsed}>
                {isCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
            </div>
            {breadcrumb && <Breadcrumb />}
          </div>
          <div className="head-tools">
            <ToolBar />
          </div>
        </header>
        {/* Tab标签栏组件 */}
        {tabs && <Tabs />}
        <div className="app-body">
          <div className='app-main'>
            {/* 二级路由渲染的地方 */}
            <Outlet></Outlet>
          </div>
        </div>
        {footer && <Footer></Footer>}
      </div>
      <SettingsDrawer />
    </div>
  )
}

export default Layout