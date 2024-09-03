import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import viteCompression from "vite-plugin-compression";

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// 当前工作目录路径
const root = process.cwd();

export default defineConfig(() => {

	return {
		base: './',
		plugins: [
			vue(),
			AutoImport({
				resolvers: [VantResolver()],
			}),
			Components({
				resolvers: [VantResolver()],
			}),
			// svg icon
			createSvgIconsPlugin({
				// 指定图标文件夹
				iconDirs: [path.resolve(root, "src/icons/svg")],
				// 指定 symbolId 格式
				symbolId: "icon-[dir]-[name]"
			}),
			// 生产环境 gzip 压缩资源
			viteCompression(),
		],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url))
			}
		},
		server: {
			host: true,
			port: 8888,
			open: true,
			hmr: true,
			cors: true,
			strictPort: false,
			proxy: {
				"^/storm/agentapi/api": {
					target: "https://vacation.t.17u.cn",
					changeOrigin: true
				},
				'/api': {
					target: 'https://vacation.t.17u.cn',
					ws: false,
					changeOrigin: true
				}
			}
		},
		build: {
			rollupOptions: {
				output: {
					chunkFileNames: "static/js/[name].js",
					entryFileNames: "static/js/[name].js",
					assetFileNames: "static/[ext]/[name].[ext]"
				}
			}
		}
	};
});
