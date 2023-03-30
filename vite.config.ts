import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'
// import requireTransform from 'vite-plugin-require-transform'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      /* options */
      dts: true,
      resolvers: [AntDesignVueResolver()]
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://express-ten-iota.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/getAI': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,

        rewrite: (path) => path.replace(/^\/getAI/, '')
      }
    }
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#FE6D31',
          'link-color': '#FE6D31',
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  }
})
export type VitePluginRequireTransformParamsType = {
  //filter files that should enter the plugin
  fileRegex?: RegExp
  //prefix that would plugin into the requireSpecifier
  importPrefix?: string
  //to deal with the requireSpecifier
  importPathHandler?: Function
}
