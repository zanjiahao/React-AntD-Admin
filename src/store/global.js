// 全局状态管理
import { create } from 'zustand'

const useGlobalStore = create((set) => ({
  title: '网址标题',
  // 是否显示设置抽屉
  isSetting: false,
  // 语言切换
  language: 'zh',
  // 布局模式 (horizontal | vertical)
  layout: 'vertical',
  // 主题颜色
  primary: '#409eff',
  // 暗黑模式
  isDark: false,
  // 折叠
  isCollapse: false,
  // 面包屑导航
  breadcrumb: true,
  // 面包屑导航图标
  breadcrumbIcon: true,
  // 标签页
  tabs: true,
  // 标签页图标
  tabsIcon: true,
  // 页脚
  footer: true,

  // 新增一个 update 方法，可以一次性更新多个状态
  updateGlobal: (updates) => set((state) => ({ ...state, ...updates }))
}))

export default useGlobalStore
