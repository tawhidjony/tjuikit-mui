import react from '@vitejs/plugin-react-swc';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import path, { extname, relative } from 'path';
import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import { libInjectCss } from 'vite-plugin-lib-inject-css';
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "ViteButton",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      
      external: ["react", "react-dom", 'react/jsx-runtime'],
      

      input: Object.fromEntries(
        glob.sync('**/*.{ts,tsx}').map(file => [
          relative(
            'dist',
            file.slice(0, file.length - extname(file).length)
          ),
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),

      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(), dts(),libInjectCss(),],
})
