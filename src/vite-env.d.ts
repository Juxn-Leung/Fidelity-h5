/// <reference types="vite/client" />
// vite-env.d.ts
interface AppInfo {
  buildTime: string
  version: string
}

declare const __APP_INFO__: AppInfo
