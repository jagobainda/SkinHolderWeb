import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        tailwindcss(),
        {
            name: 'copy-service-workers',
            closeBundle() {
                copyFileSync(
                    resolve(__dirname, 'public/serviceworkers/SteamSW.js'),
                    resolve(__dirname, 'dist/SteamSW.js')
                )
                copyFileSync(
                    resolve(__dirname, 'public/serviceworkers/GamerPaySW.js'),
                    resolve(__dirname, 'dist/GamerPaySW.js')
                )
            }
        }
    ],
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