import React from 'react'
import './index.scss'
import { useImmer } from 'use-immer'

const Footer = () => {
  const [initData, setInitData] = useImmer({
    href: 'https://gitee.com/zjh-sir/vue-el-plus-admin.git', // todo...
    target: '_blank',
    context: '2023 React AntDesign Admin.'
  })

  return (
    <footer>
      <a href={initData.href} target={initData.target} rel="noreferrer">{initData.context}</a>
    </footer>
  )
}

export default Footer