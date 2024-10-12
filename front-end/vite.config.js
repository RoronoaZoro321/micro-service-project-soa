import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: "127.0.0.1",
        port: 8000,
    },
    proxy: {
        "/api": {
            target: "http://127.0.0.1:3000",
            changeOrigin: true,
        },
    },
    watch: {
        usePolling: true,
    },
});
