import './index.scss'
import api from '@/api'
import { useState, useEffect, useCallback } from 'react'
import { useImmer } from 'use-immer'
import { setToken } from '@/utils/token'
import { setUserStorage } from '@/utils/userInfo'
import { getTimeState } from '@/utils/index'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, Checkbox, notification } from 'antd'
import { LockOutlined, UserOutlined, EyeTwoTone, EyeInvisibleOutlined, CheckCircleFilled } from '@ant-design/icons'
import useUserStore from '@/store/user'

// 初始化数据
const initInfo = {
  username: '',
  password: '',
  remember: true
}

const Login = () => {
  const navigate = useNavigate()
  const { setToken: setStoreToken, getInfo } = useUserStore()
  // 使用 useImmer 代替 useState
  const [formValue, setFormValue] = useImmer({
    loading: false
  })

  // 设置loading状态
  const setLoading = (val) => {
    setFormValue((state) => {
      state.loading = val
    })
  }

  // 表单校验成功后触发的函数，失败触发的是校验失败函数
  const onFinish = (values) => {
    // 登录处理事件
    handleLogin(values)
  }

  const handleLogin = useCallback(async (formData) => {
    setLoading(true)
    try {
      const { username } = formData
      let resp = null
      if (username === 'admin') {
        resp = await api.UserApi.adminLoginApi()
      } else if (['zjh', 'zanjiahao'].includes(username)) {
        resp = await api.UserApi.zjhLoginApi()
      } else {
        resp = await api.UserApi.visitorLoginApi()
      }
      const resData = resp?.data
      if (resData) {
        const { token, tokenHead } = resData
        // 设置token
        let bkToken = `${tokenHead}-${token}`
        setToken(bkToken) // 保存 token 到 cookie 中
        setStoreToken(bkToken) // 保存 token 到 store(状态管理)中
        const respInfo = await getInfo()
        // 保存用户基础信息到本地缓存
        setUserStorage(respInfo)

        notification.info({
          message: <div style={{ fontSize: 16, fontWeight: 900 }}>{getTimeState()}</div>,
          description: <div style={{ fontSize: 14 }}>欢迎登录 React AndDesign Admin</div>,
          placement: 'topRight',
          icon: <CheckCircleFilled style={{ color: '#67c23a' }} />
        })
        // 跳转首页
        navigate('/')
      }
    } finally {
      setLoading(false)
    }

  }, [navigate])

  return (
    <div className="login-wrapper">
      <Card className="login-card">
        <h3 className='title'>Login</h3>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={initInfo}
          validateTrigger="onBlur"
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{
              required: true,
              message: 'Please input your Username!'
            }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your Password!' },
              { pattern: /^.{6,}$/, message: 'Not less than 6 digits' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="form-forgot">Forgot password</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={formValue.loading}>
              Login
            </Button>
            Or <Link className="register-text">register now!</Link>
          </Form.Item>
        </Form>
      </Card>

    </div>
  )
}

export default Login