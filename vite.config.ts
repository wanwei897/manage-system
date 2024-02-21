import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

// import path from 'path'
// const pathSrc = path.resolve(__dirname, 'src')
// npm install @types/node --save-dev

export default defineConfig({
  // resolve: {
  //   alias: {
  //     '@': pathSrc,
  //   },
  // },
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      // 自动导入相关函数，如：ref, reactive, toRef 等
      imports: [
        'vue',
        'vue-router'
      ],
      resolvers: [
        // 自动导入Element Plus相关函数，如：Elmessage等
        ElementPlusResolver(),
      ],
    }),
    Components({    
      resolvers: [
        // 实现Element Plus组件按需导入
        ElementPlusResolver()
      ],
    }),
  ],
  server: {
    // 开启端口
    port: 8087,
    // 是否开启https
    https: false,
  }
})
