import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                steamSW: path.resolve(__dirname, 'src/serviceworkers/SteamSW.js'),
                gamerpaySW: path.resolve(__dirname, 'src/serviceworkers/GamerPaySW.js')
            },
            output: {
                entryFileNames: (chunkInfo) => {
                    if (chunkInfo.name === 'steamSW') return 'SteamSW.js'
                    if (chunkInfo.name === 'gamerpaySW') return 'GamerPaySW.js'
                    return 'assets/[name]-[hash].js'
                }
            }
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'https://shapi.jagoba.dev',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/gamerpay-proxy': {
                target: 'https://api.gamerpay.gg',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/gamerpay-proxy/, '/prices')
            },
            '/steam-proxy': {
                target: 'https://steamcommunity.com',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => {
                    const url = new URL(path, 'http://localhost');
                    return url.searchParams.get('url') || path;
                }
            }
        }
    }
})