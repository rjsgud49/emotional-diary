import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    proxy: {
      "/diaries": {
        target: "http://localhost:3000", // 🔁 백엔드 서버 주소
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
})
