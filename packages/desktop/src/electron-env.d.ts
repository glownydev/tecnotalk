/// <reference types="vite/client" />

declare module 'vite-plugin-electron/electron-env' {
  interface ImportMetaEnv {
    readonly VITE_DEV_SERVER_URL: string
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}