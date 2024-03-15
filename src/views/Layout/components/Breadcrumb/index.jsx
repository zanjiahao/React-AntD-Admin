import React from 'react'
import './index.scss'

const Breadcrumb = () => {
  return (
    <>
      <div className="breadcrumb-box">
        /Breadcrumb
        {/* <el-breadcrumb separator-icon="ArrowRight">
          <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="item in breadcrumbList" :key="item.path">
              <div class="el-breadcrumb__inner is-link" @click="onBreadcrumbClick(item)">
                <svg-icon v-show="item.meta.icon && globalStore.breadcrumbIcon" :name="item.meta.icon"> </svg-icon>
                <span class="breadcrumb-title">{{ item.meta.title }}</span>
              </div>
            </el-breadcrumb-item>
          </transition-group>
        </el-breadcrumb> */}
      </div>
    </>
  )
}

export default Breadcrumb