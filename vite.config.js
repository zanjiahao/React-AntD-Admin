import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import autoprefixer from 'autoprefixer'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url'
const __dirnameNew = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/assets/svgs')],
      // 指定symbolld格式
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  build: {
    minify: 'terser', // 必须开启：使用terserOptions才有效果
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  resolve: {
    // 配置根路径别名： import('@/pages/login/login.vue')
    alias: {
      '@': resolve(__dirnameNew, 'src'),
      // 注意一定不要随意命名，a b c这样的，项目的目录也不能为关键字保留字！！
      comp: resolve(__dirnameNew, 'src/components'),
      // 配置图片可以这样引用
      '/img': './src/assets'
      // 'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
    }
  },
  css: {
    postcss: {
      plugins: [
        // 配置 autoprefixer (自动添加前缀)
        autoprefixer({
          overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8', '> 1%'],
          grid: false
        })
      ]
    }
  },
  // 跨域
  server: {
    //使用IP能访问
    host: '0.0.0.0',
    // 端口
    port: 8006,
    // 热更新
    hmr: true,
    //设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,

    //自定义代理规则
    proxy: {
      // mock 数据相关前缀
      '/api/mock': {
        target: 'https://mock.apifox.cn/m1/1982890-0-default/',
        changeOrigin: true,
        rewrite: path => path.replace(new RegExp('^/api/mock'), '')
      }
    }
  }
})
