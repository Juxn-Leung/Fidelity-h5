import { defineConfig, loadEnv, normalizePath } from 'vite'
import react from '@vitejs/plugin-react-swc'
import postcss from './postcss.config'
import path from 'path'
import dayjs from 'dayjs'
import packageJson from './package.json'
import { createRequire } from 'node:module'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import legacy from '@vitejs/plugin-legacy'

const version = packageJson.version
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.')
  return {
    base: '',
    plugins: [
      react(),
      legacy({
        targets: ['defaults', 'not IE 11'],
        modernPolyfills: ['es.promise.with-resolvers'],
      }),
    ],
    define: {
      'import.meta.env.VITE_APP_VERSION': JSON.stringify(
        env.VITE_APP_VERSION || version
      ),
      'import.meta.env.VITE_APP_BUILD_TIME': JSON.stringify(
        dayjs().format('YYYY-MM-DD HH:mm:ss')
      ),
      'import.meta.env.VITE_APP_MARKERS': JSON.stringify(env.VITE_APP_MARKERS),
    },
    server: {
      port: 8080,
      proxy: {
        [env.VITE_APP_API_CONTEXT_PATH]: {
          target: env.VITE_APP_DEV_SERVER_PROXY_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        ['/service-html']: {
          target: env.VITE_APP_DEV_SERVER_PROXY_TARGET,
          changeOrigin: true,
        },
      },
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      postcss,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  }
})
