import React from 'react'
import './index.scss'
import { useImmer } from 'use-immer'
import useGlobalStore from '@/store/global'

const LayoutLogo = () => {
  const { isCollapse } = useGlobalStore()
  const [initData, setInitData] = useImmer({
    title: 'React AntD Admin',
    logo: '@/assets/react.svg'
  })

  return (
    <div className="header-logo flx-center">
      <img src={new URL('@/assets/react.svg', import.meta.url).href} className="sidebar-logo" />
      {!isCollapse && <h1 className="sidebar-title">
        {initData.title}
      </h1>}
    </div>
  )
}

export default LayoutLogo