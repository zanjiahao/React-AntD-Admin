import React from 'react'
import './index.scss'

const NotFound = () => {
  return (
    <div className="wscn-http404-container">
      <div className="wscn-http404">
        <div className="pic-404">
          <img className="pic-404__parent" src={new URL('@/assets/image/error_images/404.png', import.meta.url).href} alt="404" />
          <img
            className={'pic-404__child left'}
            src={new URL('@/assets/image/error_images/404_cloud.png', import.meta.url).href}
            alt="404"
          />
          <img className="pic-404__child mid" src={new URL('@/assets/image/error_images/404_cloud.png', import.meta.url).href} alt="404" />
          <img
            className={'pic-404__child right'}
            src={new URL('@/assets/image/error_images/404_cloud.png', import.meta.url).href}
            alt="404"
          />
        </div>
        <div className="bullshit">
          <div className="bullshit__oops">OOPS!</div>
          <div className="bullshit__headline">
            匹配不到页面资源...
          </div>
          <div className="bullshit__info">请检查您输入的网址是否正确，或点击下方按钮返回首页。</div>
          <a href="" className="bullshit__return-home">跟我回家</a>
        </div>
      </div>
    </div>
  )
}

export default NotFound