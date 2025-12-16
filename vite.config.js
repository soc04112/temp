import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path'; 

// const certDir = '../cert';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // React에서 '/api'로 시작하는 요청이 들어오면
      '/api': {
        // 실제 BingX Open API 호스트로 요청을 전달합니다.
        target: 'https://open-api.bingx.com',
        changeOrigin: true, // 호스트 헤더를 target 주소로 변경합니다. (필수)
        rewrite: (path) => path.replace(/^\/api/, ''), // '/api' 경로 접두사를 제거합니다.
        secure: true, // HTTPS 대상에 대해 SSL 인증서를 확인합니다. (기본값)
      },
    },
      port: 3500,
      // https: {
      //     key: fs.readFileSync(path.join(certDir, 'key.pem')),
      //     cert: fs.readFileSync(path.join(certDir, 'cert.pem')),
      // },
      // host: true, 
      // allowedHosts: ["vt.ngrok.pro"],
      watch: {
        usePolling: true, 
        interval: 100,   
      },
  }
})
