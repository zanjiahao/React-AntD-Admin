import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { BrowserRouter, HashRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import router from '@/router'
import 'virtual:svg-icons-register'

// 创建一个react元素和根目录标签进行绑定，并进行渲染
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode 是严格模式
  <React.StrictMode>
    {/* <RouterProvider router={router}></RouterProvider> */}
    {/* <BrowserRouter > */}
      <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>
)
