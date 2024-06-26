import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      __APP_ENV__: env.APP_ENV,
      global: 'globalThis'
    },
    plugins: [react(), tsconfigPaths()],
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis'
        },
        plugins: [NodeGlobalsPolyfillPlugin({ process: true, buffer: true })]
      }
    },
    build: {
      commonjsOptions: {
        ignoreTryCatch: (id) => id !== 'stream'
      },
      transformMixedEsModules: true
      // rollupOptions: {
      //   output: {
      //     manualChunks: (id) => {
      //       const isModule = id.includes("node_modules");
      //       if (isModule && id.includes("@solana")) {
      //         return "vendor_solana";
      //       }
      //       if (isModule && id.includes("@project-serum")) {
      //         return "vendor_anchor";
      //       }
      //       if (isModule && id.includes("@tanstack")) {
      //         return "vendor_tanstack";
      //       }
      //     },
      //   },
      // },
    },
    resolve: {
      alias: [
        {
          find: 'stream',
          replacement: `stream-browserify`
        },
        {
          find: '@coral-xyz/anchor',
          replacement: '@coral-xyz/anchor/dist/cjs/index.js'
        }
      ]
    },
    server: {
      port: 9933
    }
  };
});
