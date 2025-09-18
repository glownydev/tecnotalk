// /// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    VITE_DEV_SERVER_URL: string | undefined
    DIST: string
    VITE_PUBLIC: string
  }
}