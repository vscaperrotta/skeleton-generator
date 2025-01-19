import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import paths from './config/paths';

const APP_DIR = paths.appSrc;

export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@src": `${APP_DIR}`,
      "@api": `${APP_DIR}/api`,
      "@assets": `${APP_DIR}/assets`,
      "@components": `${APP_DIR}/components`,
      "@containers": `${APP_DIR}/containers`,
      "@routes": `${APP_DIR}/routes`,
      "@store": `${APP_DIR}/store`,
      "@style": `${APP_DIR}/styles`,
      "@utils": `${APP_DIR}/utils`,
    },
  },
  lint: {
    enabled: true,
    lintFiles: ['**/*.js', '**/*.jsx'],
  },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       api: 'modern',
  //       additionalData: `
  //         @import "./src/styles/global.scss";
  //       `,
  //     },
  //   },
  // },
});
