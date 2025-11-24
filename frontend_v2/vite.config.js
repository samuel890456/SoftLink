import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        host: true, // Listen on all addresses
        port: 5174, // Keep the updated port
        watch: {
            usePolling: true, // Necessary for Docker on Windows
        }
    }
})
