// 和用户相关的状态管理
import { getToken, removeToken } from '@/utils/token'
import { getUserStorage, removeUserStorage } from '@/utils/userInfo'
import { mockUser } from '@/assets/mock/userMock'
import { create } from 'zustand'
import api from '@/api'

/*
  create 方法进行创建store
  1. 函数参数必须返回一个对象 对象内部编写状态数据和方法
  2. set 是用来修改数据的专门方法必须调用它来修改数据

  修改状态数据的方法: 
    提示：set() 方法可以传对象也可以传函数
    1. 第一种是 set 里面直接传对象修改值 set({ token: val })
    2. 第二种是需要用到内部的变量的处理方法: set((state) => ({ count: state.count + 1 }))
    
  获取数据的方式：
    提示：初始化时候用解构获取，修改数据后就需要使用 .getState() 这种方式
    1. 解构 => const { setToken: setStoreToken, getInfo } = useUserStore()
    2. getState(), 使用 useUserStore.getState() 得到整个 store 对象
*/
const useUserStore = create((set) => ({
  token: getToken() || '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  menuItems: [], // 菜单项

  setMenuItems: (menuItems) => set({ menuItems }),

  // 设置 token
  setToken: (token) => set({ token }),

  // 重置 token
  resetToken: () => {
    set({ token: '' })
    removeToken() // 假设 removeToken 是一个用来清除 cookie 的函数
    removeUserStorage()
  },

  // 设置用户信息
  setName: (name) => set({ name }),
  setAvatar: (avatar) => set({ avatar }),
  setIntroduction: (introduction) => set({ introduction }),
  setRoles: (roles) => set({ roles }),

  // 获取用户信息
  getInfo: async () => {
    const userStore = useUserStore.getState()
    const response = await new Promise((resolve) => {
      // 你可以在这里获取并设置用户信息
      const userToken = useUserStore.getState().token.split('-')[0]
      const info = mockUser[userToken] || {}
      // 保存到localStorage
      getUserStorage(info)
      resolve({ ...info })
    })
    userStore.setInfo({ ...response })
    return { ...response }
  },

  // 设置用户信息
  setInfo: (info = null) => {
    if (info) {
      set({ ...info })
    } else {
      set({ name: '', avatar: '', introduction: '', roles: [] })
    }
  },

  // 退出登录
  logout: () => {
    // 调用 store 中的其他 actions
    const userStore = useUserStore.getState()
    userStore.resetToken()
    userStore.setInfo()
  }
}))

export default useUserStore
