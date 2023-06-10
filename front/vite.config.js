import { fileURLToPath, URL } from 'node:url'
const path = require('node:path')

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

/** @type {import('vite').UserConfig} */
export default defineConfig({
    plugins: [vue()],
    root: path.resolve(__dirname, './src'),
    server: {
        //base:'/front',
        // proxy:{
        //     '/front': 'http://172.21.0.1:8000'
        // },
        port: 8000,
        hot: true,
        watch: {
            usePolling: true,
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    esbuild: {
        //drop: ['console', 'debugger'],
    },
})
