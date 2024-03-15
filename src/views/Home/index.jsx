import React from 'react'
import './index.scss'

const Home = () => {
  return (
    <>
      <div className="home card">
        <img
          className="home-bg"
          src={new URL('@/assets/image/welcome.png', import.meta.url).href}
          alt="welcome"
        />
      </div>
    </>
  )
}

export default Home