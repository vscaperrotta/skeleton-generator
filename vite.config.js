import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import paths from './config/paths';

const APP_DIR = paths.appSrc;

export default defineConfig({
  server: {
    open: true,
  },
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
  optimizeDeps: {
    include: ['**/*.scss'], // Include all .scss files
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "/src/styles/maih.scss";`,
      },
    },
  },
  build: {
    minify: "terser",
    assetsDir: 'assets',
  },
});
