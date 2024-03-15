import React from 'react'
import './index'
import api from '@/api'
import {Button} from 'antd'

const ProjectTest = () => {
  const getAdminInfo = async () => {
    const resp = await api.UserApi.adminLoginApi()
    console.log('resp===', resp)
  }

  return (
    <div className={'project-box content-box card'}>
      <Button onClick={getAdminInfo}>获取admin接口信息</Button>
    </div>
  )
}

export default ProjectTest