import React from 'react'
import './index.scss'
import useGlobalStore from '@/store/global'
import { Drawer, Divider, Switch, Tooltip } from 'antd'
import { LayoutOutlined, CheckCircleFilled, SettingOutlined } from '@ant-design/icons'

const SettingsDrawer = () => {
  const { isSetting, layout, primary, isDark, breadcrumb, breadcrumbIcon, tabs, tabsIcon, footer, updateGlobal } = useGlobalStore()

  const isShowDrawer = (bool) => {
    updateGlobal({ isSetting: bool })
  }

  // 设置修改更新全局配置项
  // const updateGlobalData = (option) => {
  //   updateGlobal({ ...option })
  // }
  return (
    <>
      <Drawer
        title="页面设置"
        placement='right'
        width='300px'
        closable={false}
        onClose={() => isShowDrawer(false)}
        open={isSetting}
      >
        {/* 布局切换 */}
        <Divider plain className="divider" content-position="center">
          <div className='divider-box'>
            <LayoutOutlined className='divider-icon' />
            <span className="divider-text">布局设置</span>
          </div>
        </Divider>
        <div className="layout-box">
          {/* <Tooltip placement="top" title='横向布局' color='#409EFF' mouseEnterDelay={0.4} >
            <div className={'layout-item layout-horizontal'} onClick={() => updateGlobal({ layout: 'horizontal' })} >
              <div className="layout-dark"></div>
              <div className="layout-content"></div>
              {layout === 'horizontal' && <CheckCircleFilled className='layout-icon' />}
            </div>
          </Tooltip> */}
          <Tooltip placement="top" title='纵向布局' color='#409EFF' mouseEnterDelay={0.4} >
            <div className={'layout-item layout-vertical'} onClick={() => updateGlobal({ layout: 'vertical' })} >
              <div className="layout-dark"></div>
              <div className="layout-container">
                <div className="layout-light"></div>
                <div className="layout-content"></div>
              </div>
              {layout === 'vertical' && <CheckCircleFilled className='layout-icon' />}
            </div>
          </Tooltip>
        </div>

        {/* 界面设置 */}
        <Divider plain className="divider" content-position="center">
          <div className='divider-box'>
            <SettingOutlined className='divider-icon' />
            <span className="divider-text">界面设置</span>
          </div>
        </Divider>
        {/* 面包屑 */}
        <div className="setting-item">
          <span>面包屑</span>
          <Switch size="small" checked={breadcrumb} onClick={(bool) => updateGlobal({ breadcrumb: bool })} />
        </div>
        {/* 面包屑图标 */}
        <div className="setting-item">
          <span>面包屑图标</span>
          <Switch size="small" checked={breadcrumbIcon} onClick={(bool) => updateGlobal({ breadcrumbIcon: bool })} />
        </div>
        {/* 标签栏 */}
        <div className="setting-item">
          <span>标签栏</span>
          <Switch size="small" checked={tabs} onClick={(bool) => updateGlobal({ tabs: bool })} />
        </div>
        {/* 标签栏图标 */}
        <div className="setting-item">
          <span>标签栏图标</span>
          <Switch size="small" checked={tabsIcon} onClick={(bool) => updateGlobal({ tabsIcon: bool })} />
        </div>
        {/* 页脚 */}
        <div className="setting-item">
          <span>页脚</span>
          <Switch size="small" checked={footer} onClick={(bool) => updateGlobal({ footer: bool })} />
        </div>
      </Drawer>
    </>
  )
}

export default SettingsDrawer