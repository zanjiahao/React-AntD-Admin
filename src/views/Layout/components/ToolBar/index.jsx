import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './index.scss'
import useUserStore from '@/store/user'
import useGlobalStore from '@/store/global'
import { useImmer } from 'use-immer'
import { Dropdown, Space, Modal } from 'antd'
import SvgIcon from '@/components/SvgIcon'
import { CaretDownOutlined } from '@ant-design/icons'

const items = [
  {
    label: <Link to="/home">首页</Link>,
    key: '1',
    icon: <SvgIcon name="menu-home" className='dropdown-svg' />
  },
  {
    label: <a href="https://www.antgroup.com">Github</a>, // todo...
    key: '2',
    icon: <SvgIcon name="github" className='dropdown-svg' />
  },
  {
    label: <a href="https://www.antgroup.com">Gitee</a>, // todo...
    key: '3',
    icon: <SvgIcon name="gitee" className='dropdown-svg' />
  },
  {
    label: '页面设置',
    key: 'setting',
    icon: <SvgIcon name="settings" className='dropdown-svg' />
  },
  { type: 'divider' },
  {
    label: '退出登录',
    key: 'logout',
    icon: <SvgIcon name="logout" className='dropdown-svg' />
  }
]

const ToolBar = () => {
  const useUser = useUserStore()
  const useGlobal = useGlobalStore()
  const navigate = useNavigate()

  // Dropdown点击事件
  const onClick = ({ key }) => {
    switch (key) {
      case 'setting':
        openSettingsDrawer()
        break
      case 'logout':
        Modal.confirm({
          centered: true, // 垂直居中展示
          content: '您是否确认退出登录？',
          okText: '确认',
          cancelText: '取消',
          onOk: logout,
          footer: (_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              <OkBtn />
            </>
          )
        })
        break
    }
  }

  // 打开页面设置抽屉
  function openSettingsDrawer() {
    useGlobal.updateGlobal({ isSetting: true })
  }

  // 注销，退出登录
  function logout() {
    useUser.logout()
    navigate('/login')
  }

  return (
    <div className='right-menu'>
      <div className={'right-menu-item hover-effect ver-clr'} onClick={openSettingsDrawer}>
        <SvgIcon name="settings" size={18} />
      </div>
      <div className={'user-name ver-clr'}>{useUser.name}</div>
      <Dropdown
        menu={{ items, onClick }}
        trigger={['click']}
        placement="bottomRight"
        arrow={{ pointAtCenter: true }}
        className='avatar-container'
        overlayClassName='toolbar-dropdown'
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <div className='avatar-wrapper'>
              <img src={useUser.avatar} className="user-avatar" />
              <CaretDownOutlined className={'icon-caret ver-clr'} />
            </div>
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default ToolBar