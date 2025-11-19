import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    src: 'public/serviceworkers/*.js',
                    dest: ''
                }
            ]
        })
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