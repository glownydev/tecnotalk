import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import type { PluginOption } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    react() as PluginOption,
    electron([
      {
        entry: 'src/main.ts',
        vite: {
          build: {
            outDir: 'dist/main',
          },
        },
      },
      {
        entry: 'src/preload.ts',
        vite: {
          build: {
            outDir: 'dist/preload',
          },
        },
      },
    ]) as PluginOption,
    renderer() as PluginOption,
  ],
});