import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    outDir: 'dist',
    minify: false,
    rollupOptions: {
      //忽略打包vue文件
      external: ['vue'],
      input: ['kite-ui.ts'],
      output: {
        globals: {
          kiteUi: 'kite-ui',
          vue: 'Vue',
        },
      },
      // output: [
      //   {
      //     format: "es",
      //     entryFileNames: "[name].mjs",
      //     preserveModules: true,
      //     exports: "named",
      //     dir: "dist/es",
      //   },
      //   {
      //     format: "cjs",
      //     entryFileNames: "[name].cjs",
      //     preserveModules: true,
      //     exports: "named",
      //     dir: "dist/lib",
      //   },
      // ],
    },
    lib: {
      entry: './kite-ui.ts',
      name: 'KiteUI',
      fileName: 'kite-ui',
      formats: ['es', 'umd'],
    },
  },
  plugins: [
    vue(),
    dts({
      outDir: ['dist/types'],
    }),
  ],
})
