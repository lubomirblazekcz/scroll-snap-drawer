import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssNesting from 'postcss-nesting'

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [postcssNesting]
    }
  },
})
