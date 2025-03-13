// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api/products": {
        target: "http://localhost:3000/users",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/products/, ""),
      },
    },
  },
});


