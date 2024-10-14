import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		host: '127.0.0.1',
		port: 8000,
	},
	proxy: {
		'/api': {
			target: 'http://splaika.com',
			changeOrigin: true,
		},
	},
	watch: {
		usePolling: true,
	},
});
