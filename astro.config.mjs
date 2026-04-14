import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    integrations: [react()],
    vite: {
        plugins: [tailwindcss()],
        server: {
            proxy: {
                "/api": {
                    target: "https://shapi.jagoba.dev",
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, "")
                }
            }
        }
    }
});
