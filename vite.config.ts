import react from '@vitejs/plugin-react';
import type { Plugin } from 'vite';
import { checker } from 'vite-plugin-checker';
import readableClassnames from 'vite-plugin-readable-classnames';
import sassDts from 'vite-plugin-sass-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const moveBuiltCssAfterRuntimeStyles = (): Plugin => ({
  name: 'move-built-css-after-runtime-styles',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler() {
      return [
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: `document.querySelectorAll('link[rel="stylesheet"][href$=".css"]').forEach((link) => document.head.appendChild(link));`,
          injectTo: 'body',
        },
      ];
    },
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    checker({
      typescript: true,
    }),
    react(),
    readableClassnames(),
    sassDts({
      enabledMode: ['development'],
      esmExport: true,
    }),
    tsconfigPaths(),
    moveBuiltCssAfterRuntimeStyles(),
  ],
  base: '/react-burger/',
  test: {
    globals: true,
    environment: 'jsdom',
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
    setupFiles: ['./vitest-setup.ts'],
  },
  server: {
    open: true,
  },
});
