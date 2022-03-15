import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    // 源码构建
    sourcemap: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
})
